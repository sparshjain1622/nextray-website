import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import path from "path";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app";
import {
  resolveUploadPath,
  validateImageUpload,
  validateMediaUpload,
} from "../src/lib/upload-security";

const app = createApp();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nextray-tech.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

let token = "";

describe("Security — attack simulations", () => {
  beforeAll(async () => {
    const login = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    token = login.body.token;
  });

  describe("Injection attacks", () => {
    it("rejects SQL injection in product slug lookup", async () => {
      const res = await request(app).get(
        "/api/products/'; DROP TABLE products;--"
      );
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("rejects SQL injection in blog slug lookup", async () => {
      const res = await request(app).get(
        "/api/blog/1' OR '1'='1"
      );
      expect(res.status).toBe(404);
    });

    it("accepts XSS payload in contact form but validates structure", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          name: '<script>alert("xss")</script>',
          email: "xss@test.com",
          phone: "9876543210",
          subject: "XSS Test",
          message: '<img src=x onerror=alert(1)> test message here',
          _honeypot: "",
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("rejects oversized contact message", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          name: "Test User",
          email: "test@test.com",
          phone: "9876543210",
          subject: "Overflow",
          message: "x".repeat(5001),
          _honeypot: "",
        });
      expect(res.status).toBe(400);
    });
  });

  describe("Authentication attacks", () => {
    it("rejects forged JWT with wrong secret", async () => {
      const fake = jwt.sign({ sub: "fake-admin" }, "attacker-secret", {
        algorithm: "HS256",
      });
      const res = await request(app)
        .get("/api/admin/products")
        .set("Authorization", `Bearer ${fake}`);
      expect(res.status).toBe(401);
    });

    it("rejects JWT with alg:none attack", async () => {
      const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString(
        "base64url"
      );
      const payload = Buffer.from(
        JSON.stringify({ sub: "fake-admin" })
      ).toString("base64url");
      const res = await request(app)
        .get("/api/admin/products")
        .set("Authorization", `Bearer ${header}.${payload}.`);
      expect(res.status).toBe(401);
    });

    it("rejects admin routes without token", async () => {
      const routes = [
        "/api/admin/products",
        "/api/admin/blog",
        "/api/admin/media",
        "/api/admin/submissions",
      ];
      for (const route of routes) {
        const res = await request(app).get(route);
        expect(res.status).toBe(401);
      }
    });

    it("rejects login with short password", async () => {
      const res = await request(app)
        .post("/api/admin/auth/login")
        .send({ email: ADMIN_EMAIL, password: "123" });
      expect(res.status).toBe(400);
    });
  });

  describe("File upload attacks", () => {
    it("blocks dangerous file types at validation layer", () => {
      expect(validateImageUpload("evil.svg", "image/svg+xml")).toBeTruthy();
      expect(validateImageUpload("evil.html", "text/html")).toBeTruthy();
      expect(validateMediaUpload("payload.html", "text/html")).toBeTruthy();
      expect(validateMediaUpload("datasheet.pdf", "application/pdf")).toBeNull();
      expect(validateImageUpload("photo.jpg", "image/jpeg")).toBeNull();
    });

    it("blocks path traversal in download resolution", () => {
      const uploadDir = path.join(process.cwd(), "uploads");
      expect(resolveUploadPath(uploadDir, "../../etc/passwd")).toBeNull();
      expect(resolveUploadPath(uploadDir, "..\\..\\windows\\system32")).toBeNull();
    });
  });

  describe("Spam & abuse", () => {
    it("rejects honeypot on associates form", async () => {
      const res = await request(app)
        .post("/api/associates")
        .send({
          role: "agent",
          name: "Bot",
          company: "Spam Co",
          email: "bot@spam.com",
          phone: "9876543210",
          city: "Mumbai",
          state: "MH",
          _honeypot: "filled",
        });
      expect(res.status).toBe(400);
    });

    it("rejects oversized analytics path", async () => {
      const res = await request(app)
        .post("/api/analytics")
        .send({ path: "/".repeat(600) });
      expect(res.status).toBe(400);
    });

    it("rejects javascript: href in homepage update", async () => {
      const list = await request(app)
        .get("/api/admin/homepage")
        .set("Authorization", `Bearer ${token}`);
      const item = list.body.data?.[0];
      if (!item) return;

      const res = await request(app)
        .put(`/api/admin/homepage/${item.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ href: "javascript:alert(1)" });

      expect(res.status).toBe(400);
    });
  });

  describe("Security headers", () => {
    it("sets helmet security headers on API", async () => {
      const res = await request(app).get("/api/health");
      expect(res.headers["x-content-type-options"]).toBe("nosniff");
    });

    it("sets nosniff on upload static middleware", async () => {
      const res = await request(app).get("/uploads/nonexistent-file.jpg");
      expect(res.headers["x-content-type-options"]).toBe("nosniff");
    });
  });
});

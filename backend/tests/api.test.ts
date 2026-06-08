import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("Nextray API", () => {
  it("GET / returns service info", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.service).toBe("Nextray API");
    expect(res.body.status).toBe("running");
    expect(res.body.endpoints).toBeDefined();
  });

  it("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("nextray-api");
  });

  it("GET /api/products returns seeded products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /api/categories returns categories", async () => {
    const res = await request(app).get("/api/categories");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("GET /api/categories/:slug returns a category", async () => {
    const list = await request(app).get("/api/categories");
    const slug = list.body.data[0].slug;
    const res = await request(app).get(`/api/categories/${slug}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe(slug);
  });

  it("GET /api/products/:slug returns a product", async () => {
    const res = await request(app).get("/api/products/6-watt-down-light");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe("6-watt-down-light");
  });

  it("GET /api/products/:slug returns 404 for unknown", async () => {
    const res = await request(app).get("/api/products/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/analytics records pageview", async () => {
    const res = await request(app)
      .post("/api/analytics")
      .send({ path: "/test-page", referrer: "http://localhost" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("POST /api/contact rejects invalid payload", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ name: "A" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/contact rejects honeypot spam", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Test User",
        email: "test@example.com",
        phone: "9876543210",
        subject: "Test",
        message: "Hello from test suite",
        _honeypot: "bot-filled",
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/admin/auth/login rejects bad credentials", async () => {
    const res = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: "wrong@test.com", password: "wrongpass" });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/admin/auth/login accepts valid credentials", async () => {
    const res = await request(app)
      .post("/api/admin/auth/login")
      .send({
        email: process.env.ADMIN_EMAIL || "admin@nextray-tech.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  it("GET /api/admin/products requires auth", async () => {
    const res = await request(app).get("/api/admin/products");
    expect(res.status).toBe(401);
  });
});

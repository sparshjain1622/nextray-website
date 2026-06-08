import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import fs from "fs";
import path from "path";
import { createApp } from "../src/app";

const app = createApp();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nextray-tech.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

let token = "";
let testCategoryId = "";
let testProductId = "";
let testSubmissionId = "";
let testMediaId = "";
let testBlogPostId = "";

describe("Frontend ↔ Backend integration", () => {
  beforeAll(async () => {
    const login = await request(app)
      .post("/api/admin/auth/login")
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    token = login.body.token;
  });

  describe("Public APIs (used by site frontend)", () => {
    it("health check", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
    });

    it("root info", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
      expect(res.body.service).toBe("Nextray API");
    });

    it("list products", async () => {
      const res = await request(app).get("/api/products");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("get product by slug", async () => {
      const res = await request(app).get("/api/products/6-watt-down-light");
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe("6-watt-down-light");
    });

    it("list categories", async () => {
      const res = await request(app).get("/api/categories");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("list downloads", async () => {
      const res = await request(app).get("/api/downloads");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("track analytics pageview", async () => {
      const res = await request(app)
        .post("/api/analytics")
        .send({ path: "/integration-test", referrer: "http://localhost:3000" });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("submit contact form", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          name: "Integration Test",
          email: "test@nextray-tech.com",
          phone: "9876543210",
          subject: "Test Inquiry",
          message: "This is an automated integration test message.",
          _honeypot: "",
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      testSubmissionId = res.body.id;
    });

    it("submit associates form", async () => {
      const res = await request(app)
        .post("/api/associates")
        .send({
          role: "distributor",
          name: "Test Partner",
          company: "Test Co",
          email: "partner@test.com",
          phone: "9876543211",
          city: "Delhi",
          state: "Delhi",
          _honeypot: "",
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("list published blog posts", async () => {
      const res = await request(app).get("/api/blog");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toHaveProperty("slug");
    });

    it("get blog post by slug", async () => {
      const list = await request(app).get("/api/blog");
      const slug = list.body.data[0]?.slug;
      expect(slug).toBeTruthy();

      const res = await request(app).get(`/api/blog/${slug}`);
      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe(slug);
      expect(res.body.data.content.length).toBeGreaterThan(10);
    });

    it("returns 404 for unknown blog slug", async () => {
      const res = await request(app).get("/api/blog/nonexistent-post-slug");
      expect(res.status).toBe(404);
    });

    it("rejects honeypot spam on contact", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({
          name: "Spam Bot",
          email: "spam@test.com",
          phone: "9876543210",
          subject: "Spam",
          message: "Spam message here for testing.",
          _honeypot: "filled-by-bot",
        });
      expect(res.status).toBe(400);
    });
  });

  describe("Admin APIs (used by admin panel)", () => {
    it("auth me with token", async () => {
      const res = await request(app)
        .get("/api/admin/auth/me")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.admin.email).toBe(ADMIN_EMAIL);
    });

    it("dashboard analytics", async () => {
      const res = await request(app)
        .get("/api/admin/analytics/dashboard")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.totalProducts).toBeGreaterThan(0);
    });

    it("list submissions", async () => {
      const res = await request(app)
        .get("/api/admin/submissions")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("mark submission read", async () => {
      if (!testSubmissionId) return;
      const res = await request(app)
        .patch(`/api/admin/submissions/${testSubmissionId}/read`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("CRUD category", async () => {
      const create = await request(app)
        .post("/api/admin/categories")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Category",
          slug: "test-category-int",
          description: "Integration test",
          sortOrder: 99,
          published: true,
        });
      expect(create.status).toBe(201);
      testCategoryId = create.body.data.id;

      const update = await request(app)
        .put(`/api/admin/categories/${testCategoryId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Category Updated",
          slug: "test-category-int",
          sortOrder: 100,
          published: true,
        });
      expect(update.status).toBe(200);
    });

    it("CRUD product", async () => {
      const create = await request(app)
        .post("/api/admin/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Product",
          slug: "test-product-int",
          brand: "Whites",
          categoryId: testCategoryId,
          metaDescription: "Test product for integration",
          published: true,
          sortOrder: 99,
          tagSlugs: ["test-tag"],
        });
      expect(create.status).toBe(201);
      testProductId = create.body.data.id;

      const getPublic = await request(app).get("/api/products/test-product-int");
      expect(getPublic.status).toBe(200);

      const update = await request(app)
        .put(`/api/admin/products/${testProductId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Product Updated",
          slug: "test-product-int",
          brand: "Whites",
          categoryId: testCategoryId,
          published: true,
          sortOrder: 100,
        });
      expect(update.status).toBe(200);
    });

    it("upload and download file", async () => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const testFile = path.join(uploadDir, "integration-test.txt");
      fs.writeFileSync(testFile, "Nextray integration test file");

      const upload = await request(app)
        .post("/api/admin/media/upload")
        .set("Authorization", `Bearer ${token}`)
        .field("title", "Integration Test File")
        .field("category", "datasheet")
        .attach("file", testFile);

      expect(upload.status).toBe(201);
      testMediaId = upload.body.data.id;

      const list = await request(app)
        .get("/api/admin/media")
        .set("Authorization", `Bearer ${token}`);
      expect(list.body.data.some((f: { id: string }) => f.id === testMediaId)).toBe(true);

      const publicList = await request(app).get("/api/downloads?category=datasheet");
      expect(publicList.status).toBe(200);

      const download = await request(app).get(`/api/downloads/${testMediaId}`);
      expect(download.status).toBe(200);
    });

    it("CRUD blog post", async () => {
      const create = await request(app)
        .post("/api/admin/blog")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Integration Test Blog Post",
          slug: "integration-test-blog",
          excerpt: "Test excerpt for blog integration.",
          content: "This is automated integration test blog content with enough length.",
          seoTitle: "Test SEO Title | Nextray Blog",
          metaDescription: "Test meta description for SEO.",
          seoKeywords: "LED, test, integration",
          canonicalUrl: "https://nextray-tech.com/blog/integration-test-blog",
          published: true,
          featured: false,
          tagSlugs: ["integration-test"],
        });
      expect(create.status).toBe(201);
      testBlogPostId = create.body.data.id;

      const publicGet = await request(app).get("/api/blog/integration-test-blog");
      expect(publicGet.status).toBe(200);
      expect(publicGet.body.data.seoTitle).toContain("Test SEO Title");

      const update = await request(app)
        .put(`/api/admin/blog/${testBlogPostId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Integration Test Blog Post Updated",
          slug: "integration-test-blog",
          content: "Updated integration test blog content with enough length.",
          published: true,
        });
      expect(update.status).toBe(200);
    });

    it("rejects admin routes without token", async () => {
      const res = await request(app).get("/api/admin/products");
      expect(res.status).toBe(401);
    });
  });

  afterAll(async () => {
    if (testBlogPostId) {
      await request(app)
        .delete(`/api/admin/blog/${testBlogPostId}`)
        .set("Authorization", `Bearer ${token}`);
    }
    if (testMediaId) {
      await request(app)
        .delete(`/api/admin/media/${testMediaId}`)
        .set("Authorization", `Bearer ${token}`);
    }
    if (testProductId) {
      await request(app)
        .delete(`/api/admin/products/${testProductId}`)
        .set("Authorization", `Bearer ${token}`);
    }
    if (testCategoryId) {
      await request(app)
        .delete(`/api/admin/categories/${testCategoryId}`)
        .set("Authorization", `Bearer ${token}`);
    }
  });
});

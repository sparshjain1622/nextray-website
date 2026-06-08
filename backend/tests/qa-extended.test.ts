/**
 * Extended QA suite — smoke, volume, grey-box, recovery-style checks.
 * Run: npm run test -w @nextray/backend -- tests/qa-extended.test.ts
 */
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import {
  categorySchema,
  productSchema,
  blogPostSchema,
  contactFormSchema,
  slugify,
  resolveSlug,
} from "@nextray/shared";
import { createApp } from "../src/app";

const app = createApp();
let token = "";

describe("Smoke testing — post-build stability", () => {
  const criticalEndpoints = [
    { method: "get" as const, path: "/api/health", expectStatus: 200 },
    { method: "get" as const, path: "/api/products", expectStatus: 200 },
    { method: "get" as const, path: "/api/categories", expectStatus: 200 },
    { method: "get" as const, path: "/api/blog", expectStatus: 200 },
    { method: "get" as const, path: "/api/downloads", expectStatus: 200 },
    { method: "get" as const, path: "/api/homepage", expectStatus: 200 },
  ];

  it.each(criticalEndpoints)("$method $path responds $expectStatus", async ({ method, path, expectStatus }) => {
    const res = await request(app)[method](path);
    expect(res.status).toBe(expectStatus);
    if (path === "/api/health") {
      expect(res.body.status).toBe("ok");
    } else {
      expect(res.body.success).toBe(true);
    }
  });
});

describe("Grey-box testing — schema + API contract alignment", () => {
  it("slugify/resolveSlug match API slug rules", () => {
    expect(slugify("Test Category")).toBe("test-category");
    expect(resolveSlug("", "My Product")).toBe("my-product");
    const parsed = productSchema.safeParse({
      title: "Test",
      slug: resolveSlug("", "Test Product Name"),
      categoryId: "cat-1",
    });
    expect(parsed.success).toBe(true);
  });

  it("public product response matches expected shape", async () => {
    const res = await request(app).get("/api/products/6-watt-down-light");
    const p = res.body.data;
    expect(p).toMatchObject({
      slug: expect.any(String),
      title: expect.any(String),
      brand: expect.any(String),
    });
    expect(p.category).toHaveProperty("slug");
    expect(categorySchema.safeParse({
      name: p.category.name,
      slug: p.category.slug,
    }).success).toBe(true);
  });

  it("rejects invalid product payload at schema level", () => {
    const bad = productSchema.safeParse({
      title: "X",
      slug: "INVALID SLUG",
      categoryId: "",
    });
    expect(bad.success).toBe(false);
  });

  it("blog schema enforces slug format", () => {
    const bad = blogPostSchema.safeParse({
      title: "Post",
      slug: "Bad Slug",
      content: "Enough content here for validation.",
    });
    expect(bad.success).toBe(false);
  });

  it("contact schema rejects honeypot", () => {
    const bad = contactFormSchema.safeParse({
      name: "Test",
      email: "a@b.com",
      phone: "9876543210",
      subject: "Hi",
      message: "Hello world message",
      _honeypot: "spam",
    });
    expect(bad.success).toBe(false);
  });
});

describe("Black-box testing — user-facing API behavior", () => {
  it("unknown product returns 404 with error message", async () => {
    const res = await request(app).get("/api/products/this-does-not-exist-xyz");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeTruthy();
  });

  it("contact form rejects missing fields without exposing internals", async () => {
    const res = await request(app).post("/api/contact").send({ name: "Only Name" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(JSON.stringify(res.body)).not.toMatch(/prisma|stack|sql/i);
  });

  it("admin routes hidden from anonymous users", async () => {
    const routes = ["/api/admin/products", "/api/admin/categories", "/api/admin/blog"];
    for (const route of routes) {
      const res = await request(app).get(route);
      expect(res.status).toBe(401);
    }
  });
});

describe("Volume testing — sustained load on read endpoints", () => {
  it("handles 50 parallel product list requests", async () => {
    const start = Date.now();
    const results = await Promise.all(
      Array.from({ length: 50 }, () => request(app).get("/api/products"))
    );
    const elapsed = Date.now() - start;
    expect(results.every((r) => r.status === 200)).toBe(true);
    expect(elapsed).toBeLessThan(10_000);
  });

  it("handles 30 parallel category requests", async () => {
    const start = Date.now();
    const results = await Promise.all(
      Array.from({ length: 30 }, () => request(app).get("/api/categories"))
    );
    const elapsed = Date.now() - start;
    expect(results.every((r) => r.status === 200)).toBe(true);
    expect(elapsed).toBeLessThan(8_000);
  });
});

describe("Recovery testing — resilience after errors", () => {
  beforeAll(async () => {
    const login = await request(app)
      .post("/api/admin/auth/login")
      .send({
        email: process.env.ADMIN_EMAIL || "admin@nextray-tech.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
      });
    token = login.body.token;
  });

  it("API remains healthy after burst of invalid requests", async () => {
    await Promise.all([
      request(app).get("/api/products/../../etc/passwd"),
      request(app).post("/api/contact").send({}),
      request(app).get("/api/blog/' OR 1=1--"),
      request(app).get("/api/admin/products"),
      request(app).post("/api/analytics").send({ path: "" }),
    ]);

    const health = await request(app).get("/api/health");
    expect(health.status).toBe(200);
    expect(health.body.status).toBe("ok");

    const products = await request(app).get("/api/products");
    expect(products.status).toBe(200);
    expect(products.body.data.length).toBeGreaterThan(0);
  });

  it("rejects malformed admin payload without crashing", async () => {
    const res = await request(app)
      .post("/api/admin/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "X" });
    expect(res.status).toBe(400);

    const health = await request(app).get("/api/health");
    expect(health.status).toBe(200);
  });
});

describe("Sanity testing — recent feature spot checks", () => {
  beforeAll(async () => {
    if (!token) {
      const login = await request(app)
        .post("/api/admin/auth/login")
        .send({
          email: process.env.ADMIN_EMAIL || "admin@nextray-tech.com",
          password: process.env.ADMIN_PASSWORD || "admin123",
        });
      token = login.body.token;
    }
  });

  it("slug preview endpoint returns valid slug", async () => {
    const res = await request(app)
      .get("/api/admin/utils/slug-preview")
      .query({ text: "Test Category Name" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.slug).toBe("test-category-name");
    expect(res.body.data.valid).toBe(true);
  });

  it("auto-resolves slug on category create when slug omitted", async () => {
    const create = await request(app)
      .post("/api/admin/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Sanity Slug Category",
        slug: "",
        published: true,
        sortOrder: 999,
      });
    expect(create.status).toBe(201);
    expect(create.body.data.slug).toBe("sanity-slug-category");

    const pub = await request(app).get("/api/categories/sanity-slug-category");
    expect(pub.status).toBe(200);

    await request(app)
      .delete(`/api/admin/categories/${create.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);
  });
});

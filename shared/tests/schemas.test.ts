import { describe, it, expect } from "vitest";
import {
  contactFormSchema,
  associatesFormSchema,
  productSchema,
  categorySchema,
  adminLoginSchema,
  homepageImageSchema,
  blogPostSchema,
} from "../src/index";

describe("contactFormSchema", () => {
  it("accepts valid contact form", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      subject: "Inquiry",
      message: "I need more information about your products.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects honeypot spam", () => {
    const result = contactFormSchema.safeParse({
      name: "Bot",
      email: "bot@spam.com",
      phone: "9876543210",
      subject: "Spam",
      message: "Buy now cheap lights!!!",
      _honeypot: "filled",
    });
    expect(result.success).toBe(false);
  });
});

describe("associatesFormSchema", () => {
  it("accepts valid associates form", () => {
    const result = associatesFormSchema.safeParse({
      role: "distributor",
      name: "Jane Smith",
      company: "ABC Lighting",
      email: "jane@abc.com",
      phone: "9876543210",
      city: "Delhi",
      state: "Delhi",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid role", () => {
    const result = associatesFormSchema.safeParse({
      role: "invalid",
      name: "Jane",
      company: "ABC",
      email: "jane@abc.com",
      phone: "9876543210",
      city: "Delhi",
      state: "Delhi",
    });
    expect(result.success).toBe(false);
  });
});

describe("productSchema", () => {
  it("accepts valid product with slug", () => {
    const result = productSchema.safeParse({
      title: "6 Watt Down Light",
      slug: "6-watt-down-light",
      categoryId: "cat123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid slug format", () => {
    const result = productSchema.safeParse({
      title: "Bad Slug",
      slug: "Bad Slug!",
      categoryId: "cat123",
    });
    expect(result.success).toBe(false);
  });
});

describe("categorySchema", () => {
  it("accepts valid category", () => {
    const result = categorySchema.safeParse({
      name: "Indoor Lights",
      slug: "indoor",
    });
    expect(result.success).toBe(true);
  });
});

describe("adminLoginSchema", () => {
  it("accepts valid login", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@nextray-tech.com",
      password: "admin123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short password", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@nextray-tech.com",
      password: "123",
    });
    expect(result.success).toBe(false);
  });
});

describe("homepageImageSchema security", () => {
  it("rejects javascript: href", () => {
    const result = homepageImageSchema.safeParse({
      section: "area",
      key: "test",
      href: "javascript:alert(1)",
    });
    expect(result.success).toBe(false);
  });

  it("accepts safe relative href", () => {
    const result = homepageImageSchema.safeParse({
      section: "area",
      key: "test",
      href: "/products/indoor",
    });
    expect(result.success).toBe(true);
  });
});

describe("blogPostSchema security", () => {
  it("rejects http canonical URL (requires HTTPS)", () => {
    const result = blogPostSchema.safeParse({
      title: "Test Post",
      slug: "test-post",
      content: "Enough content for validation.",
      canonicalUrl: "http://evil.com/phish",
    });
    expect(result.success).toBe(false);
  });

  it("rejects path traversal in featured image", () => {
    const result = blogPostSchema.safeParse({
      title: "Test Post",
      slug: "test-post",
      content: "Enough content for validation.",
      featuredImage: "/uploads/../../etc/passwd",
    });
    expect(result.success).toBe(false);
  });
});

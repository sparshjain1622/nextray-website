import { describe, it, expect } from "vitest";
import { slugify, resolveSlug, isValidSlug } from "../src/utils/slugify";

describe("slugify", () => {
  it("converts text to lowercase hyphenated slug", () => {
    expect(slugify("Test Category")).toBe("test-category");
    expect(slugify("6 Watt Down Light")).toBe("6-watt-down-light");
  });

  it("strips special characters", () => {
    expect(slugify("Hello & World!")).toBe("hello-world");
  });

  it("trims and collapses hyphens", () => {
    expect(slugify("  foo   bar  ")).toBe("foo-bar");
    expect(slugify("a--b")).toBe("a-b");
  });
});

describe("resolveSlug", () => {
  it("uses explicit slug when provided", () => {
    expect(resolveSlug("custom-slug", "Test Name")).toBe("custom-slug");
  });

  it("derives from source when slug is empty", () => {
    expect(resolveSlug("", "My Product")).toBe("my-product");
    expect(resolveSlug(undefined, "Blog Post Title")).toBe("blog-post-title");
  });
});

describe("isValidSlug", () => {
  it("validates slug format", () => {
    expect(isValidSlug("test-category")).toBe(true);
    expect(isValidSlug("a")).toBe(false);
    expect(isValidSlug("Bad Slug")).toBe(false);
  });
});

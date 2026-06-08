import { z } from "zod";
import { safeHttpsUrl, safeImageRef } from "../validators/safe-url";

export const blogPostSchema = z.object({
  title: z.string().min(2).max(300),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(10).max(100_000),
  featuredImage: safeImageRef,
  author: z.string().max(100).default("Nextray Technologies"),
  seoTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  seoKeywords: z.string().max(500).optional(),
  canonicalUrl: safeHttpsUrl,
  ogImage: safeImageRef,
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
  tagSlugs: z.array(z.string().max(50)).max(20).optional(),
});

export type BlogPostPayload = z.infer<typeof blogPostSchema>;

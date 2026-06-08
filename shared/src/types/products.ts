import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  brand: z.string().default("Whites"),
  categoryId: z.string().min(1),
  description: z.string().optional(),
  metaDescription: z.string().optional(),
  seoTitle: z.string().optional(),
  imageUnlit: z.string().optional(),
  imageLit: z.string().optional(),
  modelNumber: z.string().optional(),
  modelNumbers: z.string().optional(),
  specs: z.string().optional(),
  applications: z.string().optional(),
  features: z.string().optional(),
  keyHighlights: z.string().optional(),
  pageType: z.enum(["spec", "matrix"]).default("spec"),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  tagSlugs: z.array(z.string()).optional(),
});

export type ProductPayload = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  sortOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export type CategoryPayload = z.infer<typeof categorySchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AdminLoginPayload = z.infer<typeof adminLoginSchema>;

export const analyticsSchema = z.object({
  path: z.string().min(1).max(500),
  referrer: z.string().max(2000).optional(),
});

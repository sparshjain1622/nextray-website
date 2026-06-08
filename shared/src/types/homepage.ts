import { z } from "zod";
import { safeHref, safeImageRef } from "../validators/safe-url";

export const homepageImageSchema = z.object({
  section: z.enum(["hero-product", "area", "client", "certification"]),
  key: z.string().min(1).max(100),
  title: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  imageUnlit: safeImageRef,
  imageLit: safeImageRef,
  image: safeImageRef,
  href: safeHref,
  sortOrder: z.number().int().min(0).max(999).default(0),
  published: z.boolean().default(true),
});

export type HomepageImagePayload = z.infer<typeof homepageImageSchema>;

export interface HomepageHeroProduct {
  key: string;
  title: string;
  description?: string;
  imageUnlit: string;
  imageLit: string;
  href?: string;
}

export interface HomepageArea {
  key: string;
  title: string;
  description?: string;
  imageUnlit: string;
  imageLit: string;
  href?: string;
}

export interface HomepageCertification {
  key: string;
  title: string;
  description?: string;
  image: string;
}

export interface HomepageContent {
  heroProducts: HomepageHeroProduct[];
  areas: HomepageArea[];
  clients: string[];
  certifications: HomepageCertification[];
}

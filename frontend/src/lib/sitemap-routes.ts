import { aboutSubnav } from "./about-data";
import { allProducts } from "./products-catalog";

/** Static public routes for sitemap generation */
export const STATIC_SITEMAP_PATHS = [
  "/",
  "/about",
  ...aboutSubnav.map((l) => l.href).filter((h) => h !== "/about"),
  "/products/indoor",
  "/products/outdoor",
  "/products/industrial",
  "/products/powertronics",
  "/blog",
  "/contact",
  "/associates",
  "/strength/infrastructure",
  "/strength/our-presence",
  "/gallery/projects",
  "/gallery/events",
  "/sitemap",
  "/privacy-policy",
  "/terms-of-use",
] as const;

export function getCatalogProductPaths(): string[] {
  return allProducts.map((p) => `${p.categoryHref}/${p.slug}`);
}

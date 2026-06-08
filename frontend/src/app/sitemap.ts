import type { MetadataRoute } from "next";
import { fetchBlogPosts } from "@/lib/blog-api";
import { categoryPath, fetchPublicCategories } from "@/lib/categories-api";
import { fetchAllProductSlugs, productPath } from "@/lib/products-api";
import {
  STATIC_SITEMAP_PATHS,
  getCatalogProductPaths,
} from "@/lib/sitemap-routes";
import { SITE_URL } from "@/lib/site-seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_PATHS.map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/products") ? 0.8 : 0.7,
    })
  );

  const apiCategories = await fetchPublicCategories();
  const categoryEntries: MetadataRoute.Sitemap = apiCategories.map((cat) => ({
    url: `${SITE_URL}${categoryPath(cat.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const catalogPaths = getCatalogProductPaths();
  const apiProducts = await fetchAllProductSlugs();
  const productPaths = new Set([
    ...catalogPaths,
    ...apiProducts.map((p) => productPath(p.categorySlug, p.slug)),
  ]);

  const productEntries: MetadataRoute.Sitemap = [...productPaths].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const posts = await fetchBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const seen = new Set<string>();
  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries].filter(
    (entry) => {
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    }
  );
}

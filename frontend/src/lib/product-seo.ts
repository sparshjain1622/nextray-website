import type { Metadata } from "next";
import { productDetails } from "./products-data";
import { fetchProductBySlug } from "./products-api";
import { buildPageMetadata } from "./seo-metadata";
export async function generateProductPageMetadata(
  slug: string,
  categoryHref: string
): Promise<Metadata> {
  const [api, staticProduct] = await Promise.all([
    fetchProductBySlug(slug),
    Promise.resolve(productDetails[slug]),
  ]);

  const title =
    api?.seoTitle ||
    (staticProduct
      ? `${staticProduct.title} | Nextray Technologies`
      : "Product | Nextray Technologies");

  const description =
    api?.metaDescription ||
    staticProduct?.metaDescription ||
    "LED lighting product by Nextray Technologies — Indian manufacturer since 2004.";

  const image =
    staticProduct?.imageLit ||
    staticProduct?.imageUnlit ||
    api?.imageLit ||
    api?.imageUnlit ||
    "/images/nextray-logo.png";

  const path = `${categoryHref}/${slug}`;

  return buildPageMetadata({
    title,
    description,
    path,
    image,
    keywords: [
      staticProduct?.title || api?.title || "LED product",
      staticProduct?.brand || api?.brand || "Nextray",
      "LED lighting India",
      "Nextray Technologies",
    ],
  });
}

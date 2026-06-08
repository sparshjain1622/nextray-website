import type { ProductDetail } from "@/lib/products-types";
import { absoluteUrl, COMPANY, SITE_URL } from "@/lib/site-seo";

export default function ProductJsonLd({ product }: { product: ProductDetail }) {
  const path = `${product.categoryHref}/${product.slug}`;
  const url = absoluteUrl(path);
  const image = absoluteUrl(product.imageLit || product.imageUnlit);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.metaDescription,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: SITE_URL,
    },
    category: product.category,
    ...(product.modelNumber
      ? { sku: product.modelNumber, mpn: product.modelNumber }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: COMPANY.legalName,
      },
    },
  };

  const safeJson = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}

import type { BlogPostDetail } from "@/lib/blog-api";
import { resolveMediaUrl } from "@/lib/media-url";
import { absoluteUrl, COMPANY, SITE_URL } from "@/lib/site-seo";

export default function BlogJsonLd({ post }: { post: BlogPostDetail }) {
  const url = post.canonicalUrl || absoluteUrl(`/blog/${post.slug}`);
  const image = post.ogImage || post.featuredImage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt || post.title,
    image: image ? resolveMediaUrl(image) : undefined,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      logo: {
        "@type": "ImageObject",
        url: COMPANY.logo,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.seoKeywords,
    url,
  };

  const safeJson = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogJsonLd from "@/components/blog/BlogJsonLd";
import { fetchBlogPost } from "@/lib/blog-api";
import { buildPageMetadata } from "@/lib/seo-metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seoTitle || `${post.title} | Nextray Blog`;
  const description = post.metaDescription || post.excerpt || post.title;
  const ogImage = post.ogImage || post.featuredImage || "/images/gallery/1.jpg";

  const base = buildPageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    image: ogImage,
    keywords: post.seoKeywords?.split(",").map((k) => k.trim()) || [
      "LED lighting",
      "Nextray blog",
    ],
    type: "article",
  });

  return {
    ...base,
    alternates: post.canonicalUrl
      ? { canonical: post.canonicalUrl }
      : base.alternates,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <BlogJsonLd post={post} />
      <PageShell
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      >
        <BlogArticle post={post} />
      </PageShell>
    </>
  );
}

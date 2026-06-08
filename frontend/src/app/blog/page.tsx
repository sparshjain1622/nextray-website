import PageShell from "@/components/layout/PageShell";
import BlogList from "@/components/blog/BlogList";
import { fetchBlogPosts } from "@/lib/blog-api";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Blog | LED Lighting Insights | Nextray Technologies",
  description:
    "Expert articles on LED lighting, street lights, commercial solutions and Make in India manufacturing from Nextray Technologies.",
  path: "/blog",
  image: "/images/gallery/1.jpg",
  keywords: [
    "LED lighting blog",
    "street light guide",
    "LED manufacturer India",
    "Nextray blog",
  ],
});

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <PageShell
      title="Blog"
      breadcrumbs={[{ label: "Blog" }]}
    >
      <div className="mb-8">
        <p className="text-theme-body max-w-2xl text-base leading-relaxed">
          Insights on LED lighting technology, product selection guides and
          industry trends from Nextray Technologies.
        </p>
      </div>
      <BlogList posts={posts} />
    </PageShell>
  );
}

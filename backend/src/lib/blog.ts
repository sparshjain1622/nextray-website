import { prisma } from "./prisma";

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    include: { tags: { include: { tag: true } } },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, published: true },
    include: { tags: { include: { tag: true } } },
  });
}

export function formatBlogPost(p: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return {
    ...p,
    tags: p.tags.map((t) => t.tag),
  };
}

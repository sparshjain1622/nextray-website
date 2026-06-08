import { Router } from "express";
import { blogPostSchema, resolveSlug } from "@nextray/shared";
import { prisma } from "../../lib/prisma";

export const adminBlogRouter = Router();

async function syncBlogTags(postId: string, tagSlugs?: string[]) {
  await prisma.blogPostTag.deleteMany({ where: { postId } });
  if (!tagSlugs?.length) return;

  for (const slug of tagSlugs) {
    const tag = await prisma.blogTag.upsert({
      where: { slug },
      create: { name: slug.replace(/-/g, " "), slug },
      update: {},
    });
    await prisma.blogPostTag.create({ data: { postId, tagId: tag.id } });
  }
}

adminBlogRouter.get("/", async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    include: { tags: { include: { tag: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ success: true, data: posts });
});

adminBlogRouter.get("/:id", async (req, res) => {
  const post = await prisma.blogPost.findUnique({
    where: { id: req.params.id },
    include: { tags: { include: { tag: true } } },
  });
  if (!post) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: post });
});

adminBlogRouter.post("/", async (req, res) => {
  const parsed = blogPostSchema.safeParse({
    ...req.body,
    slug: resolveSlug(req.body.slug, req.body.title),
  });
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { tagSlugs, publishedAt, ...data } = parsed.data;
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      publishedAt: publishedAt ? new Date(publishedAt) : data.published ? new Date() : null,
    },
  });

  await syncBlogTags(post.id, tagSlugs);
  res.status(201).json({ success: true, data: post });
});

adminBlogRouter.put("/:id", async (req, res) => {
  const parsed = blogPostSchema.safeParse({
    ...req.body,
    slug: resolveSlug(req.body.slug, req.body.title),
  });
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { tagSlugs, publishedAt, ...data } = parsed.data;
  const post = await prisma.blogPost.update({
    where: { id: req.params.id },
    data: {
      ...data,
      publishedAt: publishedAt
        ? new Date(publishedAt)
        : data.published
          ? new Date()
          : null,
    },
  });

  await syncBlogTags(post.id, tagSlugs);
  res.json({ success: true, data: post });
});

adminBlogRouter.delete("/:id", async (req, res) => {
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: "Post deleted" });
});

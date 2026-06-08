import { Router } from "express";
import { getPublishedPosts, getPostBySlug, formatBlogPost } from "../../lib/blog";

export const publicBlogRouter = Router();

publicBlogRouter.get("/", async (_req, res) => {
  const posts = await getPublishedPosts();
  res.json({
    success: true,
    data: posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      featuredImage: p.featuredImage,
      author: p.author,
      seoTitle: p.seoTitle,
      metaDescription: p.metaDescription,
      featured: p.featured,
      publishedAt: p.publishedAt,
      tags: p.tags.map((t) => t.tag),
    })),
  });
});

publicBlogRouter.get("/:slug", async (req, res) => {
  const post = await getPostBySlug(req.params.slug);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  res.json({ success: true, data: formatBlogPost(post) });
});

"use client";

import { useTheme } from "@/context/ThemeContext";
import type { BlogPostSummary } from "@/lib/blog-api";
import BlogCard from "./BlogCard";

export default function BlogList({ posts }: { posts: BlogPostSummary[] }) {
  const { lightsOn } = useTheme();

  if (!posts.length) {
    return (
      <div
        className={`rounded-2xl border px-8 py-16 text-center ${
          lightsOn ? "border-[#e8eaed] bg-white" : "border-white/10 bg-card"
        }`}
      >
        <p className={`font-heading text-lg font-bold ${lightsOn ? "text-[#1a1a1a]" : "text-white"}`}>
          No blog posts yet
        </p>
        <p className={`mt-2 text-sm ${lightsOn ? "text-[#6b6b6b]" : "text-white/50"}`}>
          Check back soon for LED lighting insights and industry updates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

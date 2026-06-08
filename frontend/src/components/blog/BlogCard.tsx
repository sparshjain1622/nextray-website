"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import type { BlogPostSummary } from "@/lib/blog-api";
import { resolveMediaUrl } from "@/lib/media-url";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  const { lightsOn } = useTheme();
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        lightsOn
          ? "border-[#e8eaed] bg-white shadow-sm hover:border-nextray-green/30"
          : "border-white/10 bg-card hover:border-nextray-green/30"
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={resolveMediaUrl(post.featuredImage)}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
            unoptimized={post.featuredImage.startsWith("/uploads")}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-nextray-green/10">
            <span className="font-heading text-sm font-bold text-nextray-green">
              Nextray Blog
            </span>
          </div>
        )}
        {post.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-nextray-green px-2.5 py-0.5 text-[10px] font-bold uppercase text-black">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full bg-nextray-green/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-nextray-green"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug}`}>
          <h2
            className={`mb-2 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-nextray-green ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p
            className={`mb-4 line-clamp-3 flex-1 text-sm leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            {post.excerpt}
          </p>
        )}

        <div
          className={`mt-auto flex items-center justify-between border-t pt-4 text-xs ${
            lightsOn ? "border-[#e8eaed] text-[#9ca3af]" : "border-white/10 text-white/40"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User size={12} />
              {post.author}
            </span>
            {date && (
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {date}
              </span>
            )}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 font-bold uppercase tracking-wider text-nextray-green"
          >
            Read
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}

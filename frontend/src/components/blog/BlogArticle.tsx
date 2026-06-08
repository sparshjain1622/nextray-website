"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import type { BlogPostDetail } from "@/lib/blog-api";
import { resolveMediaUrl } from "@/lib/media-url";
import { Calendar, Tag, User } from "lucide-react";

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("**") && block.endsWith("**")) {
      return (
        <h2 key={i} className="mb-3 mt-8 font-heading text-xl font-bold text-nextray-green">
          {block.replace(/\*\*/g, "")}
        </h2>
      );
    }
    return (
      <p key={i} className="mb-4 leading-relaxed">
        {block}
      </p>
    );
  });
}

export default function BlogArticle({ post }: { post: BlogPostDetail }) {
  const { lightsOn } = useTheme();
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const textClass = lightsOn ? "text-[#4a4a4a]" : "text-white/75";
  const headingClass = lightsOn ? "text-[#1a1a1a]" : "text-white";

  return (
    <article className="mx-auto max-w-3xl">
      {post.featuredImage && (
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
          <Image
            src={resolveMediaUrl(post.featuredImage)}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized={post.featuredImage.startsWith("/uploads")}
          />
        </div>
      )}

      <div
        className={`mb-6 flex flex-wrap items-center gap-4 text-sm ${
          lightsOn ? "text-[#6b6b6b]" : "text-white/50"
        }`}
      >
        <span className="flex items-center gap-1.5">
          <User size={14} className="text-nextray-green" />
          {post.author}
        </span>
        {date && (
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-nextray-green" />
            {date}
          </span>
        )}
      </div>

      {post.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Tag size={14} className="text-nextray-green" />
          {post.tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-full border border-nextray-green/25 bg-nextray-green/8 px-3 py-0.5 text-xs font-semibold text-nextray-green"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className={`prose-blog text-base ${textClass}`}>
        {renderContent(post.content)}
      </div>

      <div
        className={`mt-12 rounded-xl border px-6 py-5 ${
          lightsOn
            ? "border-nextray-green/20 bg-nextray-green/5"
            : "border-nextray-green/20 bg-nextray-green/8"
        }`}
      >
        <p className={`mb-1 font-heading font-bold ${headingClass}`}>
          Need LED lighting for your project?
        </p>
        <p className={`mb-3 text-sm ${textClass}`}>
          Contact Nextray Technologies for expert consultation and custom solutions.
        </p>
        <Link
          href="/contact"
          className="inline-flex rounded-lg bg-nextray-green px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black"
        >
          Get in Touch
        </Link>
      </div>
    </article>
  );
}

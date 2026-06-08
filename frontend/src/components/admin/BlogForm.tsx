"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_URL } from "@/lib/site-seo";
import { saveBlogPost, type AdminBlogPost } from "@/lib/admin-api";
import SlugField from "./SlugField";
import { useAdminFormStyles } from "./admin-form-styles";
import { useAdminTheme } from "@/context/AdminThemeContext";

export default function BlogForm({ post }: { post?: AdminBlogPost }) {
  const router = useRouter();
  const { t } = useAdminTheme();
  const { inputClass, labelClass } = useAdminFormStyles();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tagValue = post?.tags?.map((t) => t.tag.slug).join(", ") ?? "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const tagSlugs = String(fd.get("tagSlugs") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: String(fd.get("title")),
      slug: String(fd.get("slug")),
      excerpt: String(fd.get("excerpt") || ""),
      content: String(fd.get("content")),
      featuredImage: String(fd.get("featuredImage") || ""),
      author: String(fd.get("author") || "Nextray Technologies"),
      seoTitle: String(fd.get("seoTitle") || ""),
      metaDescription: String(fd.get("metaDescription") || ""),
      seoKeywords: String(fd.get("seoKeywords") || ""),
      canonicalUrl: String(fd.get("canonicalUrl") || ""),
      ogImage: String(fd.get("ogImage") || ""),
      published: fd.get("published") === "on",
      featured: fd.get("featured") === "on",
      tagSlugs,
    };

    try {
      await saveBlogPost(post?.id ?? null, payload);
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h3 className={`mb-4 font-heading font-bold ${t.heading}`}>Post Content</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <SlugField
            sourceLabel="Title"
            slugLabel="Slug"
            sourceName="title"
            slugName="slug"
            initialSource={post?.title ?? ""}
            initialSlug={post?.slug ?? ""}
            isEdit={!!post}
            slugPlaceholder="my-blog-post"
            inputClass={inputClass}
            labelClass={labelClass}
            urlPreview={(slug) => `${SITE_URL}/blog/${slug}`}
          />
          <div>
            <label className={labelClass}>Author</label>
            <input
              name="author"
              defaultValue={post?.author ?? "Nextray Technologies"}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Excerpt</label>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt ?? ""}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Content *</label>
            <textarea
              name="content"
              required
              rows={12}
              defaultValue={post?.content ?? ""}
              className={`${inputClass} font-mono text-xs leading-relaxed`}
              placeholder="Use **Heading** for subheadings. Separate paragraphs with blank lines."
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Featured Image URL</label>
            <input
              name="featuredImage"
              defaultValue={post?.featuredImage ?? ""}
              className={inputClass}
              placeholder="/images/gallery/1.jpg"
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Tags (comma-separated slugs)</label>
            <input
              name="tagSlugs"
              defaultValue={tagValue}
              className={inputClass}
              placeholder="led-lighting, commercial"
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className={`mb-4 font-heading font-bold ${t.heading}`}>SEO Settings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass}>SEO Title</label>
            <input name="seoTitle" defaultValue={post?.seoTitle ?? ""} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Meta Description</label>
            <textarea
              name="metaDescription"
              rows={2}
              defaultValue={post?.metaDescription ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>SEO Keywords</label>
            <input
              name="seoKeywords"
              defaultValue={post?.seoKeywords ?? ""}
              className={inputClass}
              placeholder="LED, lighting, India"
            />
          </div>
          <div>
            <label className={labelClass}>Canonical URL</label>
            <input
              name="canonicalUrl"
              defaultValue={post?.canonicalUrl ?? ""}
              className={inputClass}
              placeholder="https://nextray-tech.com/blog/..."
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Open Graph Image URL</label>
            <input name="ogImage" defaultValue={post?.ogImage ?? ""} className={inputClass} />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-6">
        <label className={`flex items-center gap-2 text-sm ${t.muted}`}>
          <input
            name="published"
            type="checkbox"
            defaultChecked={post?.published ?? false}
            className="accent-nextray-green"
          />
          Published
        </label>
        <label className={`flex items-center gap-2 text-sm ${t.muted}`}>
          <input
            name="featured"
            type="checkbox"
            defaultChecked={post?.featured ?? false}
            className="accent-nextray-green"
          />
          Featured
        </label>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-nextray-green px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-black disabled:opacity-60"
        >
          {saving ? "Saving..." : post ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className={`rounded-lg border px-6 py-2.5 text-sm font-medium ${t.ghostBtn}`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

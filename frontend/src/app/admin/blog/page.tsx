"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  deleteBlogPost,
  fetchBlogPosts,
  type AdminBlogPost,
} from "@/lib/admin-api";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

export default function AdminBlogPage() {
  const { t, light } = useAdminTheme();
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);

  const load = () => {
    fetchBlogPosts()
      .then((r) => setPosts(r.data))
      .catch(() => {});
  };

  useEffect(load, []);

  const published = posts.filter((p) => p.published).length;

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        description="Manage blog posts with full SEO controls — title, meta, keywords, OG image and canonical URL."
        actionHref="/admin/blog/new"
        actionLabel="New Post"
      />

      <div className="mb-5 grid grid-cols-2 gap-3 sm:max-w-xs">
        <div className={`rounded-xl border px-4 py-3 ${t.card} ${t.cardBorder}`}>
          <p className={`text-[10px] font-bold uppercase ${t.mutedSoft}`}>Total</p>
          <p className={`font-heading text-xl font-bold ${t.heading}`}>{posts.length}</p>
        </div>
        <div className={`rounded-xl border px-4 py-3 ${t.card} ${t.cardBorder}`}>
          <p className={`text-[10px] font-bold uppercase ${t.mutedSoft}`}>Published</p>
          <p className="font-heading text-xl font-bold text-nextray-green">{published}</p>
        </div>
      </div>

      <div className={`overflow-hidden rounded-xl border ${t.card} ${t.cardBorder}`}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className={`border-b text-[10px] uppercase tracking-wider ${t.cardBorder} ${t.tableHeader}`}>
              <th className="px-4 py-3">Title</th>
              <th className="hidden px-4 py-3 md:table-cell">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr
                key={p.id}
                className={`border-b transition-colors ${t.cardBorder} ${t.rowHover}`}
              >
                <td className="px-4 py-3">
                  <p className={`font-medium ${t.heading}`}>{p.title}</p>
                  <p className={`text-xs ${t.mutedSoft}`}>{p.author}</p>
                </td>
                <td className={`hidden px-4 py-3 font-mono text-xs md:table-cell ${light ? "text-[#4a5568]" : "text-white/60"}`}>
                  {p.slug}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      p.published
                        ? "bg-nextray-green/15 text-nextray-green"
                        : light
                          ? "bg-[#f0f2ed] text-[#9ca3af]"
                          : "bg-white/10 text-white/40"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    {p.published && (
                      <Link
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        className={`rounded-lg border p-2 ${light ? "border-[#e8eaed]" : "border-white/10"} ${t.mutedSoft} hover:text-nextray-green`}
                      >
                        <ExternalLink size={15} />
                      </Link>
                    )}
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className={`rounded-lg border p-2 ${light ? "border-[#e8eaed]" : "border-white/10"} ${t.mutedSoft} hover:text-nextray-green`}
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm(`Delete "${p.title}"?`)) return;
                        await deleteBlogPost(p.id);
                        load();
                      }}
                      className={`rounded-lg border p-2 ${light ? "border-[#e8eaed]" : "border-white/10"} ${t.mutedSoft} hover:text-red-400`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!posts.length && (
          <p className={`px-4 py-8 text-center text-sm ${t.mutedSoft}`}>
            No posts yet. Run db:seed or create one.
          </p>
        )}
      </div>
    </div>
  );
}

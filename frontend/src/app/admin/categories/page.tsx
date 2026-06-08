"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminFormStyles } from "@/components/admin/admin-form-styles";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  deleteCategory,
  fetchCategories,
  saveCategory,
  type AdminCategory,
} from "@/lib/admin-api";
import SlugField from "@/components/admin/SlugField";
import { SITE_URL } from "@/lib/site-seo";
import { Pencil, Trash2, X } from "lucide-react";

export default function AdminCategoriesPage() {
  const { t } = useAdminTheme();
  const { inputClass } = useAdminFormStyles();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    fetchCategories()
      .then((r) => setCategories(r.data))
      .catch(() => {});
  };

  useEffect(load, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name")),
      slug: String(fd.get("slug")),
      description: String(fd.get("description") || ""),
      seoTitle: String(fd.get("seoTitle") || ""),
      seoDescription: String(fd.get("seoDescription") || ""),
      sortOrder: Number(fd.get("sortOrder") || 0),
      published: fd.get("published") === "on",
    };
    await saveCategory(editing?.id ?? null, data);
    setEditing(null);
    setShowForm(false);
    load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Product categories with SEO titles and slugs."
      />

      {(showForm || editing) && (
        <form
          key={editing?.id ?? "new"}
          onSubmit={handleSubmit}
          className={`mb-6 rounded-xl border p-6 ${t.panel}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className={`font-heading font-bold ${t.heading}`}>
              {editing ? "Edit Category" : "New Category"}
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(false);
              }}
              className={`${t.mutedSoft} hover:text-nextray-green`}
            >
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <SlugField
              sourceName="name"
              slugName="slug"
              initialSource={editing?.name ?? ""}
              initialSlug={editing?.slug ?? ""}
              isEdit={!!editing}
              sourcePlaceholder="Name"
              slugPlaceholder="slug"
              inputClass={inputClass}
              layout="inline"
              urlPreview={(slug) => `${SITE_URL}/products/${slug}`}
            />
            <input name="seoTitle" placeholder="SEO Title" defaultValue={editing?.seoTitle ?? ""} className={inputClass} />
            <input name="seoDescription" placeholder="SEO Description" defaultValue={editing?.seoDescription ?? ""} className={inputClass} />
            <input name="description" placeholder="Description" defaultValue={editing?.description ?? ""} className={inputClass} />
            <input name="sortOrder" type="number" placeholder="Sort order" defaultValue={editing?.sortOrder ?? 0} className={inputClass} />
          </div>
          <label className={`mt-4 flex items-center gap-2 text-sm ${t.muted}`}>
            <input name="published" type="checkbox" defaultChecked={editing?.published ?? true} className="accent-nextray-green" />
            Published
          </label>
          <button type="submit" className="mt-4 rounded-lg bg-nextray-green px-5 py-2 text-sm font-bold text-black">
            Save
          </button>
        </form>
      )}

      {!showForm && !editing && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mb-6 rounded-lg bg-nextray-green px-4 py-2 text-sm font-bold uppercase tracking-wider text-black"
        >
          + Add Category
        </button>
      )}

      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className={`flex items-center justify-between rounded-xl border px-5 py-4 ${t.card} ${t.cardBorder}`}
          >
            <div>
              <p className={`font-medium ${t.heading}`}>{c.name}</p>
              <p className={`font-mono text-xs ${t.mutedSoft}`}>
                /{c.slug} · {c._count?.products ?? 0} products
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(c);
                  setShowForm(false);
                }}
                className={`rounded-lg p-2 ${t.mutedSoft} hover:text-nextray-green`}
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!confirm(`Delete ${c.name}?`)) return;
                  await deleteCategory(c.id);
                  load();
                }}
                className={`rounded-lg p-2 ${t.mutedSoft} hover:text-red-400`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

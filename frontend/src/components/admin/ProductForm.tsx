"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchCategories,
  saveProduct,
  type AdminCategory,
  type AdminProduct,
} from "@/lib/admin-api";
import { productPath } from "@/lib/products-api";
import { SITE_URL } from "@/lib/site-seo";
import SlugField from "./SlugField";
import { useAdminFormStyles } from "./admin-form-styles";
import { useAdminTheme } from "@/context/AdminThemeContext";

export default function ProductForm({ product }: { product?: AdminProduct }) {
  const router = useRouter();
  const { t } = useAdminTheme();
  const { inputClass, labelClass } = useAdminFormStyles();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then((r) => setCategories(r.data))
      .catch(() => {});
  }, []);

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
      brand: String(fd.get("brand") || "Whites"),
      categoryId: String(fd.get("categoryId")),
      description: String(fd.get("description") || ""),
      metaDescription: String(fd.get("metaDescription") || ""),
      seoTitle: String(fd.get("seoTitle") || ""),
      imageUnlit: String(fd.get("imageUnlit") || ""),
      imageLit: String(fd.get("imageLit") || ""),
      modelNumber: String(fd.get("modelNumber") || ""),
      pageType: String(fd.get("pageType") || "spec"),
      published: fd.get("published") === "on",
      featured: fd.get("featured") === "on",
      sortOrder: Number(fd.get("sortOrder") || 0),
      tagSlugs,
      specs: String(fd.get("specs") || ""),
      applications: String(fd.get("applications") || ""),
      features: String(fd.get("features") || ""),
      keyHighlights: String(fd.get("keyHighlights") || ""),
    };

    try {
      await saveProduct(product?.id ?? null, payload);
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const tagValue =
    product?.tags?.map((t) => t.tag.slug).join(", ") ?? "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <SlugField
          sourceLabel="Title"
          slugLabel="Slug"
          sourceName="title"
          slugName="slug"
          initialSource={product?.title ?? ""}
          initialSlug={product?.slug ?? ""}
          isEdit={!!product}
          slugPlaceholder="6-watt-down-light"
          inputClass={inputClass}
          labelClass={labelClass}
          urlPreview={(slug) => {
            const catSlug =
              categories.find((c) => c.id === categoryId)?.slug ?? "indoor";
            return `${SITE_URL}${productPath(catSlug, slug)}`;
          }}
        />
        <div>
          <label className={labelClass}>Category *</label>
          <select
            name="categoryId"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={inputClass}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Brand</label>
          <input
            name="brand"
            defaultValue={product?.brand ?? "Whites"}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>SEO Title</label>
          <input
            name="seoTitle"
            defaultValue={product?.seoTitle ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <input
            name="metaDescription"
            defaultValue={product?.metaDescription ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Image (Unlit)</label>
          <input
            name="imageUnlit"
            defaultValue={product?.imageUnlit ?? ""}
            className={inputClass}
            placeholder="/images/products/..."
          />
        </div>
        <div>
          <label className={labelClass}>Image (Lit)</label>
          <input
            name="imageLit"
            defaultValue={product?.imageLit ?? ""}
            className={inputClass}
            placeholder="/images/products/lit/..."
          />
        </div>
        <div>
          <label className={labelClass}>Model Number</label>
          <input
            name="modelNumber"
            defaultValue={product?.modelNumber ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Tags (comma-separated slugs)</label>
          <input
            name="tagSlugs"
            defaultValue={tagValue}
            className={inputClass}
            placeholder="down-light, whites"
          />
        </div>
        <div>
          <label className={labelClass}>Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={product?.sortOrder ?? 0}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Page Type</label>
          <select
            name="pageType"
            defaultValue={product?.pageType ?? "spec"}
            className={inputClass}
          >
            <option value="spec">Spec</option>
            <option value="matrix">Matrix</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Short Description</label>
        <input
          name="description"
          defaultValue={product?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Specs (JSON)</label>
          <textarea
            name="specs"
            rows={6}
            defaultValue={product?.specs ?? ""}
            className={`${inputClass} font-mono text-xs`}
          />
        </div>
        <div>
          <label className={labelClass}>Key Highlights (JSON)</label>
          <textarea
            name="keyHighlights"
            rows={6}
            defaultValue={product?.keyHighlights ?? ""}
            className={`${inputClass} font-mono text-xs`}
          />
        </div>
        <div>
          <label className={labelClass}>Applications (JSON array)</label>
          <textarea
            name="applications"
            rows={4}
            defaultValue={product?.applications ?? ""}
            className={`${inputClass} font-mono text-xs`}
          />
        </div>
        <div>
          <label className={labelClass}>Features (JSON array)</label>
          <textarea
            name="features"
            rows={4}
            defaultValue={product?.features ?? ""}
            className={`${inputClass} font-mono text-xs`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className={`flex items-center gap-2 text-sm ${t.muted}`}>
          <input
            name="published"
            type="checkbox"
            defaultChecked={product?.published ?? true}
            className="accent-nextray-green"
          />
          Published
        </label>
        <label className={`flex items-center gap-2 text-sm ${t.muted}`}>
          <input
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured ?? false}
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
          className="rounded-lg bg-nextray-green px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-nextray-green-bright disabled:opacity-60"
        >
          {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
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

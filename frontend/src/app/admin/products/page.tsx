"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminFormStyles } from "@/components/admin/admin-form-styles";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  deleteProduct,
  fetchProducts,
  type AdminProduct,
} from "@/lib/admin-api";
import {
  ExternalLink,
  Package,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";

type StatusFilter = "all" | "live" | "draft";

function categoryHref(slug?: string) {
  if (!slug) return "/products/indoor";
  if (slug === "outdoor") return "/products/outdoor";
  if (slug === "powertronics") return "/products/powertronics";
  if (slug === "industrial") return "/products/industrial";
  return `/products/${slug}`;
}

export default function AdminProductsPage() {
  const { t, light } = useAdminTheme();
  const { inputClass } = useAdminFormStyles();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const load = () => {
    setLoading(true);
    fetchProducts()
      .then((r) => setProducts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const categories = useMemo(() => {
    const names = new Set(products.map((p) => p.category?.name).filter(Boolean));
    return Array.from(names) as string[];
  }, [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      const matchCategory =
        categoryFilter === "all" || p.category?.name === categoryFilter;
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "live" && p.published) ||
        (statusFilter === "draft" && !p.published);
      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  const liveCount = products.filter((p) => p.published).length;
  const draftCount = products.length - liveCount;

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteProduct(id);
    load();
  };

  const thumbBg = light ? "bg-[#f0f2ed]" : "bg-white/5";
  const theadBg = light ? "bg-[#f8faf5]" : "bg-white/[0.03]";
  const slugClass = light
    ? "rounded-md bg-[#f0f2ed] px-2 py-0.5 font-mono text-xs text-[#4a5568]"
    : "rounded-md bg-white/8 px-2 py-0.5 font-mono text-xs text-white/70";
  const actionBtn = light
    ? "rounded-lg border border-[#e8eaed] bg-white p-2 text-[#6b6b6b] transition-colors hover:border-nextray-green/40 hover:bg-nextray-green/8 hover:text-nextray-green"
    : "rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition-colors hover:border-nextray-green/30 hover:bg-nextray-green/10 hover:text-nextray-green";
  const deleteBtn = light
    ? "rounded-lg border border-[#e8eaed] bg-white p-2 text-[#6b6b6b] transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-500"
    : "rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400";

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage product catalog, SEO fields, images and tags."
        actionHref="/admin/products/new"
        actionLabel="Add Product"
      />

      {/* Stats */}
      <div className="mb-5 grid grid-cols-3 gap-3 sm:max-w-md">
        {[
          { label: "Total", value: products.length, accent: "" },
          { label: "Live", value: liveCount, accent: "text-nextray-green" },
          { label: "Draft", value: draftCount, accent: t.muted },
        ].map(({ label, value, accent }) => (
          <div
            key={label}
            className={`rounded-xl border px-4 py-3 ${t.card} ${t.cardBorder}`}
          >
            <p className={`text-[10px] font-bold uppercase tracking-wider ${t.mutedSoft}`}>
              {label}
            </p>
            <p className={`font-heading text-xl font-bold ${accent || t.heading}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div
        className={`mb-4 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center ${t.card} ${t.cardBorder}`}
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.mutedSoft}`}
          />
          <input
            type="search"
            placeholder="Search by name, slug or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} pl-9`}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`${inputClass} w-full sm:w-44`}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="flex gap-1.5">
          {(["all", "live", "draft"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                statusFilter === s ? t.filterActive : t.filterInactive
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-hidden rounded-xl border shadow-sm ${t.card} ${t.cardBorder}`}>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-nextray-green border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-nextray-green/10">
              <Package size={24} className="text-nextray-green" />
            </div>
            <p className={`font-medium ${t.heading}`}>
              {products.length === 0 ? "No products yet" : "No matching products"}
            </p>
            <p className={`mt-1 max-w-sm text-sm ${t.muted}`}>
              {products.length === 0
                ? "Run db:seed or add your first product."
                : "Try adjusting your search or filters."}
            </p>
            {products.length === 0 && (
              <Link
                href="/admin/products/new"
                className="mt-4 rounded-lg bg-nextray-green px-5 py-2.5 text-sm font-bold text-black"
              >
                Add Product
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className={`border-b ${t.cardBorder} ${theadBg}`}>
                  <th className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider ${t.tableHeader}`}>
                    Product
                  </th>
                  <th className={`hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider md:table-cell ${t.tableHeader}`}>
                    Slug
                  </th>
                  <th className={`hidden px-4 py-3 text-[10px] font-bold uppercase tracking-wider lg:table-cell ${t.tableHeader}`}>
                    Category
                  </th>
                  <th className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider ${t.tableHeader}`}>
                    Status
                  </th>
                  <th className={`px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wider ${t.tableHeader}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const previewHref = `${categoryHref(p.category?.slug)}/${p.slug}`;
                  return (
                    <tr
                      key={p.id}
                      className={`group border-b transition-colors last:border-0 ${t.cardBorder} ${t.rowHover}`}
                    >
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-lg ring-1 ${light ? "ring-[#e8eaed]" : "ring-white/10"} ${thumbBg}`}
                          >
                            {p.imageUnlit ? (
                              <Image
                                src={p.imageUnlit}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Package size={16} className="text-nextray-green/50" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/admin/products/${p.id}`}
                              className={`block truncate font-semibold transition-colors hover:text-nextray-green ${t.heading}`}
                            >
                              {p.title}
                            </Link>
                            <p className={`text-xs ${t.muted}`}>
                              {p.brand}
                              {p.featured && (
                                <span className="ml-2 text-[10px] font-bold uppercase text-nextray-green">
                                  · Featured
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-2.5 md:table-cell">
                        <span className={slugClass}>{p.slug}</span>
                      </td>
                      <td className="hidden px-4 py-2.5 lg:table-cell">
                        <span className="inline-flex rounded-full border border-nextray-green/25 bg-nextray-green/8 px-2.5 py-0.5 text-xs font-medium text-nextray-green">
                          {p.category?.name ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                            p.published
                              ? "bg-nextray-green/15 text-nextray-green"
                              : light
                                ? "bg-[#f0f2ed] text-[#6b6b6b]"
                                : "bg-white/10 text-white/50"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              p.published ? "bg-nextray-green" : light ? "bg-[#9ca3af]" : "bg-white/40"
                            }`}
                          />
                          {p.published ? "Live" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex justify-end gap-1.5 opacity-80 transition-opacity group-hover:opacity-100">
                          <Link
                            href={previewHref}
                            target="_blank"
                            title="View on site"
                            className={actionBtn}
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <Link
                            href={`/admin/products/${p.id}`}
                            title="Edit"
                            className={actionBtn}
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            type="button"
                            title="Delete"
                            onClick={() => handleDelete(p.id, p.title)}
                            className={deleteBtn}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div
            className={`border-t px-4 py-2.5 text-xs ${t.cardBorder} ${t.mutedSoft}`}
          >
            Showing {filtered.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  );
}

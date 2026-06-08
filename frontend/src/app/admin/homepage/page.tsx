"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminFormStyles } from "@/components/admin/admin-form-styles";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  fetchHomepageImages,
  updateHomepageImage,
  uploadHomepageImage,
  type AdminHomepageImage,
} from "@/lib/admin-api";
import { Home, ImageIcon, Save, Upload } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const TABS = [
  { id: "hero-product", label: "Hero Slider", desc: "5 product slides (lights on/off)" },
  { id: "area", label: "Areas We Serve", desc: "4 area cards with dual images" },
  { id: "client", label: "Client Logos", desc: "Logo carousel images" },
  { id: "certification", label: "Certifications", desc: "Certification section images" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function imageSrc(path?: string) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/uploads")) {
    return path.startsWith("/uploads") ? `${API_BASE}${path}` : path;
  }
  return path;
}

export default function AdminHomepagePage() {
  const { t, light } = useAdminTheme();
  const { inputClass, labelClass } = useAdminFormStyles();
  const [items, setItems] = useState<AdminHomepageImage[]>([]);
  const [tab, setTab] = useState<TabId>("hero-product");
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const load = () => {
    fetchHomepageImages()
      .then((r) => setItems(r.data))
      .catch(() => {});
  };

  useEffect(load, []);

  const filtered = items.filter((i) => i.section === tab);

  const handleSave = async (item: AdminHomepageImage, form: HTMLFormElement) => {
    setSaving(item.id);
    setMessage(null);
    const fd = new FormData(form);
    try {
      await updateHomepageImage(item.id, {
        title: String(fd.get("title") || ""),
        description: String(fd.get("description") || ""),
        imageUnlit: String(fd.get("imageUnlit") || "") || undefined,
        imageLit: String(fd.get("imageLit") || "") || undefined,
        image: String(fd.get("image") || "") || undefined,
        href: String(fd.get("href") || "") || undefined,
      });
      setMessage(`Saved "${item.title || item.key}"`);
      load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(null);
    }
  };

  const handleUpload = async (
    file: File,
    field: "imageUnlit" | "imageLit" | "image",
    input: HTMLInputElement
  ) => {
    try {
      const res = await uploadHomepageImage(file);
      input.value = res.data.path;
      setMessage(`Uploaded ${file.name}`);
    } catch {
      setMessage("Upload failed");
    }
  };

  const thumbRing = light ? "ring-[#e8eaed]" : "ring-white/10";

  return (
    <div>
      <AdminPageHeader
        title="Homepage Images"
        description="Manage hero slider, areas, client logos and certification images. Changes appear on the live homepage."
      />

      {message && (
        <p className="mb-4 rounded-lg border border-nextray-green/30 bg-nextray-green/10 px-4 py-2.5 text-sm text-nextray-green">
          {message}
        </p>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tdef) => (
          <button
            key={tdef.id}
            type="button"
            onClick={() => setTab(tdef.id)}
            className={`rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
              tab === tdef.id ? t.filterActive : t.filterInactive
            }`}
          >
            {tdef.label}
          </button>
        ))}
      </div>

      <p className={`mb-5 text-sm ${t.muted}`}>
        {TABS.find((x) => x.id === tab)?.desc}
      </p>

      <div className="space-y-5">
        {filtered.map((item) => (
          <form
            key={item.id}
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(item, e.currentTarget);
            }}
            className={`rounded-xl border p-5 ${t.card} ${t.cardBorder}`}
          >
            <div className="mb-4 flex items-center gap-2">
              <Home size={16} className="text-nextray-green" />
              <h3 className={`font-semibold ${t.heading}`}>
                {item.title || item.key}
              </h3>
              <span className={`font-mono text-xs ${t.mutedSoft}`}>{item.key}</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {(tab === "hero-product" || tab === "area") && (
                <>
                  <ImageField
                    label="Image (Lights Off / Day)"
                    name="imageUnlit"
                    defaultValue={item.imageUnlit ?? ""}
                    preview={item.imageUnlit}
                    inputClass={inputClass}
                    labelClass={labelClass}
                    thumbRing={thumbRing}
                    onUpload={(f, input) => handleUpload(f, "imageUnlit", input)}
                  />
                  <ImageField
                    label="Image (Lights On / Night)"
                    name="imageLit"
                    defaultValue={item.imageLit ?? ""}
                    preview={item.imageLit}
                    inputClass={inputClass}
                    labelClass={labelClass}
                    thumbRing={thumbRing}
                    onUpload={(f, input) => handleUpload(f, "imageLit", input)}
                  />
                </>
              )}

              {(tab === "client" || tab === "certification") && (
                <ImageField
                  label="Image"
                  name="image"
                  defaultValue={item.image ?? ""}
                  preview={item.image}
                  inputClass={inputClass}
                  labelClass={labelClass}
                  thumbRing={thumbRing}
                  onUpload={(f, input) => handleUpload(f, "image", input)}
                />
              )}

              {tab !== "client" && (
                <>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      name="title"
                      defaultValue={item.title ?? ""}
                      className={inputClass}
                    />
                  </div>
                  {tab !== "certification" && (
                    <div>
                      <label className={labelClass}>Link (optional)</label>
                      <input
                        name="href"
                        defaultValue={item.href ?? ""}
                        className={inputClass}
                        placeholder="/products/outdoor"
                      />
                    </div>
                  )}
                  <div className="lg:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={item.description ?? ""}
                      className={inputClass}
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={saving === item.id}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-nextray-green px-5 py-2.5 text-sm font-bold text-black disabled:opacity-60"
            >
              <Save size={15} />
              {saving === item.id ? "Saving..." : "Save Changes"}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

function ImageField({
  label,
  name,
  defaultValue,
  preview,
  inputClass,
  labelClass,
  thumbRing,
  onUpload,
}: {
  label: string;
  name: string;
  defaultValue: string;
  preview?: string;
  inputClass: string;
  labelClass: string;
  thumbRing: string;
  onUpload: (file: File, input: HTMLInputElement) => void;
}) {
  const src = imageSrc(preview);

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-3">
        {src && (
          <div
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ${thumbRing}`}
          >
            <Image src={src} alt="" fill className="object-cover" unoptimized />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input name={name} defaultValue={defaultValue} className={inputClass} placeholder="/images/... or /uploads/homepage/..." />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-nextray-green/30 bg-nextray-green/8 px-3 py-1.5 text-xs font-bold uppercase text-nextray-green hover:bg-nextray-green/15">
            <Upload size={14} />
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const pathInput = e.target
                  .closest(".min-w-0")
                  ?.querySelector(`input[name="${name}"]`) as HTMLInputElement;
                if (file && pathInput) onUpload(file, pathInput);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

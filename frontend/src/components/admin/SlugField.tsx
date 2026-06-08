"use client";

import { useState } from "react";
import { Link2, RefreshCw } from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { useAutoSlug } from "@/hooks/useAutoSlug";

type SlugFieldProps = {
  sourceLabel?: string;
  slugLabel?: string;
  sourceName: string;
  slugName: string;
  initialSource?: string;
  initialSlug?: string;
  isEdit?: boolean;
  sourcePlaceholder?: string;
  slugPlaceholder?: string;
  inputClass: string;
  labelClass?: string;
  required?: boolean;
  /** Build the public path shown in the preview bar (e.g. `/blog/my-post`). */
  urlPreview?: (slug: string) => string;
  layout?: "labeled" | "inline";
};

export default function SlugField({
  sourceLabel = "Name",
  slugLabel = "Slug",
  sourceName,
  slugName,
  initialSource = "",
  initialSlug = "",
  isEdit = false,
  sourcePlaceholder,
  slugPlaceholder = "auto-generated-slug",
  inputClass,
  labelClass,
  required = true,
  urlPreview,
  layout = "labeled",
}: SlugFieldProps) {
  const { t } = useAdminTheme();
  const [source, setSource] = useState(initialSource);
  const { slug, setSlug, autoSync, enableAutoSync } = useAutoSlug(
    source,
    initialSlug,
    !isEdit || !initialSlug
  );

  const previewPath = slug && urlPreview ? urlPreview(slug) : null;
  const showLabels = layout === "labeled" && labelClass;

  return (
    <>
      <div>
        {showLabels && <label className={labelClass}>{sourceLabel}{required ? " *" : ""}</label>}
        <input
          name={sourceName}
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required={required}
          placeholder={sourcePlaceholder ?? sourceLabel}
          className={inputClass}
        />
      </div>

      <div>
        {showLabels && <label className={labelClass}>{slugLabel}{required ? " *" : ""}</label>}
        <div className="relative">
          <input
            name={slugName}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required={required}
            pattern="[a-z0-9-]+"
            placeholder={slugPlaceholder}
            className={`${inputClass} ${autoSync ? "border-nextray-green/60 ring-1 ring-nextray-green/30" : ""}`}
          />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          {autoSync ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-nextray-green">
              Auto-synced from {sourceLabel.toLowerCase()}
            </span>
          ) : (
            <>
              <span className={`text-[10px] uppercase tracking-wider ${t.mutedSoft}`}>
                Custom slug
              </span>
              <button
                type="button"
                onClick={enableAutoSync}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-nextray-green hover:underline"
              >
                <RefreshCw size={10} />
                Sync from {sourceLabel.toLowerCase()}
              </button>
            </>
          )}
        </div>
      </div>

      {previewPath && (
        <div
          className={`rounded-lg border px-3 py-2.5 md:col-span-2 ${
            layout === "inline" ? "mt-0" : ""
          } border-nextray-green/25 bg-nextray-green/5`}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <Link2 size={12} className="text-nextray-green" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-nextray-green">
              Public URL preview
            </p>
          </div>
          <p className="break-all font-mono text-sm text-nextray-green">{previewPath}</p>
        </div>
      )}
    </>
  );
}

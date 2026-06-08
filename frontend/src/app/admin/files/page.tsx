"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSelect from "@/components/admin/AdminSelect";
import { useAdminFormStyles } from "@/components/admin/admin-form-styles";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  deleteMediaFile,
  fetchMediaFiles,
  uploadFile,
  type MediaFile,
} from "@/lib/admin-api";
import { Download, Trash2, Upload } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const CATEGORY_OPTIONS = [
  { value: "datasheet", label: "Datasheet (product pages)" },
  { value: "brochure", label: "Brochure" },
  { value: "catalog", label: "Catalog" },
  { value: "general", label: "General" },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminFilesPage() {
  const { t } = useAdminTheme();
  const { inputClass } = useAdminFormStyles();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = () => {
    fetchMediaFiles()
      .then((r) => setFiles(r.data))
      .catch(() => setError("Failed to load files. Is the backend running?"));
  };

  useEffect(load, []);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUploading(true);

    const fd = new FormData(e.currentTarget);
    const file = fd.get("file") as File;
    if (!file?.size) {
      setError("Please choose a file to upload.");
      setUploading(false);
      return;
    }

    try {
      await uploadFile(
        file,
        String(fd.get("title") || file.name),
        String(fd.get("category") || "datasheet")
      );
      (e.target as HTMLFormElement).reset();
      setSuccess(`"${file.name}" uploaded successfully.`);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Downloads & Files"
        description="Upload datasheets, brochures and catalogs. Set category to control where download buttons appear."
      />

      <form
        onSubmit={handleUpload}
        className={`mb-8 rounded-xl border p-6 ${t.panel}`}
      >
        <h2 className={`mb-4 flex items-center gap-2 font-heading font-bold ${t.heading}`}>
          <Upload size={18} className="text-nextray-green" />
          Upload File
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="title"
            placeholder="Display title"
            className={inputClass}
          />
          <AdminSelect
            name="category"
            options={CATEGORY_OPTIONS}
            defaultValue="datasheet"
          />
          <input
            name="file"
            type="file"
            required
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
            className={`flex items-center text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-nextray-green file:px-4 file:py-2.5 file:text-xs file:font-bold file:uppercase file:text-black ${t.muted}`}
          />
        </div>
        <p className={`mt-3 text-xs ${t.mutedSoft}`}>
          Files marked &quot;Datasheet&quot; appear on product pages. Max 20 MB.
        </p>

        {error && (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-3 rounded-lg border border-nextray-green/30 bg-nextray-green/10 px-4 py-2.5 text-sm text-nextray-green">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="mt-4 rounded-lg bg-nextray-green px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-nextray-green-bright disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="space-y-3">
        {files.map((f) => (
          <div
            key={f.id}
            className={`flex items-center justify-between rounded-xl border px-5 py-4 ${t.card} ${t.cardBorder}`}
          >
            <div>
              <p className={`font-medium ${t.heading}`}>{f.title}</p>
              <p className={`text-xs ${t.mutedSoft}`}>
                {f.category} · {f.originalName} · {formatSize(f.size)}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`${API_BASE}/api/downloads/${f.id}`}
                className="rounded-lg p-2 text-nextray-green hover:bg-nextray-green/10"
              >
                <Download size={16} />
              </a>
              <button
                type="button"
                onClick={async () => {
                  if (!confirm("Delete this file?")) return;
                  await deleteMediaFile(f.id);
                  load();
                }}
                className={`rounded-lg p-2 ${t.mutedSoft} hover:text-red-400`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {!files.length && !error && (
          <p className={`py-8 text-center text-sm ${t.mutedSoft}`}>
            No files uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  deleteSubmission,
  fetchSubmissions,
  markSubmissionRead,
  type FormSubmission,
} from "@/lib/admin-api";
import { Trash2 } from "lucide-react";

export default function AdminSubmissionsPage() {
  const { t } = useAdminTheme();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const load = () => {
    const type = filter === "all" ? undefined : filter;
    fetchSubmissions(type)
      .then((r) => setSubmissions(r.data))
      .catch(() => {});
  };

  useEffect(load, [filter]);

  return (
    <div>
      <AdminPageHeader
        title="Form Submissions"
        description="Contact and associates form responses."
      />

      <div className="mb-6 flex gap-2">
        {["all", "contact", "associates"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider ${
              filter === f ? t.filterActive : t.filterInactive
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {submissions.map((s) => (
          <div
            key={s.id}
            className={`rounded-xl border p-5 ${s.read ? t.readCard : t.unreadCard}`}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-nextray-green/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-nextray-green">
                  {s.type}
                </span>
                {!s.read && (
                  <span className="text-[10px] font-bold uppercase text-nextray-green">
                    New
                  </span>
                )}
              </div>
              <span className={`text-xs ${t.mutedSoft}`}>
                {new Date(s.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="mb-4 grid gap-2 sm:grid-cols-2">
              {Object.entries(s.data).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className={`text-xs font-bold uppercase ${t.mutedSoft}`}>
                    {key}:{" "}
                  </span>
                  <span className={t.muted}>{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {!s.read && (
                <button
                  type="button"
                  onClick={async () => {
                    await markSubmissionRead(s.id);
                    load();
                  }}
                  className="rounded-lg bg-nextray-green/15 px-3 py-1.5 text-xs font-bold text-nextray-green"
                >
                  Mark Read
                </button>
              )}
              <button
                type="button"
                onClick={async () => {
                  await deleteSubmission(s.id);
                  load();
                }}
                className={`rounded-lg p-1.5 ${t.mutedSoft} hover:text-red-400`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {!submissions.length && (
          <p className={`py-12 text-center text-sm ${t.mutedSoft}`}>
            No submissions yet.
          </p>
        )}
      </div>
    </div>
  );
}

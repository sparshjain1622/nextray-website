"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";

export default function AdminPageHeader({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  const { t } = useAdminTheme();

  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className={`font-heading text-2xl font-bold ${t.heading}`}>
          {title}
        </h1>
        {description && (
          <p className={`mt-1 text-sm ${t.muted}`}>{description}</p>
        )}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 rounded-lg bg-nextray-green px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-nextray-green-bright"
        >
          <Plus size={16} />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

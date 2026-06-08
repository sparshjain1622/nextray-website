"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDashboard, type DashboardStats } from "@/lib/admin-api";
import { useAdminTheme } from "@/context/AdminThemeContext";
import {
  BarChart3,
  Eye,
  Inbox,
  LayoutGrid,
  Package,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { t, light } = useAdminTheme();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchDashboard()
      .then((r) => setStats(r.data))
      .catch(() => {});
  }, []);

  const statCard = `rounded-xl border p-5 ${t.card} ${t.cardBorder}`;
  const listItem = light
    ? "rounded-lg bg-[#f8faf5] px-4 py-2.5 text-sm"
    : "rounded-lg bg-white/5 px-4 py-2.5 text-sm";

  return (
    <div>
      <div className="mb-8">
        <h1 className={`font-heading text-2xl font-bold ${t.heading}`}>
          Dashboard
        </h1>
        <p className={`mt-1 text-sm ${t.muted}`}>
          Overview of site activity, products, and form submissions.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Page Views", value: stats?.totalViews ?? "—", icon: Eye },
          { label: "Views (7 days)", value: stats?.weekViews ?? "—", icon: TrendingUp },
          { label: "Unread Submissions", value: stats?.unreadSubmissions ?? "—", icon: Inbox },
          { label: "Products", value: stats?.totalProducts ?? "—", icon: Package },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className={statCard}>
            <div className="mb-3 flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${t.mutedSoft}`}>
                {label}
              </span>
              <div className="rounded-lg bg-nextray-green/10 p-2">
                <Icon size={18} className="text-nextray-green" />
              </div>
            </div>
            <p className={`font-heading text-3xl font-bold ${t.heading}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`rounded-xl border p-6 ${t.card} ${t.cardBorder}`}>
          <h2 className={`mb-4 flex items-center gap-2 font-heading text-lg font-bold ${t.heading}`}>
            <BarChart3 size={20} className="text-nextray-green" />
            Top Pages
          </h2>
          {stats?.topPages?.length ? (
            <ul className="space-y-2">
              {stats.topPages.map((p) => (
                <li key={p.path} className={`flex items-center justify-between ${listItem}`}>
                  <span className={`truncate ${t.muted}`}>{p.path}</span>
                  <span className="ml-4 shrink-0 font-semibold text-nextray-green">
                    {p.views}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-sm ${t.mutedSoft}`}>No analytics data yet.</p>
          )}
        </div>

        <div className={`rounded-xl border p-6 ${t.card} ${t.cardBorder}`}>
          <h2 className={`mb-4 flex items-center gap-2 font-heading text-lg font-bold ${t.heading}`}>
            <LayoutGrid size={20} className="text-nextray-green" />
            Quick Actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/admin/products", label: "Manage Products" },
              { href: "/admin/submissions", label: "View Submissions" },
              { href: "/admin/files", label: "Upload Files" },
              { href: "/admin/categories", label: "Edit Categories" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="rounded-lg border border-nextray-green/20 bg-nextray-green/5 px-4 py-3 text-sm font-semibold text-nextray-green transition-colors hover:bg-nextray-green/15"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

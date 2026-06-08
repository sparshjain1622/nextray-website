"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { fetchDashboard, type DashboardStats } from "@/lib/admin-api";
import { BarChart3, Eye, TrendingUp } from "lucide-react";

export default function AdminAnalyticsPage() {
  const { t, light } = useAdminTheme();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchDashboard()
      .then((r) => setStats(r.data))
      .catch(() => {});
  }, []);

  const barBg = light ? "bg-[#f0f2ed]" : "bg-white/5";

  return (
    <div>
      <AdminPageHeader
        title="Analytics"
        description="Page view tracking across the site."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "All Time", value: stats?.totalViews, icon: Eye },
          { label: "Last 30 Days", value: stats?.monthViews, icon: BarChart3 },
          { label: "Last 7 Days", value: stats?.weekViews, icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className={`rounded-xl border p-5 ${t.card} ${t.cardBorder}`}
          >
            <div className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${t.mutedSoft}`}>
              <Icon size={14} className="text-nextray-green" />
              {label}
            </div>
            <p className={`font-heading text-3xl font-bold ${t.heading}`}>
              {value ?? "—"}
            </p>
          </div>
        ))}
      </div>

      <div className={`rounded-xl border p-6 ${t.card} ${t.cardBorder}`}>
        <h2 className={`mb-4 font-heading text-lg font-bold ${t.heading}`}>
          Top Pages
        </h2>
        {stats?.topPages?.length ? (
          <div className="space-y-2">
            {stats.topPages.map((p) => {
              const max = stats.topPages[0]?.views || 1;
              const pct = Math.round((p.views / max) * 100);
              return (
                <div key={p.path}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className={`truncate ${t.muted}`}>{p.path}</span>
                    <span className="ml-4 shrink-0 font-semibold text-nextray-green">
                      {p.views}
                    </span>
                  </div>
                  <div className={`h-2 overflow-hidden rounded-full ${barBg}`}>
                    <div
                      className="h-full rounded-full bg-nextray-green"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={`text-sm ${t.mutedSoft}`}>
            Analytics will populate as visitors browse the site.
          </p>
        )}
      </div>
    </div>
  );
}

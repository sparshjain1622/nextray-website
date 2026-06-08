"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { adminMe } from "@/lib/admin-api";
import { useAdminTheme } from "@/context/AdminThemeContext";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const { light, t } = useAdminTheme();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }

    adminMe()
      .then(() => setReady(true))
      .catch(() => router.replace("/admin/login"));
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${t.pageBg}`}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nextray-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${t.pageBg} ${t.pageText}`}
      data-admin-theme={light ? "light" : "dark"}
    >
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}

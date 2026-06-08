"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Tags,
  ImageIcon,
  Newspaper,
} from "lucide-react";
import { adminLogout } from "@/lib/admin-api";
import { useAdminTheme } from "@/context/AdminThemeContext";
import AdminThemeToggle from "./AdminThemeToggle";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/homepage", label: "Homepage", icon: ImageIcon },
  { href: "/admin/files", label: "Downloads", icon: FolderOpen },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { t, light } = useAdminTheme();

  return (
    <aside
      className={`sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r ${t.sidebar} ${t.sidebarBorder}`}
    >
      <div className={`border-b px-6 py-5 ${t.sidebarBorder}`}>
        <Link href="/" className="block">
          <span className={`font-heading text-lg font-bold ${t.heading}`}>
            Nextray
          </span>
          <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-nextray-green">
            Admin Panel
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? t.navActive : t.navInactive
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className={`mt-auto space-y-1 border-t p-4 pb-6 ${t.sidebarBorder}`}>
        <AdminThemeToggle />
        <button
          type="button"
          onClick={() => {
            adminLogout();
            window.location.href = "/admin/login";
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            light ? "text-[#9ca3af]" : "text-[#c0c0c0]"
          } hover:bg-red-500/10 hover:text-red-400`}
        >
          <LogOut size={18} className="shrink-0" aria-hidden />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

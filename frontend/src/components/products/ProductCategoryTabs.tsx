"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { usePublicCategories } from "@/hooks/usePublicCategories";

export default function ProductCategoryTabs() {
  const pathname = usePathname();
  const { lightsOn } = useTheme();
  const { navItems } = usePublicCategories();

  return (
    <div
      className={`border-b ${
        lightsOn ? "border-[#e0e0e0] bg-white" : "border-white/10 bg-section-secondary"
      }`}
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 lg:px-6">
        {navItems.map((cat) => {
          const active =
            pathname === cat.href || pathname.startsWith(`${cat.href}/`);

          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors md:px-6 md:text-sm ${
                active
                  ? "border-nextray-green text-nextray-green"
                  : lightsOn
                    ? "border-transparent text-[#6b6b6b] hover:text-nextray-green"
                    : "border-transparent text-white/60 hover:text-nextray-green"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

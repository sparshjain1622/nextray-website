"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  indoorDownlights,
  productCategories,
} from "@/lib/products-data";
import { ChevronsRight } from "lucide-react";

export default function ProductSidebar() {
  const pathname = usePathname();
  const isIndoor = pathname.startsWith("/products/indoor");

  return (
    <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-sm bg-nextray-green shadow-lg">
        <div className="border-b border-white/15 px-5 py-4">
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            Products Range
          </p>
        </div>
        <ul>
          {productCategories.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href} className="border-b border-white/10 last:border-0">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-3 text-sm transition-colors ${
                    active
                      ? "bg-white/15 font-semibold text-white"
                      : "text-white/95 hover:bg-white/10"
                  }`}
                >
                  <ChevronsRight size={14} className="shrink-0 text-white/80" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {isIndoor && (
        <div className="overflow-hidden rounded-sm border border-nextray-green/30 bg-card shadow-md">
          <div className="border-b border-theme bg-nextray-green/10 px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-wider text-nextray-green">
              Whites — Down Light
            </p>
          </div>
          <ul>
            {indoorDownlights.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href} className="border-b border-theme last:border-0">
                  <Link
                    href={item.href}
                    className={`block px-5 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-nextray-green/15 font-semibold text-nextray-green"
                        : "text-theme-body hover:bg-nextray-green/10 hover:text-nextray-green"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
}

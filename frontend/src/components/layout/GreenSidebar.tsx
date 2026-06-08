"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";

interface GreenSidebarProps {
  heading: string;
  items: readonly { label: string; href: string }[];
}

export default function GreenSidebar({ heading, items }: GreenSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-sm bg-nextray-green shadow-lg">
        <div className="border-b border-white/15 px-5 py-4">
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            {heading}
          </p>
        </div>
        <ul>
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="border-b border-white/10 last:border-0">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-white/15 font-semibold text-white"
                      : "text-white/95 hover:bg-white/10"
                  }`}
                >
                  <ChevronsRight
                    size={14}
                    className="shrink-0 text-white/80"
                    aria-hidden
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

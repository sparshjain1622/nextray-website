"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import type { ProductDetail } from "@/lib/products-data";
import {
  indoorDownlights,
  outdoorStreetLights,
  outdoorFloodLights,
  powertronicsItems,
} from "@/lib/products-data";
import { ChevronRight, Lamp, Lightbulb } from "lucide-react";
import WarrantyBadge from "./WarrantyBadge";

function SubNavList({
  items,
  pathname,
}: {
  items: readonly { label: string; href: string }[];
  pathname: string;
}) {
  const { lightsOn } = useTheme();

  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-nextray-green font-semibold text-white"
                  : lightsOn
                    ? "text-[#4a4a4a] hover:bg-nextray-green/10 hover:text-nextray-green"
                    : "text-white/70 hover:bg-nextray-green/10 hover:text-nextray-green"
              }`}
            >
              {item.label}
              <ChevronRight size={14} className="opacity-70" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function CategoryButton({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Lamp;
  active: boolean;
}) {
  const { lightsOn } = useTheme();

  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
        active
          ? "bg-nextray-green text-white shadow-md"
          : lightsOn
            ? "border border-[#e8eaed] bg-white text-[#1a1a1a] hover:border-nextray-green/40"
            : "border border-white/10 bg-card text-white hover:border-nextray-green/40"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon size={18} />
        {label}
      </span>
      <ChevronRight size={16} />
    </Link>
  );
}

interface ProductPremiumSidebarProps {
  product: ProductDetail;
}

export default function ProductPremiumSidebar({
  product,
}: ProductPremiumSidebarProps) {
  const pathname = usePathname();
  const { lightsOn } = useTheme();

  const panelClass = `rounded-xl border p-4 ${
    lightsOn
      ? "border-[#e8eaed] bg-[#f8f9fa]"
      : "border-white/10 bg-card"
  }`;

  const isIndoor = product.categoryHref === "/products/indoor";
  const isOutdoor = product.categoryHref === "/products/outdoor";
  const isPowertronics = product.categoryHref === "/products/powertronics";

  return (
    <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
      {isOutdoor && (
        <div className={`${panelClass} space-y-2`}>
          <CategoryButton
            href="/products/outdoor/25-watt-street-light"
            label="Street Light"
            icon={Lamp}
            active={product.subGroup === "street-light"}
          />
          <CategoryButton
            href="/products/outdoor/down-choke"
            label="Flood Light"
            icon={Lightbulb}
            active={product.subGroup === "flood-light"}
          />
        </div>
      )}

      {isIndoor && (
        <div className={panelClass}>
          <p className="mb-3 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-nextray-green">
            <ChevronRight size={14} />
            <ChevronRight size={14} className="-ml-2" />
            Down Light
          </p>
          <SubNavList items={indoorDownlights} pathname={pathname} />
        </div>
      )}

      {isOutdoor && product.subGroup === "street-light" && (
        <div className={panelClass}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-nextray-green">
            Street Light
          </p>
          <SubNavList items={outdoorStreetLights} pathname={pathname} />
        </div>
      )}

      {isOutdoor && product.subGroup === "flood-light" && (
        <div className={panelClass}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-nextray-green">
            Flood Light
          </p>
          <SubNavList items={outdoorFloodLights} pathname={pathname} />
        </div>
      )}

      {isPowertronics && (
        <div className={panelClass}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-nextray-green">
            Powertronics
          </p>
          <SubNavList items={powertronicsItems} pathname={pathname} />
        </div>
      )}

      {!isPowertronics && (
        <div className="pb-3">
          <WarrantyBadge />
        </div>
      )}
    </aside>
  );
}

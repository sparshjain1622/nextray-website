"use client";

import { useTheme } from "@/context/ThemeContext";
import type { SpecTable } from "@/lib/products-data";
import {
  Building2,
  Cpu,
  Layers,
  Lightbulb,
  Settings,
  VolumeX,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ProductSpecTable from "./ProductSpecTable";

const iconMap: Record<string, LucideIcon> = {
  mechanical: Settings,
  electrical: Zap,
  material: Layers,
  led: Cpu,
  application: Building2,
  features: VolumeX,
  technical: Lightbulb,
};

interface ProductSpecCardProps {
  table: SpecTable;
  variant?: "table" | "list";
  items?: readonly string[];
}

export function ProductSpecCard({ table, variant = "table" }: ProductSpecCardProps) {
  const { lightsOn } = useTheme();
  const iconKey = table.title.toLowerCase().includes("mechanical")
    ? "mechanical"
    : table.title.toLowerCase().includes("electrical")
      ? "electrical"
      : table.title.toLowerCase().includes("material")
        ? "material"
        : table.title.toLowerCase().includes("led")
          ? "led"
          : table.title.toLowerCase().includes("technical")
            ? "technical"
            : "mechanical";

  const Icon = iconMap[iconKey];

  if (variant === "table") {
    return <ProductSpecTable table={table} />;
  }

  return null;
}

export function ProductListCard({
  title,
  items,
  iconKey,
}: {
  title: string;
  items: readonly string[];
  iconKey: string;
}) {
  const { lightsOn } = useTheme();
  const Icon = iconMap[iconKey] ?? Building2;

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-xl border shadow-sm ${
        lightsOn ? "border-[#e8eaed] bg-white" : "border-white/10 bg-card"
      }`}
    >
      <div className="flex items-center gap-2 bg-nextray-green px-5 py-3.5">
        <Icon size={16} className="text-white" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
          {title}
        </h3>
      </div>
      <ul className="relative flex-1 space-y-2 p-5">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-2 text-sm before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-nextray-green before:content-[''] ${
              lightsOn ? "text-[#4a4a4a]" : "text-white/70"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      {iconKey === "application" && (
        <div className="pointer-events-none absolute bottom-2 right-2 opacity-[0.07]">
          <Building2 size={80} className="text-nextray-green" />
        </div>
      )}
      {iconKey === "features" && (
        <div className="pointer-events-none absolute bottom-2 right-2 opacity-[0.07]">
          <Lightbulb size={80} className="text-nextray-green" />
        </div>
      )}
    </div>
  );
}

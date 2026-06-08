"use client";

import { useTheme } from "@/context/ThemeContext";
import { Check } from "lucide-react";

interface ContentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentCard({ title, children, className = "" }: ContentCardProps) {
  const { lightsOn } = useTheme();

  return (
    <div
      className={`rounded-xl border p-6 md:p-8 ${
        lightsOn
          ? "border-[#e8eaed] bg-white shadow-sm"
          : "border-white/10 bg-card"
      } ${className}`}
    >
      {title && (
        <h2
          className={`mb-6 font-heading text-2xl font-bold md:text-3xl ${
            lightsOn ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  const { lightsOn } = useTheme();

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-2 text-sm md:text-base ${
            lightsOn ? "text-[#4a4a4a]" : "text-white/70"
          }`}
        >
          <Check size={16} className="mt-1 shrink-0 text-nextray-green" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function BodyText({ children }: { children: React.ReactNode }) {
  const { lightsOn } = useTheme();

  return (
    <p
      className={`mb-4 text-sm leading-relaxed md:text-base ${
        lightsOn ? "text-[#4a4a4a]" : "text-white/70"
      }`}
    >
      {children}
    </p>
  );
}

export function HighlightGrid({
  items,
}: {
  items: readonly { label: string; value: string }[];
}) {
  const { lightsOn } = useTheme();

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-lg border p-5 text-center ${
            lightsOn
              ? "border-nextray-green/25 bg-nextray-green/5"
              : "border-nextray-green/20 bg-nextray-green/10"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-nextray-green">
            {item.label}
          </p>
          <p
            className={`mt-2 font-heading text-lg font-bold ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { indoorDownlights, productDetails } from "@/lib/products-data";
import { ArrowRight } from "lucide-react";

export default function IndoorProductsList() {
  const { lightsOn } = useTheme();

  return (
    <div
      className={`rounded-xl border p-6 md:p-8 ${
        lightsOn
          ? "border-[#e8eaed] bg-white shadow-sm"
          : "border-white/10 bg-card"
      }`}
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-nextray-green">
        Whites
      </p>
      <h2
        className={`mb-4 font-heading text-2xl font-bold ${
          lightsOn ? "text-[#1a1a1a]" : "text-white"
        }`}
      >
        Down Light Range
      </h2>
      <p
        className={`mb-8 text-sm leading-relaxed ${
          lightsOn ? "text-[#6b6b6b]" : "text-white/65"
        }`}
      >
        Precision-engineered indoor down lights for residential, commercial and
        institutional spaces. Select a product to view full specifications.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {indoorDownlights.map((item) => {
          const slug = item.href.split("/").pop() ?? "";
          const available = slug in productDetails;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group flex items-center justify-between rounded-lg border px-4 py-3.5 text-sm font-medium transition-all ${
                  lightsOn
                    ? "border-[#e8eaed] bg-[#f8f9fa] text-[#1a1a1a] hover:border-nextray-green/40 hover:bg-nextray-green/5 hover:text-nextray-green"
                    : "border-white/10 bg-white/5 text-white/90 hover:border-nextray-green/40 hover:bg-nextray-green/10 hover:text-nextray-green"
                } ${!available ? "opacity-60" : ""}`}
              >
                <span>
                  {item.label}
                  {!available && (
                    <span className="ml-2 text-[10px] uppercase tracking-wide text-nextray-green/80">
                      Soon
                    </span>
                  )}
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-nextray-green transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

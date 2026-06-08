"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, MessageCircle } from "lucide-react";
import ProductDownloads from "./ProductDownloads";

export default function ProductBottomCTA() {
  const { lightsOn } = useTheme();

  return (
    <div
      className={`mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border px-5 py-5 md:flex-row md:px-8 md:py-6 ${
        lightsOn
          ? "border-[#e8eaed] bg-[#f0f2f5]"
          : "border-white/10 bg-section-secondary"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-nextray-green/15">
          <MessageCircle size={22} className="text-nextray-green" />
        </div>
        <div>
          <p
            className={`font-heading text-base font-bold ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Need Assistance?
          </p>
          <p
            className={`text-sm ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            Our team is here to help you with the best lighting solution for
            your project.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-3 md:w-auto">
        <Link
          href="/contact"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-nextray-green px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-nextray-green-bright md:flex-none"
        >
          Enquire Now
          <ArrowRight size={16} />
        </Link>
        <ProductDownloads />
      </div>
    </div>
  );
}

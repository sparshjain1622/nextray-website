"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ChevronRight } from "lucide-react";

interface AboutPageBannerProps {
  breadcrumb: string;
}

export default function AboutPageBanner({ breadcrumb }: AboutPageBannerProps) {
  const { lightsOn } = useTheme();

  return (
    <section
      className={`border-b ${
        lightsOn
          ? "border-[#e0e0e0] bg-[#f0f2f5]"
          : "border-white/10 bg-section-secondary"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
        <nav
          aria-label="Breadcrumb"
          className={`mb-2 flex flex-wrap items-center gap-1.5 text-sm ${
            lightsOn ? "text-[#6b6b6b]" : "text-white/60"
          }`}
        >
          <Link href="/" className="transition-colors hover:text-nextray-green">
            Home
          </Link>
          <ChevronRight size={14} className="opacity-60" />
          <Link
            href="/about"
            className="transition-colors hover:text-nextray-green"
          >
            About Us
          </Link>
          <ChevronRight size={14} className="opacity-60" />
          <span className={lightsOn ? "text-[#1a1a1a]" : "text-white"}>
            {breadcrumb}
          </span>
        </nav>

        <h1
          className={`font-heading text-3xl font-bold uppercase tracking-wide md:text-4xl ${
            lightsOn ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          {breadcrumb}
        </h1>
      </div>
    </section>
  );
}

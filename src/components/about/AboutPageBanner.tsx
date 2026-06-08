"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { ChevronRight } from "lucide-react";

interface AboutPageBannerProps {
  breadcrumb: string;
}

export default function AboutPageBanner({ breadcrumb }: AboutPageBannerProps) {
  const { lightsOn } = useTheme();

  return (
    <section
      className={`relative overflow-hidden border-b ${
        lightsOn ? "border-[#e0e0e0] bg-[#e8eaed]" : "border-white/10 bg-section-secondary"
      }`}
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/strength/strength_banner.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div
        className={`absolute inset-0 ${
          lightsOn
            ? "bg-gradient-to-r from-white/90 via-white/80 to-white/70"
            : "bg-gradient-to-r from-black/85 via-black/75 to-black/65"
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <nav
          aria-label="Breadcrumb"
          className={`mb-3 flex flex-wrap items-center gap-1.5 text-sm ${
            lightsOn ? "text-[#6b6b6b]" : "text-white/60"
          }`}
        >
          <Link
            href="/"
            className="transition-colors hover:text-nextray-green"
          >
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

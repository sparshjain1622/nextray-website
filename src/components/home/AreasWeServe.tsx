"use client";

import Link from "next/link";
import {
  areasWeServe,
  areasWeServeCta,
  areasWeServeSubtitle,
} from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import ProductLightImage from "./ProductLightImage";
import RotatingWords from "./RotatingWords";
import { StaggerContainer, StaggerItem } from "./AnimateIn";
import {
  Armchair,
  ArrowRight,
  Cog,
  Factory,
  LampFloor,
  Package,
} from "lucide-react";

const areaIcons = {
  armchair: Armchair,
  lamp: LampFloor,
  factory: Factory,
  package: Package,
};

export default function AreasWeServe() {
  const { lightsOn } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-14 md:py-24 ${
        lightsOn ? "bg-white" : "bg-section-secondary"
      }`}
    >
      {/* Dot grid — top-left */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-64 w-80 opacity-30"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Dot grid — bottom-right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-80 opacity-30"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Green blob — top-right */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-nextray-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-nextray-green" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
              Areas We Serve
            </span>
            <span className="h-px w-10 bg-nextray-green" />
          </div>

          <h2
            className={`mb-5 font-heading text-3xl font-bold md:text-4xl lg:text-[2.5rem] ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Lighting for{" "}
            <RotatingWords
              words={[
                "Commercial",
                "Outdoor",
                "Industrial",
                "OEM & Custom",
              ]}
              className="text-3xl md:text-4xl lg:text-[2.5rem]"
            />
          </h2>

          <p
            className={`mx-auto max-w-2xl text-base leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            {areasWeServeSubtitle}
          </p>
        </div>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-2 items-stretch gap-3 md:gap-8 lg:grid-cols-4">
          {areasWeServe.map((area) => {
            const Icon = areaIcons[area.icon];
            return (
              <StaggerItem key={area.title} className="h-full">
                <Link
                  href={area.href}
                  className={`group flex h-full flex-col overflow-hidden rounded-xl border-b-2 border-nextray-green shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg md:rounded-2xl ${
                    lightsOn
                      ? "bg-white shadow-black/8"
                      : "bg-card shadow-black/20"
                  }`}
                >
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl md:rounded-t-2xl">
                      <ProductLightImage
                        imageUnlit={area.imageUnlit}
                        imageLit={area.imageLit}
                        alt={area.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div
                      className={`absolute bottom-0 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full shadow-md transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14 ${
                        lightsOn
                          ? "border border-[#eee] bg-white"
                          : "border border-white/10 bg-card"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-nextray-green md:h-6 md:w-6" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-2.5 pb-4 pt-7 text-center md:px-5 md:pb-7 md:pt-11">
                    <span className="mx-auto mb-2 block h-0.5 w-6 bg-nextray-green md:mb-4 md:w-8" />
                    <h3
                      className={`mb-1.5 min-h-[2.5rem] font-heading text-[10px] font-bold uppercase leading-snug tracking-wide transition-colors group-hover:text-nextray-green md:mb-3 md:min-h-[2.75rem] md:text-sm ${
                        lightsOn ? "text-[#1a1a1a]" : "text-white"
                      }`}
                    >
                      {area.title}
                    </h3>
                    <p
                      className={`flex-1 text-[10px] leading-relaxed md:text-sm ${
                        lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                      }`}
                    >
                      {area.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <Link
          href="/contact"
          className={`group mt-12 flex items-center justify-between gap-4 rounded-full border px-6 py-4 shadow-sm transition-all duration-300 hover:border-nextray-green/40 md:mt-14 md:px-10 md:py-5 ${
            lightsOn
              ? "border-[#e0e0e0] bg-white shadow-black/5"
              : "border-white/10 bg-card"
          }`}
        >
          <Cog
            size={22}
            className="shrink-0 text-nextray-green transition-transform group-hover:rotate-45"
          />
          <p
            className={`text-center text-sm md:text-base ${
              lightsOn ? "text-[#1a1a1a]" : "text-white/90"
            }`}
          >
            {areasWeServeCta.prefix}{" "}
            <span className="font-semibold text-nextray-green">
              {areasWeServeCta.highlight}
            </span>
          </p>
          <ArrowRight
            size={20}
            className="shrink-0 text-nextray-green transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

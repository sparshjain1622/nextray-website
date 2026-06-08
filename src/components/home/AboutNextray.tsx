"use client";

import Image from "next/image";
import Link from "next/link";
import {
  aboutContent,
  aboutFeatures,
  aboutHighlights,
} from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import AnimateIn from "./AnimateIn";
import RotatingWords from "./RotatingWords";
import {
  ArrowRight,
  Cog,
  Layers,
  Leaf,
  Lightbulb,
  Package,
  Zap,
} from "lucide-react";

const featureIcons = {
  zap: Zap,
  package: Package,
  cog: Cog,
  layers: Layers,
};

export default function AboutNextray() {
  const { lightsOn } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-14 md:py-24 ${
        lightsOn ? "bg-[#f4f5f7]" : "bg-section-primary"
      }`}
    >
      {/* Dot patterns */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-64 w-80 opacity-30"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-80 opacity-30"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — branded visual */}
          <AnimateIn direction="left">
            <div className="relative pb-6 pl-3 md:pb-12 md:pl-10">
              {/* Green tagline card */}
              <div className="absolute bottom-0 left-0 z-20 w-36 rounded-xl rounded-bl-2xl bg-[#4a6600] p-3 shadow-lg md:w-60 md:rounded-2xl md:rounded-bl-[2rem] md:p-6">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 md:mb-3 md:h-9 md:w-9">
                  <Leaf className="h-3.5 w-3.5 text-white md:h-4 md:w-4" />
                </div>
                <p className="text-[11px] font-medium leading-snug text-white md:text-sm">
                  {aboutContent.tagline}
                </p>
                <span className="mt-3 inline-block h-px w-10 bg-white/40" />
              </div>

              {/* Main branded panel */}
              <div
                className={`relative z-10 ml-3 flex min-h-[300px] flex-col justify-between overflow-hidden rounded-xl border p-4 shadow-xl md:ml-10 md:min-h-[460px] md:rounded-2xl md:p-10 ${
                  lightsOn
                    ? "border-[#e8eaed] bg-white"
                    : "border-white/10 bg-card"
                }`}
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-nextray-green/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-nextray-green/10 blur-2xl" />

                {/* Top — icon accent */}
                <div className="relative flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nextray-green/12 text-nextray-green md:h-12 md:w-12 md:rounded-xl">
                    <Lightbulb className="h-4 w-4 md:h-6 md:w-6" />
                  </div>
                  <div className="hidden grid-cols-4 gap-1 opacity-40 md:grid">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 w-1 rounded-full ${
                          lightsOn ? "bg-[#d0d0d0]" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Center — logo */}
                <div className="relative flex flex-col items-center py-3 text-center md:py-6">
                  <Image
                    src="/images/nextray-logo.png"
                    alt="Nextray Technologies"
                    width={220}
                    height={70}
                    className="mb-3 h-10 w-auto object-contain md:mb-6 md:h-16"
                  />
                  <p
                    className={`max-w-xs text-[11px] leading-relaxed md:text-sm ${
                      lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                    }`}
                  >
                    {aboutContent.taglineShort}
                  </p>
                </div>

                {/* Bottom — highlight stats */}
                <div className="relative grid grid-cols-3 gap-1.5 md:gap-3">
                  {aboutHighlights.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-lg border px-1.5 py-2 text-center md:rounded-xl md:px-3 md:py-4 ${
                        lightsOn
                          ? "border-[#e8eaed] bg-[#f8f9fa]"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <p className="font-heading text-sm font-bold text-nextray-green md:text-xl">
                        {item.value}
                      </p>
                      <p
                        className={`mt-0.5 text-[8px] font-medium uppercase leading-tight tracking-wide md:mt-1 md:text-xs ${
                          lightsOn ? "text-[#6b6b6b]" : "text-white/50"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Accent line */}
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nextray-green to-transparent" />
              </div>
            </div>
          </AnimateIn>

          {/* Right — content */}
          <AnimateIn direction="right" delay={0.15}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-nextray-green" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-nextray-green">
                  {aboutContent.title}
                </span>
              </div>

              <h2
                className={`mb-6 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-[2.65rem] ${
                  lightsOn ? "text-[#1a1a1a]" : "text-white"
                }`}
              >
                Powering{" "}
                <RotatingWords
                  words={[
                    "Industries",
                    "Commercial Spaces",
                    "Global Brands",
                    "Smart Cities",
                  ]}
                  className="text-3xl md:text-4xl lg:text-[2.65rem]"
                />
              </h2>

              <p
                className={`mb-6 text-sm leading-relaxed md:mb-10 md:text-base ${
                  lightsOn ? "text-[#6b6b6b]" : "text-white/60"
                }`}
              >
                {aboutContent.description}
              </p>

              {/* Features row */}
              <div
                className={`mb-6 grid grid-cols-2 gap-3 border-y py-5 md:mb-10 md:grid-cols-4 md:gap-0 md:py-8 ${
                  lightsOn ? "border-[#e8eaed]" : "border-white/10"
                }`}
              >
                {aboutFeatures.map((feature, index) => {
                  const Icon = featureIcons[feature.icon];
                  return (
                    <div
                      key={feature.title}
                      className={`flex flex-col ${
                        index > 0
                          ? `md:border-l md:pl-5 ${
                              lightsOn
                                ? "md:border-[#e8eaed]"
                                : "md:border-white/10"
                            }`
                          : ""
                      } ${index > 0 ? "md:ml-5" : ""}`}
                    >
                      <div
                        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg border md:mb-3 md:h-10 md:w-10 ${
                          lightsOn
                            ? "border-[#e8eaed] bg-nextray-green/10"
                            : "border-white/10 bg-nextray-green/10"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 text-nextray-green md:h-[18px] md:w-[18px]" />
                      </div>
                      <h3
                        className={`mb-1 text-xs font-bold md:mb-1.5 md:text-sm ${
                          lightsOn ? "text-[#1a1a1a]" : "text-white"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          lightsOn ? "text-[#6b6b6b]" : "text-white/50"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                href={aboutContent.href}
                className="group inline-flex items-center gap-2 rounded-lg bg-nextray-green px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-md transition-all duration-300 hover:bg-nextray-green-bright hover:shadow-lg"
              >
                Read More
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

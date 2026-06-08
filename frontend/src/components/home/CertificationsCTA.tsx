"use client";

import Link from "next/link";
import { ctaContent, ctaFeatures } from "@/lib/home-data";
import { useHomepage } from "@/context/HomepageContext";
import { useTheme } from "@/context/ThemeContext";
import SafeImage from "./SafeImage";
import ProductLightImage from "./ProductLightImage";
import RotatingWords from "./RotatingWords";
import AnimateIn from "./AnimateIn";
import {
  ArrowRight,
  Headphones,
  IndianRupee,
  Lightbulb,
  Phone,
  ShieldCheck,
} from "lucide-react";

const ctaIcons = {
  headset: Headphones,
  shield: ShieldCheck,
  rupee: IndianRupee,
};

export default function CertificationsCTA() {
  const { lightsOn } = useTheme();
  const { certifications } = useHomepage();

  return (
    <section
      className={`py-14 md:py-24 ${
        lightsOn ? "bg-[#f4f5f7]" : "bg-section-secondary"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Certifications header */}
        <div className="mb-8 text-center md:mb-12">
          <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-nextray-green/12 text-nextray-green md:mb-4 md:h-11 md:w-11">
            <ShieldCheck className="h-4 w-4 md:h-[22px] md:w-[22px]" />
          </div>

          <h2
            className={`mb-4 font-heading text-3xl font-bold uppercase tracking-wide md:text-4xl ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Certifications &{" "}
            <span className="text-nextray-green">Trust</span>
          </h2>

          <p
            className={`mb-4 text-base ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            Committed to{" "}
            <RotatingWords
              words={["Safety", "Quality", "Compliance", "Excellence"]}
            />
          </p>

          <span className="mx-auto block h-0.5 w-10 bg-nextray-green" />
        </div>

        {/* Certification cards */}
        <AnimateIn>
          <div className="mb-10 grid gap-3 md:mb-16 md:grid-cols-3 md:gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className={`relative flex items-center gap-2.5 overflow-hidden rounded-lg p-3 shadow-md transition-shadow duration-300 hover:shadow-lg md:gap-4 md:rounded-xl md:p-5 ${
                  lightsOn
                    ? "bg-white shadow-black/8"
                    : "bg-card shadow-black/20"
                }`}
              >
                <div
                  className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full border md:h-16 md:w-16 ${
                    lightsOn ? "border-[#e8eaed] bg-[#f8f9fa]" : "border-white/10 bg-white/5"
                  }`}
                >
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>

                <div
                  className={`hidden h-12 w-px shrink-0 md:block ${
                    lightsOn ? "bg-[#e8eaed]" : "bg-white/10"
                  }`}
                />

                <div className="min-w-0 flex-1 pb-2 md:pb-3">
                  <h3
                    className={`mb-0.5 text-[10px] font-bold uppercase tracking-wide md:mb-1 md:text-xs ${
                      lightsOn ? "text-[#1a1a1a]" : "text-white"
                    }`}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className={`text-[10px] leading-snug md:text-xs md:leading-relaxed ${
                      lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                    }`}
                  >
                    {cert.description}
                  </p>
                </div>

                <span className="absolute bottom-2 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-nextray-green md:bottom-3 md:w-8" />
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* CTA banner */}
        <AnimateIn delay={0.15}>
          <div
            className={`relative overflow-hidden rounded-2xl border shadow-md ${
              lightsOn
                ? "border-[#e8eaed] bg-gradient-to-br from-white via-[#f8faf5] to-[#f0f4eb]"
                : "border-white/10 bg-card"
            }`}
          >
            {/* Dot pattern — right */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-30"
              style={{
                backgroundImage: lightsOn
                  ? "radial-gradient(circle, rgba(122,184,0,0.12) 1px, transparent 1px)"
                  : "radial-gradient(circle, rgba(122,184,0,0.15) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative grid items-center gap-4 p-4 md:grid-cols-12 md:gap-8 md:p-8 lg:p-10">
              {/* Product visual — left */}
              <div className="relative mx-auto md:col-span-3 md:mx-0">
                <div className="absolute -left-4 bottom-0 h-32 w-32 rounded-full bg-nextray-green/15 blur-2xl" />
                <div className="relative aspect-square h-28 w-28 max-w-[200px] md:h-48 md:w-48">
                  <ProductLightImage
                    imageUnlit="/images/products/50_watt_street_light.jpg"
                    imageLit="/images/products/lit/50_watt_street_light.png"
                    alt="Nextray LED lighting"
                    fill
                    catalog
                    className="object-contain p-2"
                    sizes="200px"
                  />
                </div>
              </div>

              {/* Center content */}
              <div className="md:col-span-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-nextray-green/12 text-nextray-green md:mb-4 md:h-10 md:w-10">
                  <Lightbulb className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3
                  className={`mb-2 font-heading text-base font-bold md:mb-3 md:text-2xl ${
                    lightsOn ? "text-[#1a1a1a]" : "text-white"
                  }`}
                >
                  Ready to Illuminate{" "}
                  <span className="text-nextray-green">Your Project?</span>
                </h3>
                <p
                  className={`text-xs leading-relaxed md:text-base ${
                    lightsOn ? "text-[#6b6b6b]" : "text-white/60"
                  }`}
                >
                  {ctaContent.description}
                </p>
              </div>

              {/* Right — actions */}
              <div
                className={`md:col-span-4 md:border-l md:pl-8 ${
                  lightsOn ? "border-[#e8eaed]" : "border-white/10"
                }`}
              >
                <div className="mb-4 flex flex-col gap-2.5 md:mb-6 md:gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-nextray-green px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-nextray-green-bright md:px-6 md:py-3.5 md:text-sm"
                  >
                    Contact Us
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <a
                    href="tel:7096015151"
                    className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2.5 text-xs font-bold tracking-widest transition-all hover:border-nextray-green hover:text-nextray-green md:px-6 md:py-3.5 md:text-sm ${
                      lightsOn
                        ? "border-nextray-green/40 bg-white text-[#1a1a1a]"
                        : "border-nextray-green/40 bg-transparent text-white"
                    }`}
                  >
                    <Phone size={16} className="text-nextray-green" />
                    7096015151
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-4">
                  {ctaFeatures.map((feature) => {
                    const Icon = ctaIcons[feature.icon];
                    return (
                      <div
                        key={feature.label}
                        className="flex flex-col items-center gap-1 text-center md:flex-row md:gap-2 md:text-left"
                      >
                        <Icon className="h-3.5 w-3.5 text-nextray-green md:h-4 md:w-4" />
                        <span
                          className={`text-[9px] font-medium leading-tight md:text-xs ${
                            lightsOn ? "text-[#4a4a4a]" : "text-white/70"
                          }`}
                        >
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

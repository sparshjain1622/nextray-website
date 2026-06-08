"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHomepage } from "@/context/HomepageContext";
import { useTheme } from "@/context/ThemeContext";
import ProductLightImage from "./ProductLightImage";
import RotatingWords from "./RotatingWords";
import { StaggerContainer, StaggerItem } from "./AnimateIn";
import { ArrowRight, LayoutGrid, Zap } from "lucide-react";

export default function BrandsWeDeal() {
  const { lightsOn } = useTheme();
  const { brandProducts } = useHomepage();

  return (
    <section
      className={`relative overflow-hidden py-14 md:py-24 ${
        lightsOn ? "bg-white" : "bg-section-secondary"
      }`}
    >
      {/* Subtle corner patterns */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-48 w-64 opacity-25"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(122,184,0,0.12) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.15) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-56 rounded-full bg-nextray-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-nextray-green" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
              Brands We Deal
            </span>
            <span className="h-px w-10 bg-nextray-green" />
          </div>

          <h2
            className={`mb-5 font-heading text-3xl font-bold md:text-4xl lg:text-[2.5rem] ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Quality Brands.{" "}
            <span className="text-nextray-green">Reliable Solutions.</span>
          </h2>

          <p
            className={`text-base ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            Featuring{" "}
            <RotatingWords
              words={[
                "Street Lights",
                "High Bay Lights",
                "Flood Lights",
                "OEM Solutions",
                "Smart Lighting",
              ]}
              className="text-base"
            />
          </p>
        </div>

        {/* Logo with decorative lines */}
        <div className="mb-12 flex items-center justify-center gap-4 md:gap-6">
          <div className="hidden max-w-[140px] flex-1 items-center gap-2 sm:flex">
            <div className="h-px flex-1 bg-nextray-green/60" />
            <span className="h-2 w-2 shrink-0 rounded-full bg-nextray-green" />
          </div>

          <div
            className={`rounded-xl border px-8 py-5 shadow-md md:px-12 md:py-6 ${
              lightsOn
                ? "border-nextray-green/25 bg-white shadow-nextray-green/10"
                : "border-nextray-green/30 bg-card shadow-nextray-green/5"
            }`}
          >
            <Image
              src="/images/nextray-logo.png"
              alt="Nextray Technologies"
              width={200}
              height={60}
              className="h-10 w-auto object-contain md:h-12"
            />
          </div>

          <div className="hidden max-w-[140px] flex-1 items-center gap-2 sm:flex">
            <span className="h-2 w-2 shrink-0 rounded-full bg-nextray-green" />
            <div className="h-px flex-1 bg-nextray-green/60" />
          </div>
        </div>

        {/* Product grid */}
        <motion.div
          key={lightsOn ? "brands-lit-on" : "brands-lit-off"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <StaggerContainer className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {brandProducts.map((product) => (
              <StaggerItem key={product.title}>
                <article
                  className={`group flex h-full flex-col rounded-lg shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg md:rounded-xl ${
                    lightsOn
                      ? "bg-white shadow-black/8"
                      : "bg-card shadow-black/20"
                  }`}
                >
                  <div
                    className={`relative aspect-square overflow-hidden rounded-t-xl ${
                      lightsOn ? "bg-white" : "bg-black"
                    }`}
                  >
                    <ProductLightImage
                      imageUnlit={product.imageUnlit}
                      imageLit={product.imageLit}
                      alt={product.title}
                      fill
                      catalog
                      className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
                        lightsOn ? "scale-[1.2]" : "scale-[1.35]"
                      }`}
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <div className="absolute bottom-2 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-nextray-green shadow-md md:bottom-3 md:left-3 md:h-9 md:w-9">
                      <Zap
                        className="h-3 w-3 text-white md:h-3.5 md:w-3.5"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-2 pb-2.5 pt-2 md:px-4 md:pb-4 md:pt-4">

                    <h3
                      className={`mb-1 text-center text-[10px] font-bold leading-snug md:mb-2 md:text-sm ${
                        lightsOn ? "text-[#1a1a1a]" : "text-white"
                      }`}
                    >
                      {product.title}
                    </h3>

                    <p
                      className={`mb-2 line-clamp-2 flex-1 text-left text-[9px] leading-relaxed md:mb-4 md:line-clamp-none md:text-xs ${
                        lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                      }`}
                    >
                      {product.description}
                    </p>

                    <Link
                      href={product.href ?? "/products/outdoor"}
                      className="flex w-full items-center justify-center gap-1 rounded-lg bg-nextray-green/10 py-2 text-[9px] font-bold uppercase tracking-wide text-nextray-green transition-colors hover:bg-nextray-green/20 md:gap-1.5 md:py-2.5 md:text-xs"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>

        {/* View all CTA */}
        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href="/products/outdoor"
            className={`group inline-flex items-center gap-3 rounded-full border-2 px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-nextray-green/5 ${
              lightsOn
                ? "border-nextray-green text-nextray-green"
                : "border-nextray-green text-nextray-green"
            }`}
          >
            <LayoutGrid size={18} />
            View All Products
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

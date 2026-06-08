"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  brandProducts,
  heroFeatures,
  heroProductTabLabel,
} from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import ProductLightImage from "./ProductLightImage";
import {
  ArrowRight,
  Award,
  ArrowLeft,
  Clock,
  FileText,
  Leaf,
  Shield,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

const featureIcons = {
  leaf: Leaf,
  wrench: Wrench,
  shield: Shield,
  clock: Clock,
  award: Award,
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const { lightsOn } = useTheme();
  const product = brandProducts[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % brandProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + brandProducts.length) % brandProducts.length);
  const next = () =>
    setCurrent((c) => (c + 1) % brandProducts.length);

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-600 ${
        lightsOn ? "bg-[#f4f5f7]" : "bg-black"
      }`}
    >
      {/* Dot grid pattern — top-left */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-72 w-96 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(122,184,0,0.15) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 lg:px-6 lg:pb-10 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-nextray-green/25 bg-nextray-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-nextray-green">
                <Zap size={12} />
                {lightsOn ? "Lights On" : "Lights Off"}
              </span>

              <h1
                className={`mb-5 font-heading text-3xl font-bold leading-[1.2] md:text-4xl lg:text-[2.65rem] ${
                  lightsOn ? "text-[#1a1a1a]" : "text-white"
                }`}
              >
                Up to{" "}
                <span className="text-nextray-green">70%</span> Power Saving,
                Maintenance free,{" "}
                <span className="text-nextray-green">Reliable</span> Products
              </h1>

              <p
                className={`mb-8 max-w-lg text-base leading-relaxed ${
                  lightsOn ? "text-[#4a4a4a]" : "text-white/70"
                }`}
              >
                Nextray Technologies — solid state lighting solutions from 6W to
                300W. Street lights, flood lights, high bays & more.
              </p>

              {/* Now showing */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.35 }}
                  className={`mb-8 flex items-stretch gap-3 border-l-2 pl-4 ${
                    lightsOn ? "border-nextray-green" : "border-nextray-green"
                  }`}
                >
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        lightsOn ? "text-[#888]" : "text-white/45"
                      }`}
                    >
                      Now Showing
                    </p>
                    <p className="font-heading text-xl font-bold text-nextray-green md:text-2xl">
                      {product.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CTAs */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Link
                  href="/products/outdoor"
                  className="group inline-flex items-center gap-2 rounded-md bg-nextray-green px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-nextray-green-bright"
                >
                  View Products
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 rounded-md border-2 px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all hover:bg-nextray-green/5 ${
                    lightsOn
                      ? "border-nextray-green bg-white text-[#1a1a1a]"
                      : "border-nextray-green bg-transparent text-white"
                  }`}
                >
                  Get a Quote
                  <FileText size={16} className="text-nextray-green" />
                </Link>
              </div>

              {/* Product tabs */}
              <div className="flex flex-wrap gap-2">
                {brandProducts.map((p, index) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setCurrent(index)}
                    className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
                      index === current
                        ? "bg-nextray-green text-black shadow-sm"
                        : lightsOn
                          ? "border border-[#d8dce3] bg-white text-[#4a4a4a] hover:border-nextray-green/50"
                          : "border border-white/15 bg-white/5 text-white/60 hover:border-nextray-green/40 hover:text-white"
                    }`}
                  >
                    {heroProductTabLabel(p.title)}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — product showcase */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative overflow-hidden rounded-2xl border transition-colors duration-600 ${
                lightsOn
                  ? "border-[#e8eaed] bg-white shadow-lg shadow-black/5"
                  : "border-white/10 bg-[#1a1a1a] shadow-xl shadow-black/30"
              }`}
            >
              <div
                className={`relative aspect-square w-full ${
                  lightsOn ? "bg-white" : "bg-[#1a1a1a]"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${current}-${lightsOn ? "on" : "off"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <ProductLightImage
                      imageUnlit={product.imageUnlit}
                      imageLit={product.imageLit}
                      alt={product.title}
                      fill
                      catalog
                      priority
                      className={
                        lightsOn
                          ? "object-contain p-2 md:p-4"
                          : "object-cover object-center"
                      }
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Trust badge — top right */}
                <div
                  className={`absolute right-4 top-4 z-10 flex items-start gap-2.5 rounded-lg px-3 py-2.5 backdrop-blur-sm ${
                    lightsOn
                      ? "border border-[#e8eaed] bg-white/95 shadow-sm"
                      : "bg-black/50"
                  }`}
                >
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-nextray-green"
                  />
                  <div>
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        lightsOn ? "text-[#1a1a1a]" : "text-white"
                      }`}
                    >
                      Built to Last
                    </p>
                    <p
                      className={`text-[10px] ${
                        lightsOn ? "text-[#6b6b6b]" : "text-white/60"
                      }`}
                    >
                      Performance You Can Trust
                    </p>
                    <span className="mt-1 inline-block h-0.5 w-8 bg-nextray-green" />
                  </div>
                </div>

                {/* Nav arrows */}
                <button
                  type="button"
                  onClick={prev}
                  className={`absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition-all hover:bg-nextray-green hover:text-black md:left-4 ${
                    lightsOn
                      ? "border border-[#e8eaed] bg-white/95 text-[#4a4a4a]"
                      : "bg-[#2a2a2a]/90 text-white/80"
                  }`}
                  aria-label="Previous product"
                >
                  <ArrowLeft size={18} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={`absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition-all hover:bg-nextray-green hover:text-black md:right-4 ${
                    lightsOn
                      ? "border border-[#e8eaed] bg-white/95 text-[#4a4a4a]"
                      : "bg-[#2a2a2a]/90 text-white/80"
                  }`}
                  aria-label="Next product"
                >
                  <ArrowRight size={18} strokeWidth={2.5} />
                </button>

                {/* Slide indicators */}
                <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                  {brandProducts.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrent(index)}
                      className={`h-1 rounded-full transition-all duration-400 ${
                        index === current
                          ? "w-7 bg-nextray-green"
                          : lightsOn
                            ? "w-4 bg-black/15 hover:bg-black/30"
                            : "w-4 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Product ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`mt-8 rounded-xl border px-3 py-3 shadow-sm md:mt-12 md:px-8 md:py-6 ${
            lightsOn
              ? "border-[#e8eaed] bg-white shadow-black/5"
              : "border-white/10 bg-[#1a1a1a]"
          }`}
        >
          <div className="grid grid-cols-2 gap-2.5 md:flex md:flex-row md:items-center md:justify-between md:gap-0">
            {heroFeatures.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              return (
                <div key={feature.label} className="flex items-center gap-2 md:flex-1 md:gap-3">
                  {index > 0 && (
                    <div
                      className={`mr-6 hidden h-10 w-px shrink-0 md:block ${
                        lightsOn ? "bg-[#e8eaed]" : "bg-white/10"
                      }`}
                    />
                  )}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nextray-green/15 text-nextray-green md:h-10 md:w-10">
                    <Icon className="h-3.5 w-3.5 md:h-[18px] md:w-[18px]" />
                  </div>
                  <p
                    className={`text-[10px] font-semibold leading-snug md:text-sm ${
                      lightsOn ? "text-[#1a1a1a]" : "text-white/90"
                    }`}
                  >
                    {feature.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

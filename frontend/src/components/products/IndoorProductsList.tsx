"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { indoorDownlights, productDetails } from "@/lib/products-data";
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";

function getLumens(slug: string): string {
  const product = productDetails[slug];
  if (!product) return "";
  const electrical = product.tables.find(
    (t) => t.title === "Electrical Parameters"
  );
  return (
    electrical?.rows.find((r) => r.label === "Lumens Output")?.value ?? ""
  );
}

function getModel(slug: string): string {
  const product = productDetails[slug];
  if (!product) return "";
  if (product.modelNumbers) {
    return `${product.modelNumbers.round} / ${product.modelNumbers.square}`;
  }
  return product.modelSquare ?? product.modelNumber ?? "";
}

export default function IndoorProductsList() {
  const { lightsOn } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const cards = useMemo(
    () =>
      indoorDownlights.map((item) => {
        const slug = item.href.replace("/products/indoor/", "");
        const product = productDetails[slug];
        return {
          label: item.label,
          href: item.href,
          title: product?.title ?? item.label,
          imageUnlit:
            product?.imageUnlit ?? "/images/products/6_watt_down_light.jpg",
          imageLit: product?.imageLit ?? "/images/products/lit/6_watt.jpg",
          lumens: getLumens(slug),
          model: getModel(slug),
        };
      }),
    []
  );

  const active = cards[activeIndex];
  const activeImage = lightsOn ? active.imageUnlit : active.imageLit;

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % cards.length);
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + cards.length) % cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, 4500);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  const panelClass = lightsOn
    ? "border-[#e8eaed] bg-white shadow-sm"
    : "border-white/10 bg-card";

  return (
    <div className="space-y-8">
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-1.5 text-sm ${
          lightsOn ? "text-[#6b6b6b]" : "text-white/60"
        }`}
      >
        <Link href="/" className="hover:text-nextray-green">
          Home
        </Link>
        <ChevronRight size={14} className="opacity-50" />
        <Link href="/products/indoor" className="hover:text-nextray-green">
          Indoor Lighting
        </Link>
        <ChevronRight size={14} className="opacity-50" />
        <span className="font-medium text-nextray-green">Down Light</span>
      </nav>

      <div className={`rounded-xl border p-6 md:p-8 ${panelClass}`}>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-nextray-green">
          Whites
        </p>
        <h1
          className={`mb-3 font-heading text-2xl font-bold md:text-3xl ${
            lightsOn ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          Down Light Range
        </h1>
        <p
          className={`mb-6 max-w-2xl text-sm leading-relaxed ${
            lightsOn ? "text-[#6b6b6b]" : "text-white/65"
          }`}
        >
          Precision-engineered indoor down lights for residential, commercial
          and institutional spaces. Select a product to view full specifications.
        </p>

        {/* Featured hero */}
        <div
          className={`relative mb-6 overflow-hidden rounded-xl border ${
            lightsOn
              ? "border-[#e8eaed] bg-gradient-to-br from-[#f4f6f8] via-white to-[#eef4e6]"
              : "border-white/10 bg-gradient-to-br from-section-secondary to-card"
          }`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid min-h-[300px] items-center gap-6 p-6 md:min-h-[340px] md:grid-cols-2 md:p-8">
            {/* Product image */}
            <div className="relative mx-auto w-full max-w-[280px]">
              <div
                className={`absolute inset-0 m-auto h-[90%] w-[90%] rounded-full ${
                  lightsOn ? "bg-[#e0e4ea]/80" : "bg-white/5"
                }`}
              />
              <div className="relative aspect-square w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={active.title}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 70vw, 280px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Product info — fixed min-heights prevent layout jump between slides */}
            <div className="text-center md:text-left">
              <span className="mb-2 inline-block rounded-full bg-nextray-green/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-nextray-green">
                Whites Down Light
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2
                    className={`mb-2 min-h-[3.5rem] font-heading text-xl font-bold md:min-h-[4rem] md:text-2xl ${
                      lightsOn ? "text-[#1a1a1a]" : "text-white"
                    }`}
                  >
                    {active.title}
                  </h2>
                  <p
                    className={`mb-1 min-h-[1.25rem] text-sm ${
                      lightsOn ? "text-[#6b6b6b]" : "text-white/60"
                    }`}
                  >
                    {active.model ? (
                      <>
                        Model:{" "}
                        <span className="font-semibold text-nextray-green">
                          {active.model}
                        </span>
                      </>
                    ) : (
                      "\u00A0"
                    )}
                  </p>
                  <p
                    className={`mb-5 min-h-[1.25rem] text-sm ${
                      lightsOn ? "text-[#6b6b6b]" : "text-white/60"
                    }`}
                  >
                    {active.lumens ? (
                      <>
                        Output:{" "}
                        <span className="font-semibold">{active.lumens}</span>
                      </>
                    ) : (
                      "\u00A0"
                    )}
                  </p>
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-nextray-green px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-nextray-green-bright"
                  >
                    View Specifications
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div
            className={`flex items-center justify-between border-t px-4 py-3 md:px-6 ${
              lightsOn ? "border-[#e8eaed] bg-white/60" : "border-white/10 bg-black/20"
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  lightsOn
                    ? "bg-white text-[#1a1a1a] shadow-sm hover:bg-nextray-green hover:text-white"
                    : "bg-card text-white hover:bg-nextray-green"
                }`}
                aria-label="Previous product"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  lightsOn
                    ? "bg-white text-[#1a1a1a] shadow-sm hover:bg-nextray-green hover:text-white"
                    : "bg-card text-white hover:bg-nextray-green"
                }`}
                aria-label="Next product"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 bg-nextray-green"
                      : `w-2 ${lightsOn ? "bg-[#d0d4da]" : "bg-white/25"}`
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <span
              className={`text-xs font-medium tabular-nums ${
                lightsOn ? "text-[#6b6b6b]" : "text-white/50"
              }`}
            >
              {activeIndex + 1} / {cards.length}
            </span>
          </div>
        </div>

        {/* Product cards grid */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {cards.map((card, index) => {
            const isActive = activeIndex === index;
            const thumb = lightsOn ? card.imageUnlit : card.imageLit;

            return (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className={`group flex h-full overflow-hidden rounded-xl border ring-1 transition-colors ${
                    isActive
                      ? "border-nextray-green ring-nextray-green/30"
                      : lightsOn
                        ? "border-[#e8eaed] bg-[#f8f9fa] ring-transparent hover:border-nextray-green/60 hover:bg-nextray-green/5"
                        : "border-white/10 bg-white/5 ring-transparent hover:border-nextray-green/50 hover:bg-nextray-green/10"
                  }`}
                >
                  <div
                    className={`relative aspect-square w-20 shrink-0 sm:w-24 ${
                      lightsOn ? "bg-white" : "bg-black"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={card.label}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                    <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-nextray-green">
                      <Zap size={10} className="text-white" fill="currentColor" />
                    </div>
                  </div>

                  <div className="flex flex-1 items-center justify-between gap-2 px-3 py-3">
                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm font-bold transition-colors group-hover:text-nextray-green ${
                          isActive
                            ? "text-nextray-green"
                            : lightsOn
                              ? "text-[#1a1a1a]"
                              : "text-white"
                        }`}
                      >
                        {card.label}
                      </p>
                      {card.lumens && (
                        <p
                          className={`truncate text-xs ${
                            lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                          }`}
                        >
                          {card.lumens}
                        </p>
                      )}
                    </div>
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-nextray-green transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

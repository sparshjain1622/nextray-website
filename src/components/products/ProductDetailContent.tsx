"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ProductLightImage from "@/components/home/ProductLightImage";
import ProductSpecTable from "./ProductSpecTable";
import type { ProductDetail } from "@/lib/products-data";
import { ArrowRight, Check, Phone } from "lucide-react";

interface ProductDetailContentProps {
  product: ProductDetail;
}

export default function ProductDetailContent({
  product,
}: ProductDetailContentProps) {
  const { lightsOn } = useTheme();

  const cardClass = `rounded-xl border p-5 md:p-8 ${
    lightsOn
      ? "border-[#e8eaed] bg-white shadow-sm"
      : "border-white/10 bg-card"
  }`;

  return (
    <div className="space-y-8">
      {/* Hero — image + model numbers */}
      <div className={`grid gap-8 lg:grid-cols-2 ${cardClass}`}>
        <div
          className={`relative aspect-square overflow-hidden rounded-lg ${
            lightsOn ? "bg-[#f4f5f7]" : "bg-black"
          }`}
        >
          <ProductLightImage
            imageUnlit={product.imageUnlit}
            imageLit={product.imageLit}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-flex w-fit rounded-full bg-nextray-green/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-nextray-green">
            {product.brand}
          </span>
          <h2
            className={`mb-6 font-heading text-2xl font-bold md:text-3xl ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            {product.title}
          </h2>

          <div
            className={`overflow-hidden rounded-lg border ${
              lightsOn ? "border-[#e8eaed]" : "border-white/10"
            }`}
          >
            <div className="bg-nextray-green px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white">
              Model No.
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 text-sm">
                <span
                  className={
                    lightsOn ? "text-[#1a1a1a]" : "text-white/90"
                  }
                >
                  Round
                </span>
                <span className="text-nextray-green">:</span>
                <span className="font-semibold text-nextray-green">
                  {product.modelNumbers.round}
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 text-sm">
                <span
                  className={
                    lightsOn ? "text-[#1a1a1a]" : "text-white/90"
                  }
                >
                  Square
                </span>
                <span className="text-nextray-green">:</span>
                <span className="font-semibold text-nextray-green">
                  {product.modelNumbers.square}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-nextray-green px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-nextray-green-bright"
            >
              Enquire Now
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:7096015151"
              className={`inline-flex items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-bold transition-colors hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-nextray-green/40 text-[#1a1a1a]"
                  : "border-nextray-green/40 text-white"
              }`}
            >
              <Phone size={16} className="text-nextray-green" />
              7096015151
            </a>
          </div>
        </div>
      </div>

      {/* Spec tables */}
      <div className="grid gap-5 md:grid-cols-2">
        {product.tables.map((table) => (
          <ProductSpecTable key={table.title} table={table} />
        ))}
      </div>

      {/* Applications & features */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className={cardClass}>
          <h3 className="mb-4 font-heading text-lg font-bold text-nextray-green">
            Application
          </h3>
          <ul className="space-y-2">
            {product.applications.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-2 text-sm ${
                  lightsOn ? "text-[#4a4a4a]" : "text-white/70"
                }`}
              >
                <Check size={15} className="shrink-0 text-nextray-green" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <h3 className="mb-4 font-heading text-lg font-bold text-nextray-green">
            Silent Features
          </h3>
          <ul className="space-y-2">
            {product.features.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-2 text-sm ${
                  lightsOn ? "text-[#4a4a4a]" : "text-white/70"
                }`}
              >
                <Check size={15} className="shrink-0 text-nextray-green" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

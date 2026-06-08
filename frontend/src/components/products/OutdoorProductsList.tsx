"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import {
  outdoorFloodLights,
  outdoorStreetLights,
  productDetails,
} from "@/lib/products-data";
import { ArrowRight } from "lucide-react";

function ProductGroup({
  brand,
  title,
  description,
  items,
  imageUnlit,
  imageLit,
}: {
  brand: string;
  title: string;
  description: string;
  items: readonly { label: string; href: string }[];
  imageUnlit: string;
  imageLit: string;
}) {
  const { lightsOn } = useTheme();

  return (
    <div
      className={`rounded-xl border p-6 md:p-8 ${
        lightsOn
          ? "border-[#e8eaed] bg-white shadow-sm"
          : "border-white/10 bg-card"
      }`}
    >
      <div className="mb-8 grid gap-6 md:grid-cols-[1fr_200px] md:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-nextray-green">
            {brand}
          </p>
          <h2
            className={`mb-3 font-heading text-2xl font-bold ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-sm leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/65"
            }`}
          >
            {description}
          </p>
        </div>
        <div
          className={`relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-xl ${
            lightsOn ? "bg-[#f4f5f7]" : "bg-black"
          }`}
        >
          <Image
            src={imageUnlit}
            alt={title}
            fill
            className="object-contain p-4"
            sizes="200px"
          />
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const slug = item.href.split("/").pop() ?? "";
          const available = slug in productDetails;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group flex h-full items-center justify-between rounded-lg border px-4 py-3.5 text-sm font-medium transition-all ${
                  lightsOn
                    ? "border-[#e8eaed] bg-[#f8f9fa] text-[#1a1a1a] hover:border-nextray-green/40 hover:bg-nextray-green/5 hover:text-nextray-green"
                    : "border-white/10 bg-white/5 text-white/90 hover:border-nextray-green/40 hover:bg-nextray-green/10 hover:text-nextray-green"
                } ${!available ? "opacity-60" : ""}`}
              >
                <span>
                  {item.label}
                  {!available && (
                    <span className="ml-2 text-[10px] uppercase tracking-wide text-nextray-green/80">
                      Soon
                    </span>
                  )}
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-nextray-green transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function OutdoorProductsList() {
  return (
    <div className="space-y-8">
      <ProductGroup
        brand="Whites"
        title="Street Light Range"
        description="Extrusion-based AC street lights engineered for superior thermal management, structural durability and optical performance — ideal for roads, societies and public spaces."
        items={outdoorStreetLights}
        imageUnlit="/images/products/25_watt_street_light.jpg"
        imageLit="/images/products/lit/25_watt_street_light.png"
      />
      <ProductGroup
        brand="Whites"
        title="Flood Light Range"
        description="High-output flood lights for commercial complexes, industrial yards, signage and outdoor area illumination."
        items={outdoorFloodLights}
        imageUnlit="/images/products/25_watt_flood_light.jpg"
        imageLit="/images/products/lit/flood_25.jpg"
      />
    </div>
  );
}

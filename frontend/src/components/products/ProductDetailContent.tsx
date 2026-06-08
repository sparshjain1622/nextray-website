"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import ProductLightImage from "@/components/home/ProductLightImage";
import ProductSpecTable from "./ProductSpecTable";
import { ProductListCard } from "./ProductSpecCard";
import ProductBottomCTA from "./ProductBottomCTA";
import ProductMatrixContent from "./ProductMatrixContent";
import type { ProductDetail } from "@/lib/products-data";
import { ChevronRight, Lightbulb, Shield, Thermometer, Zap } from "lucide-react";

const highlightIcons = {
  brightness: Lightbulb,
  surge: Shield,
  weather: Shield,
  voltage: Thermometer,
  bis: Shield,
  power: Zap,
} as const;

interface ProductDetailContentProps {
  product: ProductDetail;
}

export default function ProductDetailContent({
  product,
}: ProductDetailContentProps) {
  const { lightsOn } = useTheme();

  if (product.pageType === "matrix" && product.matrix) {
    return (
      <div className="space-y-6">
        <nav
          aria-label="Breadcrumb"
          className={`flex flex-wrap items-center gap-1.5 text-sm ${
            lightsOn ? "text-[#6b6b6b]" : "text-white/60"
          }`}
        >
          <Link href="/" className="hover:text-nextray-green">
            Home
          </Link>
          {product.breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="opacity-50" />
              {crumb.href && i < product.breadcrumbs.length - 1 ? (
                <Link href={crumb.href} className="hover:text-nextray-green">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-nextray-green">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <ProductMatrixContent
          title={product.title}
          matrix={product.matrix}
          imageUnlit={product.imageUnlit}
          imageLit={product.imageLit}
        />
      </div>
    );
  }

  const hasDualModels = Boolean(product.modelNumbers);
  const hasSingleModel = Boolean(product.modelNumber);
  const hasSquareOnly = Boolean(product.modelSquare);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-1.5 text-sm ${
          lightsOn ? "text-[#6b6b6b]" : "text-white/60"
        }`}
      >
        <Link href="/" className="hover:text-nextray-green">
          Home
        </Link>
        {product.breadcrumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="opacity-50" />
            {crumb.href && i < product.breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className="hover:text-nextray-green">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-nextray-green">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        {/* Left — title + specs */}
        <div className="space-y-6">
          <div>
            <h1
              className={`font-heading text-2xl font-bold uppercase tracking-wide md:text-3xl lg:text-4xl ${
                lightsOn ? "text-[#1a1a1a]" : "text-white"
              }`}
            >
              {product.title}
            </h1>

            {(hasSingleModel || hasDualModels || hasSquareOnly) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded bg-nextray-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Model No.
                </span>
                {hasSingleModel && (
                  <span
                    className={`text-sm font-semibold ${
                      lightsOn ? "text-[#4a4a4a]" : "text-white/80"
                    }`}
                  >
                    {product.modelNumber}
                  </span>
                )}
                {hasDualModels && (
                  <span
                    className={`text-sm ${
                      lightsOn ? "text-[#4a4a4a]" : "text-white/80"
                    }`}
                  >
                    Round:{" "}
                    <strong className="text-nextray-green">
                      {product.modelNumbers?.round}
                    </strong>
                    {" · "}
                    Square:{" "}
                    <strong className="text-nextray-green">
                      {product.modelNumbers?.square}
                    </strong>
                  </span>
                )}
                {hasSquareOnly && (
                  <span
                    className={`text-sm ${
                      lightsOn ? "text-[#4a4a4a]" : "text-white/80"
                    }`}
                  >
                    Square:{" "}
                    <strong className="text-nextray-green">
                      {product.modelSquare}
                    </strong>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Spec cards grid */}
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {product.tables.map((table) => (
              <ProductSpecTable key={table.title} table={table} />
            ))}
            <ProductListCard
              title="Application"
              items={product.applications}
              iconKey="application"
            />
            <ProductListCard
              title="Silent Features"
              items={product.features}
              iconKey="features"
            />
          </div>
        </div>

        {/* Right — image + key highlights (sticky on scroll) */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div
            className={`relative aspect-square overflow-hidden rounded-xl ${
              lightsOn ? "bg-[#f0f2f5]" : "bg-black"
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`h-[85%] w-[85%] rounded-full ${
                  lightsOn ? "bg-[#e8eaed]/60" : "bg-white/5"
                }`}
              />
            </div>
            <ProductLightImage
              imageUnlit={product.imageUnlit}
              imageLit={product.imageLit}
              alt={product.title}
              fill
              className="relative z-10 object-contain p-8"
              sizes="300px"
              priority
            />
          </div>

          {product.keyHighlights && product.keyHighlights.length > 0 && (
            <div
              className={`rounded-xl border p-5 ${
                lightsOn
                  ? "border-[#e8eaed] bg-white shadow-sm"
                  : "border-white/10 bg-card"
              }`}
            >
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-nextray-green">
                Key Highlights
              </h3>
              <ul className="space-y-4">
                {product.keyHighlights.map((item) => {
                  const Icon =
                    highlightIcons[item.icon as keyof typeof highlightIcons] ??
                    Lightbulb;
                  return (
                    <li key={item.title} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nextray-green/10">
                        <Icon size={18} className="text-nextray-green" />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            lightsOn ? "text-[#1a1a1a]" : "text-white"
                          }`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`text-xs ${
                            lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ProductBottomCTA />
    </div>
  );
}

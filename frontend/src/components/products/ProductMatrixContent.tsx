"use client";

import { useTheme } from "@/context/ThemeContext";
import type { MatrixTableData } from "@/lib/products-data";
import ProductBottomCTA from "./ProductBottomCTA";
import ProductLightImage from "@/components/home/ProductLightImage";

interface ProductMatrixContentProps {
  title: string;
  matrix: MatrixTableData;
  imageUnlit: string;
  imageLit: string;
}

export default function ProductMatrixContent({
  title,
  matrix,
  imageUnlit,
  imageLit,
}: ProductMatrixContentProps) {
  const { lightsOn } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1">
          <h1
            className={`mb-6 font-heading text-2xl font-bold uppercase tracking-wide md:text-3xl ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            {title}
          </h1>

          <div
            className={`overflow-hidden rounded-xl border shadow-sm ${
              lightsOn ? "border-[#e8eaed] bg-white" : "border-white/10 bg-card"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-nextray-green text-left text-xs font-bold uppercase tracking-wider text-white">
                    {matrix.headers.map((h) => (
                      <th key={h} className="px-4 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        lightsOn
                          ? "border-t border-[#e8eaed] even:bg-[#f8f9fa]"
                          : "border-t border-white/10 even:bg-white/5"
                      }
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 ${
                            j === 0
                              ? `font-semibold ${lightsOn ? "text-[#1a1a1a]" : "text-white/90"}`
                              : lightsOn
                                ? "text-[#4a4a4a]"
                                : "text-white/70"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className={`relative mx-auto aspect-square w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl ${
            lightsOn ? "bg-[#f4f5f7]" : "bg-black"
          }`}
        >
          <ProductLightImage
            imageUnlit={imageUnlit}
            imageLit={imageLit}
            alt={title}
            fill
            className="object-contain p-6"
            sizes="280px"
          />
        </div>
      </div>

      <ProductBottomCTA />
    </div>
  );
}

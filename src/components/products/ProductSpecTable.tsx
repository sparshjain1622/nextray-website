"use client";

import { useTheme } from "@/context/ThemeContext";
import type { SpecTable } from "@/lib/products-data";

interface ProductSpecTableProps {
  table: SpecTable;
}

export default function ProductSpecTable({ table }: ProductSpecTableProps) {
  const { lightsOn } = useTheme();
  const isDual = table.columns === "dual";

  const headerClass =
    "bg-nextray-green px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white md:text-sm";
  const cellClass = `border-t px-4 py-3 text-sm ${
    lightsOn
      ? "border-[#e8eaed] text-[#4a4a4a]"
      : "border-white/10 text-white/75"
  }`;
  const labelClass = `font-semibold ${
    lightsOn ? "text-[#1a1a1a]" : "text-white/90"
  }`;

  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        lightsOn ? "border-[#e8eaed] bg-white" : "border-white/10 bg-card"
      }`}
    >
      <div className={headerClass}>{table.title}</div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse">
          {isDual && (
            <thead>
              <tr className={cellClass}>
                <th className={`${cellClass} ${labelClass} w-[40%]`} />
                <th
                  className={`${cellClass} text-center font-semibold text-nextray-green`}
                >
                  Round
                </th>
                <th
                  className={`${cellClass} text-center font-semibold text-nextray-green`}
                >
                  Square
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label}>
                <td className={`${cellClass} ${labelClass}`}>{row.label}</td>
                {isDual ? (
                  <>
                    <td className={`${cellClass} text-center`}>{row.round}</td>
                    <td className={`${cellClass} text-center`}>{row.square}</td>
                  </>
                ) : (
                  <td className={cellClass}>{row.value}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

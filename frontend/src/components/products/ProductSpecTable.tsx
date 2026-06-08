"use client";

import { useTheme } from "@/context/ThemeContext";
import type { SpecTable } from "@/lib/products-data";

interface ProductSpecTableProps {
  table: SpecTable;
}

export default function ProductSpecTable({ table }: ProductSpecTableProps) {
  const { lightsOn } = useTheme();
  const isDual = table.columns === "dual";

  const wrapperClass = `flex h-full flex-col overflow-hidden rounded-xl border shadow-sm ${
    lightsOn ? "border-[#e8eaed] bg-white" : "border-white/10 bg-card"
  }`;

  const headerClass =
    "bg-nextray-green px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-white md:text-sm";

  const rowClass = `grid items-center gap-x-3 px-5 py-3 text-sm ${
    lightsOn
      ? "border-t border-[#e8eaed]"
      : "border-t border-white/10"
  }`;

  const labelClass = `font-medium ${
    lightsOn ? "text-[#1a1a1a]" : "text-white/90"
  }`;

  const valueClass = lightsOn ? "text-[#4a4a4a]" : "text-white/75";

  if (isDual) {
    const dualRowClass = `${rowClass} grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]`;

    return (
      <div className={wrapperClass}>
        <div className={headerClass}>{table.title}</div>
        <div className="flex-1">
          <div className={dualRowClass}>
            <span />
            <span className="text-center text-sm font-semibold text-nextray-green">
              Round
            </span>
            <span className="text-center text-sm font-semibold text-nextray-green">
              Square
            </span>
          </div>
          {table.rows.map((row) => (
            <div key={row.label} className={dualRowClass}>
              <span className={labelClass}>{row.label}</span>
              <span className={`text-center ${valueClass}`}>{row.round}</span>
              <span className={`text-center ${valueClass}`}>{row.square}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className={headerClass}>{table.title}</div>
      <div className="flex-1">
        {table.rows.map((row) => (
          <div
            key={row.label}
            className={`${rowClass} grid-cols-[minmax(0,42%)_auto_1fr]`}
          >
            <span className={labelClass}>{row.label}</span>
            <span className="text-nextray-green">:</span>
            <span className={valueClass}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

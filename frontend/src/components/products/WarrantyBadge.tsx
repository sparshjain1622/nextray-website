"use client";

import { useTheme } from "@/context/ThemeContext";
import { ShieldCheck } from "lucide-react";

export default function WarrantyBadge({ years = 2 }: { years?: number }) {
  const { lightsOn } = useTheme();

  return (
    <div className="flex justify-center py-1">
      <div
        className={`group relative flex h-[148px] w-[148px] items-center justify-center transition-transform duration-300 hover:scale-[1.03] ${
          lightsOn ? "" : "drop-shadow-[0_8px_24px_rgba(122,184,0,0.15)]"
        }`}
      >
        {/* Outer decorative ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-12"
          viewBox="0 0 148 148"
          aria-hidden
        >
          <circle
            cx="74"
            cy="74"
            r="70"
            fill="none"
            stroke={lightsOn ? "#7ab800" : "#9ddc00"}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.45"
          />
          <circle
            cx="74"
            cy="74"
            r="62"
            fill="none"
            stroke={lightsOn ? "#7ab800" : "#9ddc00"}
            strokeWidth="2.5"
            opacity="0.25"
          />
        </svg>

        {/* Main badge body */}
        <div
          className={`relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border-2 shadow-lg ${
            lightsOn
              ? "border-nextray-green/50 bg-gradient-to-b from-white to-[#f4f8ee] shadow-nextray-green/10"
              : "border-nextray-green/40 bg-gradient-to-b from-card to-[#1a2210] shadow-black/30"
          }`}
        >
          {/* Inner glow ring */}
          <div
            className={`absolute inset-2 rounded-full border ${
              lightsOn ? "border-nextray-green/15" : "border-nextray-green/20"
            }`}
          />

          <ShieldCheck
            size={22}
            className="relative z-10 mb-0.5 text-nextray-green"
            strokeWidth={2}
          />

          <span
            className={`relative z-10 font-heading text-4xl font-bold leading-none ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            {years}
          </span>

          <span className="relative z-10 mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-nextray-green">
            Years
          </span>

          <span
            className={`relative z-10 text-[7px] font-semibold uppercase tracking-[0.15em] ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/50"
            }`}
          >
            Warranty
          </span>
        </div>

        {/* Bottom ribbon */}
        <div
          className={`absolute -bottom-1 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-wider shadow-md ${
            lightsOn
              ? "bg-nextray-green text-white"
              : "bg-nextray-green-bright text-black"
          }`}
        >
          BIS Approved
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { companyStats, companyStatsSubtitle } from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import { StaggerContainer, StaggerItem } from "./AnimateIn";
import RotatingWords from "./RotatingWords";
import {
  Award,
  Calendar,
  Factory,
  Layers,
  ShieldCheck,
} from "lucide-react";

const statIcons = {
  calendar: Calendar,
  factory: Factory,
  layers: Layers,
  award: Award,
};

function StatCard({
  value,
  suffix,
  label,
  icon,
  lightsOn,
}: {
  value: string;
  suffix: string;
  label: string;
  icon: keyof typeof statIcons;
  lightsOn: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const wattMatch = value.match(/^(\d+)W$/);
  const target = wattMatch
    ? parseInt(wattMatch[1], 10)
    : parseInt(value, 10);
  const unit = wattMatch ? "W" : suffix;
  const [count, setCount] = useState(0);
  const Icon = statIcons[icon];

  useEffect(() => {
    if (!isInView || isNaN(target)) return;

    let frame: number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  const display = isNaN(target) ? value : `${count}${unit}`;

  return (
    <motion.div
      ref={ref}
      className={`flex h-full flex-col items-center rounded-xl border-b-4 border-nextray-green px-3 py-4 text-center shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg md:rounded-2xl md:px-6 md:py-8 ${
        lightsOn ? "bg-white shadow-black/8" : "bg-card shadow-black/20"
      }`}
    >
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-nextray-green/12 text-nextray-green md:mb-5 md:h-14 md:w-14">
        <Icon className="h-[18px] w-[18px] md:h-6 md:w-6" />
      </div>
      <p
        className={`font-heading text-2xl font-bold md:text-5xl ${
          lightsOn ? "text-[#1a1a1a]" : "text-white"
        }`}
      >
        {display}
      </p>
      <span className="my-2 inline-block h-0.5 w-6 bg-nextray-green md:my-4 md:w-10" />
      <p
        className={`text-[10px] leading-snug md:text-sm ${
          lightsOn ? "text-[#6b6b6b]" : "text-white/55"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function CompanyStats() {
  const { lightsOn } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-14 md:py-24 ${
        lightsOn ? "bg-[#f4f5f7]" : "bg-section-secondary"
      }`}
    >
      {/* Soft green blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-nextray-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-nextray-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-14">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
            — Our Strength in Numbers —
          </p>

          <h2
            className={`mb-5 font-heading text-3xl font-bold md:text-4xl lg:text-[2.5rem] ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Building Trust. Delivering{" "}
            <RotatingWords
              words={["Excellence.", "Innovation.", "Quality.", "Reliability."]}
              className="text-3xl md:text-4xl lg:text-[2.5rem]"
            />
          </h2>

          <p
            className={`mx-auto max-w-2xl text-base leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            {companyStatsSubtitle}
          </p>
        </div>

        {/* Stat cards */}
        <StaggerContainer className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                lightsOn={lightsOn}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer tagline */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center md:mt-14 md:flex-row md:gap-4">
          <span
            className={`hidden h-px flex-1 md:block ${
              lightsOn ? "bg-[#e0e0e0]" : "bg-white/10"
            }`}
          />
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nextray-green text-black">
              <ShieldCheck size={16} />
            </div>
            <p
              className={`text-sm md:text-base ${
                lightsOn ? "text-[#1a1a1a]" : "text-white/90"
              }`}
            >
              Powering a smarter, brighter and more{" "}
              <span className="font-semibold text-nextray-green">
                sustainable
              </span>{" "}
              future.
            </p>
          </div>
          <span
            className={`hidden h-px flex-1 md:block ${
              lightsOn ? "bg-[#e0e0e0]" : "bg-white/10"
            }`}
          />
        </div>
      </div>
    </section>
  );
}

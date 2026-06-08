"use client";

import Link from "next/link";
import { whyChooseUs, whyChooseUsCta, whyChooseUsSubtitle } from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import RotatingWords from "./RotatingWords";
import { StaggerContainer, StaggerItem } from "./AnimateIn";
import {
  Award,
  ChevronRight,
  Clock,
  FlaskConical,
  IndianRupee,
  Layers,
  Shield,
  ShieldCheck,
} from "lucide-react";

const icons = {
  layers: Layers,
  award: Award,
  flask: FlaskConical,
  shield: Shield,
  clock: Clock,
  rupee: IndianRupee,
};

function DotGrid({ light }: { light: boolean }) {
  return (
    <div className="grid grid-cols-5 gap-1">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className={`h-1 w-1 rounded-full ${
            light ? "bg-[#d8dce3]" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

export default function WhyChooseUs() {
  const { lightsOn } = useTheme();

  return (
    <section
      className={`relative overflow-hidden py-14 md:py-24 ${
        lightsOn ? "bg-[#f4f5f7]" : "bg-section-primary"
      }`}
    >
      {/* Green blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-nextray-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-nextray-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-nextray-green" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
              Why Choose Us
            </span>
            <span className="h-px w-10 bg-nextray-green" />
          </div>

          <h2
            className={`mb-5 font-heading text-3xl font-bold md:text-4xl lg:text-[2.5rem] ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Built on{" "}
            <RotatingWords
              words={["Innovation", "Quality", "Trust", "Reliability"]}
              className="text-3xl md:text-4xl lg:text-[2.5rem]"
            />
          </h2>

          <p
            className={`mx-auto max-w-2xl text-base leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            {whyChooseUsSubtitle}
          </p>
        </div>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = icons[item.icon];
            const number = String(index + 1).padStart(2, "0");
            return (
              <StaggerItem key={item.title}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-xl border-b-4 border-nextray-green shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg md:rounded-2xl ${
                    lightsOn
                      ? "bg-white shadow-black/8"
                      : "bg-card shadow-black/20"
                  }`}
                >
                  <div className="relative flex flex-1 flex-col p-3 pb-10 md:p-6 md:pb-16">
                    {/* Top row — icon + dot grid */}
                    <div className="mb-3 flex items-start justify-between md:mb-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-nextray-green/12 text-nextray-green shadow-sm md:h-12 md:w-12">
                        <Icon className="h-4 w-4 md:h-[22px] md:w-[22px]" />
                      </div>
                      <div className="hidden md:block">
                        <DotGrid light={lightsOn} />
                      </div>
                    </div>

                    <h3
                      className={`mb-1.5 font-heading text-[11px] font-bold leading-snug md:mb-3 md:text-base ${
                        lightsOn ? "text-[#1a1a1a]" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[10px] leading-relaxed md:text-sm ${
                        lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Faint number */}
                    <span className="pointer-events-none absolute bottom-2 right-2 font-heading text-3xl font-bold text-nextray-green/15 md:bottom-4 md:right-4 md:text-5xl">
                      {number}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <Link
          href="/about/why-choose-us"
          className={`group mt-8 flex items-center justify-between gap-3 rounded-full px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md md:mt-14 md:gap-4 md:px-10 md:py-5 ${
            lightsOn
              ? "bg-white shadow-black/5"
              : "border border-white/10 bg-card"
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nextray-green text-black">
            <ShieldCheck size={20} />
          </div>
          <p
            className={`text-center text-sm md:text-base ${
              lightsOn ? "text-[#1a1a1a]" : "text-white/90"
            }`}
          >
            <span className="font-bold">{whyChooseUsCta.bold}</span>{" "}
            That&apos;s the{" "}
            <span className="font-bold text-nextray-green">Nextray</span> promise.
          </p>
          <ChevronRight
            size={20}
            className="shrink-0 text-nextray-green transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

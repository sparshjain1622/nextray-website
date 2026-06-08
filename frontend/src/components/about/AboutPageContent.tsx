"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import type { AboutPageData } from "@/lib/about-data";
import { Check } from "lucide-react";

interface AboutPageContentProps {
  data: AboutPageData;
}

export default function AboutPageContent({ data }: AboutPageContentProps) {
  const { lightsOn } = useTheme();

  const cardClass = `rounded-xl border p-6 md:p-8 ${
    lightsOn
      ? "border-[#e8eaed] bg-white shadow-sm"
      : "border-white/10 bg-card"
  }`;

  const headingClass = `font-heading text-xl font-bold text-nextray-green md:text-2xl ${
    lightsOn ? "text-nextray-green" : "text-nextray-green"
  }`;

  const textClass = `text-sm leading-relaxed md:text-base ${
    lightsOn ? "text-[#4a4a4a]" : "text-white/70"
  }`;

  return (
    <article className={cardClass}>
      <h2
        className={`mb-6 font-heading text-2xl font-bold md:text-3xl ${
          lightsOn ? "text-[#1a1a1a]" : "text-white"
        }`}
      >
        {data.title}
      </h2>

      {data.intro?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className={`mb-5 ${textClass}`}>
          {paragraph}
        </p>
      ))}

      {data.sections?.map((section) => (
        <div key={section.title} className="mb-8 last:mb-0">
          {section.title && (
            <h3 className={`mb-3 ${headingClass}`}>{section.title}</h3>
          )}
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={`mb-4 ${textClass}`}>
              {paragraph}
            </p>
          ))}
          {section.items && (
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-2 text-sm md:text-base ${
                    lightsOn ? "text-[#4a4a4a]" : "text-white/70"
                  }`}
                >
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-nextray-green"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {data.founders && (
        <div className="grid gap-6 md:grid-cols-2">
          {data.founders.map((founder) => (
            <div
              key={founder.name}
              className={`rounded-lg border p-5 ${
                lightsOn
                  ? "border-[#e8eaed] bg-[#f8f9fa]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-nextray-green/15 font-heading text-lg font-bold text-nextray-green">
                {founder.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3
                className={`mb-3 font-heading text-lg font-bold ${
                  lightsOn ? "text-[#1a1a1a]" : "text-white"
                }`}
              >
                {founder.name}
              </h3>
              <p className={textClass}>{founder.bio}</p>
            </div>
          ))}
        </div>
      )}

      {data.certifications && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.certifications.map((cert) => (
            <div
              key={cert.title}
              className={`overflow-hidden rounded-lg border text-center ${
                lightsOn
                  ? "border-[#e8eaed] bg-[#f8f9fa]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div
                className={`relative mx-auto flex h-40 w-full items-center justify-center p-4 ${
                  lightsOn ? "bg-white" : "bg-black/30"
                }`}
              >
                {cert.image && (
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={120}
                    height={120}
                    className="max-h-28 w-auto object-contain"
                  />
                )}
              </div>
              <p
                className={`border-t px-3 py-4 text-sm font-semibold ${
                  lightsOn
                    ? "border-[#e8eaed] text-[#1a1a1a]"
                    : "border-white/10 text-white"
                }`}
              >
                {cert.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {data.objectives && (
        <div className="mt-6">
          <h3 className={`mb-4 ${headingClass}`}>Quality Objectives</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.objectives.map((item) => (
              <li
                key={item}
                className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
                  lightsOn
                    ? "border-nextray-green/20 bg-nextray-green/5 text-[#1a1a1a]"
                    : "border-nextray-green/25 bg-nextray-green/10 text-white/90"
                }`}
              >
                <Check size={16} className="shrink-0 text-nextray-green" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.milestones && (
        <div className="space-y-0">
          {data.milestones.map((item, index) => (
            <div
              key={item.year}
              className={`relative flex gap-4 pb-8 last:pb-0 ${
                index < data.milestones!.length - 1
                  ? "border-l-2 border-nextray-green/30 ml-4 pl-6"
                  : "ml-4 pl-6"
              }`}
            >
              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-nextray-green bg-nextray-green" />
              <div>
                <span className="mb-1 inline-block rounded-full bg-nextray-green/15 px-3 py-0.5 text-xs font-bold text-nextray-green">
                  {item.year}
                </span>
                <h3
                  className={`mb-2 font-heading text-base font-bold md:text-lg ${
                    lightsOn ? "text-[#1a1a1a]" : "text-white"
                  }`}
                >
                  {item.title}
                </h3>
                <p className={textClass}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.infrastructure && (
        <div className="space-y-6">
          {data.infrastructure.map((unit) => (
            <div
              key={unit.title}
              className={`rounded-lg border p-5 md:p-6 ${
                lightsOn
                  ? "border-[#e8eaed] bg-[#f8f9fa]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <h3 className={`mb-3 ${headingClass}`}>{unit.title}</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {unit.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="rounded-full border border-nextray-green/30 bg-nextray-green/10 px-3 py-1 text-xs font-semibold text-nextray-green"
                  >
                    {cap}
                  </span>
                ))}
              </div>
              <p className={textClass}>{unit.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.quote && (
        <blockquote
          className={`mt-8 border-l-4 border-nextray-green pl-5 italic ${
            lightsOn ? "text-[#4a4a4a]" : "text-white/75"
          }`}
        >
          {data.quote}
        </blockquote>
      )}
    </article>
  );
}

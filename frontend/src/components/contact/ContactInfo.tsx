"use client";

import { useTheme } from "@/context/ThemeContext";
import { MapPin, Phone, Mail, User } from "lucide-react";
import { companyAddress, contactDepartments } from "@/lib/site-pages-data";

export default function ContactInfo() {
  const { lightsOn } = useTheme();

  const cardClass = `rounded-xl border p-6 ${
    lightsOn
      ? "border-[#e8eaed] bg-white shadow-sm"
      : "border-white/10 bg-card"
  }`;

  const labelClass = `text-xs font-semibold uppercase tracking-wider ${
    lightsOn ? "text-nextray-green" : "text-nextray-green-bright"
  }`;

  const textClass = `text-sm ${lightsOn ? "text-[#4a4a4a]" : "text-white/70"}`;

  return (
    <div className="space-y-6">
      <div className={cardClass}>
        <div className="mb-4 flex items-start gap-3">
          <MapPin size={20} className="mt-0.5 shrink-0 text-nextray-green" />
          <div>
            <p className={labelClass}>Address</p>
            <address className={`mt-2 not-italic leading-relaxed ${textClass}`}>
              {companyAddress.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(companyAddress.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-nextray-green hover:underline"
        >
          View on Google Maps
        </a>
      </div>

      {contactDepartments.map((dept) => (
        <div key={dept.title} className={cardClass}>
          <p className={`mb-3 ${labelClass}`}>{dept.title}</p>
          <div className="space-y-2">
            {"contact" in dept && dept.contact && (
              <p className={`flex items-center gap-2 ${textClass}`}>
                <User size={16} className="shrink-0 text-nextray-green" />
                {dept.contact}
              </p>
            )}
            {dept.phone && (
              <a
                href={"phoneHref" in dept ? dept.phoneHref : dept.href}
                className={`flex items-center gap-2 transition-colors hover:text-nextray-green ${textClass}`}
              >
                <Phone size={16} className="shrink-0 text-nextray-green" />
                {dept.phone}
              </a>
            )}
            {"email" in dept && dept.email && (
              <a
                href={dept.emailHref}
                className={`flex items-center gap-2 transition-colors hover:text-nextray-green ${textClass}`}
              >
                <Mail size={16} className="shrink-0 text-nextray-green" />
                {dept.email}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import SiteForm from "@/components/forms/SiteForm";
import { associateRoles } from "@/lib/site-pages-data";
import {
  ArrowRight,
  Handshake,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Growing Market",
    desc: "Tap into India's fast-expanding LED lighting demand",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Brand",
    desc: "20+ years of manufacturing excellence with BIS-approved products",
  },
  {
    icon: Zap,
    title: "Full Support",
    desc: "Product training, marketing material and technical assistance",
  },
  {
    icon: Users,
    title: "Nationwide Network",
    desc: "Join dealers and distributors across India",
  },
] as const;

const associateFields = [
  {
    name: "role",
    label: "Partnership Type",
    type: "select" as const,
    required: true,
    colSpan: 2 as const,
    options: associateRoles,
  },
  {
    name: "name",
    label: "Full Name",
    type: "text" as const,
    required: true,
    placeholder: "Your full name",
  },
  {
    name: "company",
    label: "Company Name",
    type: "text" as const,
    required: true,
    placeholder: "Business / firm name",
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    required: true,
    placeholder: "you@company.com",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel" as const,
    required: true,
    placeholder: "+91 XXXXX XXXXX",
  },
  {
    name: "city",
    label: "City",
    type: "text" as const,
    required: true,
    placeholder: "City",
  },
  {
    name: "state",
    label: "State",
    type: "text" as const,
    required: true,
    placeholder: "State",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea" as const,
    colSpan: 2 as const,
    placeholder:
      "Tell us about your business, territory and interest in partnering with Nextray.",
    rows: 4,
  },
];

export default function AssociatesContent() {
  const { lightsOn } = useTheme();

  const cardClass = `rounded-2xl border p-6 md:p-8 ${
    lightsOn
      ? "border-[#e8eaed] bg-white shadow-sm"
      : "border-white/10 bg-card"
  }`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
      {/* Left — why partner */}
      <div className="space-y-6">
        <div className={cardClass}>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-nextray-green/15">
            <Handshake size={24} className="text-nextray-green" />
          </div>
          <h2
            className={`mb-3 font-heading text-xl font-bold ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Why Partner With Us?
          </h2>
          <p
            className={`mb-6 text-sm leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            Join our growing network of agents and distributors across India.
            Whether you are an established electrical dealer or expanding into
            LED lighting, we welcome your partnership.
          </p>

          <ul className="space-y-4">
            {benefits.map((item) => {
              const Icon = item.icon;
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
                      className={`text-xs leading-relaxed ${
                        lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className={`rounded-2xl border p-6 ${
            lightsOn
              ? "border-nextray-green/20 bg-nextray-green/5"
              : "border-nextray-green/15 bg-nextray-green/10"
          }`}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-nextray-green">
            Prefer to talk directly?
          </p>
          <a
            href="tel:7096015151"
            className={`mb-2 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-nextray-green ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            <Phone size={16} className="text-nextray-green" />
            7096015151
          </a>
          <p
            className={`flex items-center gap-2 text-xs ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/55"
            }`}
          >
            <MapPin size={14} className="text-nextray-green" />
            Vadodara, Gujarat
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-nextray-green hover:underline"
          >
            Contact Sales Team
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Right — form */}
      <div className={cardClass}>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-nextray-green">
          Partnership Inquiry
        </p>
        <h2
          className={`mb-2 font-heading text-2xl font-bold ${
            lightsOn ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          Apply Now
        </h2>
        <p
          className={`mb-8 text-sm ${
            lightsOn ? "text-[#6b6b6b]" : "text-white/60"
          }`}
        >
          Fill in the details below and our team will get back to you within
          1–2 business days.
        </p>

        <SiteForm
          endpoint="associates"
          fields={associateFields}
          submitLabel="Submit Application"
          onSubmitMessage="We have received your application and will contact you within 1–2 business days."
          note="Fields marked with * are required. Your information is kept confidential."
        />
      </div>
    </div>
  );
}

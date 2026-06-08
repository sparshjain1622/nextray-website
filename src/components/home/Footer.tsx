"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState, type ReactNode } from "react";
import {
  footerContact,
  footerDescription,
  footerFeatures,
  footerLegal,
  footerLinks,
  footerSocial,
} from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight,
  Award,
  ChevronRight,
  ChevronUp,
  Clock,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";

function SocialIcon({ name }: { name: string }) {
  const cls = "h-[18px] w-[18px]";
  switch (name) {
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

const featureIcons = {
  shield: ShieldCheck,
  zap: Zap,
  leaf: Leaf,
};

const contactIcons = {
  phone: Phone,
  mail: Mail,
  map: MapPin,
  clock: Clock,
};

function FooterHeading({
  children,
  lightsOn,
}: {
  children: ReactNode;
  lightsOn: boolean;
}) {
  return (
    <div className="mb-5">
      <h2
        className={`font-heading text-sm font-bold uppercase tracking-widest ${
          lightsOn ? "text-[#1a1a1a]" : "text-white"
        }`}
      >
        {children}
      </h2>
      <span className="mt-2 block h-0.5 w-8 bg-nextray-green" />
    </div>
  );
}

export default function Footer() {
  const { lightsOn } = useTheme();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={
        lightsOn ? "bg-[#f4f5f7]" : "bg-section-tertiary"
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Company */}
          <div>
            <div className="mb-5 flex gap-3">
              <span className="w-1 shrink-0 rounded-full bg-nextray-green" />
              <Image
                src="/images/nextray-logo.png"
                alt="Nextray Technologies"
                width={180}
                height={55}
                className="h-10 w-auto object-contain md:h-11"
              />
            </div>

            <p
              className={`mb-6 text-sm leading-relaxed ${
                lightsOn ? "text-[#6b6b6b]" : "text-white/60"
              }`}
            >
              {footerDescription}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {footerFeatures.map((feature) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <div key={feature.title} className="text-center">
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-nextray-green/10 text-nextray-green">
                      <Icon size={16} />
                    </div>
                    <p
                      className={`text-[10px] font-bold leading-tight ${
                        lightsOn ? "text-[#1a1a1a]" : "text-white"
                      }`}
                    >
                      {feature.title}
                    </p>
                    <p
                      className={`mt-0.5 text-[9px] ${
                        lightsOn ? "text-[#888]" : "text-white/45"
                      }`}
                    >
                      {feature.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <FooterHeading lightsOn={lightsOn}>Quick Links</FooterHeading>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center gap-2 text-sm transition-colors hover:text-nextray-green ${
                      lightsOn ? "text-[#4a4a4a]" : "text-white/70"
                    }`}
                  >
                    <ChevronRight
                      size={14}
                      className="text-nextray-green transition-transform group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <FooterHeading lightsOn={lightsOn}>Contact Us</FooterHeading>
            <ul className="space-y-4">
              {footerContact.map((item) => {
                const Icon = contactIcons[item.icon];
                return (
                  <li key={item.label} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-nextray-green/10 text-nextray-green">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className={`block text-sm font-semibold transition-colors hover:text-nextray-green ${
                            lightsOn ? "text-[#1a1a1a]" : "text-white"
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          className={`text-sm font-semibold ${
                            lightsOn ? "text-[#1a1a1a]" : "text-white"
                          }`}
                        >
                          {item.value}
                        </p>
                      )}
                      {"subValue" in item && item.subValue && (
                        <p
                          className={`text-xs ${
                            lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                          }`}
                        >
                          {item.subValue}
                        </p>
                      )}
                      <p
                        className={`text-xs ${
                          lightsOn ? "text-[#888]" : "text-white/45"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4 — Connect & Newsletter */}
          <div>
            <FooterHeading lightsOn={lightsOn}>Connect With Us</FooterHeading>

            <div className="mb-6 flex gap-3">
              {footerSocial.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-nextray-green hover:text-nextray-green ${
                    lightsOn
                      ? "border-[#e0e0e0] bg-white text-nextray-green"
                      : "border-white/15 bg-card text-nextray-green"
                  }`}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>

            <div
              className={`rounded-xl border p-4 ${
                lightsOn
                  ? "border-[#e8eaed] bg-white"
                  : "border-white/10 bg-card"
              }`}
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nextray-green/10 text-nextray-green">
                  <Send size={16} />
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${
                      lightsOn ? "text-[#1a1a1a]" : "text-white"
                    }`}
                  >
                    Stay Updated
                  </p>
                  <p
                    className={`text-xs ${
                      lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                    }`}
                  >
                    Subscribe to our newsletter for the latest updates and offers.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-nextray-green ${
                    lightsOn
                      ? "border-[#e8eaed] bg-[#f8f9fa] text-[#1a1a1a] placeholder:text-[#aaa]"
                      : "border-white/10 bg-white/5 text-white placeholder:text-white/40"
                  }`}
                />
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-nextray-green py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-nextray-green-bright"
                >
                  Subscribe
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t ${
          lightsOn ? "border-[#e8eaed]" : "border-white/10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 lg:flex-row lg:px-6">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-nextray-green" />
            <span
              className={`text-xs font-medium ${
                lightsOn ? "text-[#4a4a4a]" : "text-white/70"
              }`}
            >
              ISO 9001:2015 Certified Company
            </span>
          </div>

          <p
            className={`text-center text-xs ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/55"
            }`}
          >
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-nextray-green">
              Nextray Technologies
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {footerLegal.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    className={`text-xs transition-colors hover:text-nextray-green ${
                      lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {index < footerLegal.length - 1 && (
                    <span
                      className={`h-3 w-px ${
                        lightsOn ? "bg-[#d0d0d0]" : "bg-white/20"
                      }`}
                    />
                  )}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-[#e8eaed] bg-white text-nextray-green"
                  : "border-white/15 bg-card text-nextray-green"
              }`}
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

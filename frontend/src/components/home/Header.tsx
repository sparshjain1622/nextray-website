"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/home-data";
import { usePublicCategories } from "@/hooks/usePublicCategories";
import { useTheme } from "@/context/ThemeContext";
import LightSwitch from "./LightSwitch";
import { ChevronDown, ChevronsRight, Menu, Phone, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { lightsOn } = useTheme();
  const { navItems } = usePublicCategories();

  const resolvedNavLinks = useMemo(
    () =>
      navLinks.map((link) => {
        if (link.label === "Products Range" && navItems.length > 0) {
          return {
            ...link,
            children: navItems.map((item) => ({
              label: item.label,
              href: item.href,
            })),
          };
        }
        return link;
      }),
    [navItems]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.12)]" : ""
      }`}
    >
      {/* Top bar — logo & utilities */}
      <div className="bg-[var(--header-bg)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/nextray-logo.png"
              alt="Nextray Technologies"
              width={200}
              height={60}
              className={`h-10 w-auto object-contain transition-all duration-500 sm:h-12 ${
                lightsOn
                  ? "brightness-90 contrast-125"
                  : "brightness-125 drop-shadow-[0_0_10px_rgba(122,184,0,0.2)]"
              }`}
              priority
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:7096015151"
              className="hidden items-center gap-2 text-sm font-semibold text-theme-primary transition-colors hover:text-nextray-green md:flex"
            >
              <Phone size={15} className="text-nextray-green" />
              7096015151
            </a>
            <LightSwitch />
            <button
              type="button"
              className="rounded-sm p-2 text-nextray-green transition-colors hover:bg-nextray-green/10 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navigation bar */}
      <nav
        className="hidden border-b border-theme lg:block"
        style={{ backgroundColor: "var(--nav-bar-bg)" }}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-0">
            {resolvedNavLinks.map((link) => (
              <li key={link.label} className="relative">
                {link.children ? (
                  <div
                    className="group"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 px-4 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--nav-text)] transition-colors hover:text-nextray-green"
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Hover bridge prevents dropdown closing */}
                    <div
                      className={`absolute left-0 top-full z-50 pt-1 transition-all duration-200 ${
                        openDropdown === link.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0 pointer-events-none"
                      }`}
                    >
                      <ul className="min-w-[260px] bg-nextray-green py-1 shadow-xl">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
                            >
                              <ChevronsRight
                                size={14}
                                className="shrink-0 text-white/85"
                                aria-hidden
                              />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--nav-text)] transition-colors hover:text-nextray-green"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col border-l border-theme bg-[var(--header-bg)] shadow-2xl lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-theme px-4 py-4">
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-nextray-green">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-sm p-1.5 text-theme-primary hover:text-nextray-green"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3">
                {resolvedNavLinks.map((link) =>
                  link.children ? (
                    <div key={link.label} className="border-b border-theme">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label,
                          )
                        }
                        className="flex w-full items-center justify-between px-2 py-3.5 text-sm font-semibold uppercase tracking-wide text-theme-primary"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`text-nextray-green transition-transform ${
                            mobileExpanded === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pb-2"
                          >
                            {link.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className="flex items-center gap-2 rounded-sm bg-nextray-green/10 px-4 py-2.5 text-sm text-theme-body hover:bg-nextray-green/20 hover:text-nextray-green"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <ChevronsRight
                                    size={14}
                                    className="shrink-0 text-nextray-green"
                                    aria-hidden
                                  />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block border-b border-theme px-2 py-3.5 text-sm font-semibold uppercase tracking-wide text-theme-primary hover:text-nextray-green"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>

              <div className="border-t border-theme p-4">
                <a
                  href="tel:7096015151"
                  className="flex items-center justify-center gap-2 rounded-sm border border-nextray-green/30 bg-nextray-green/10 py-3 text-sm font-bold text-nextray-green"
                >
                  <Phone size={16} />
                  Call Sales: 7096015151
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

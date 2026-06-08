"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  featuredProjects,
  featuredProjectsSubtitle,
  parseProductTitle,
} from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import ProductLightImage from "./ProductLightImage";
import AnimateIn from "./AnimateIn";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, Zap } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function FeaturedRibbon() {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-20 w-20 overflow-hidden">
      <div className="absolute -left-7 top-4 w-28 -rotate-45 bg-nextray-green py-1 text-center text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
        Featured
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const { lightsOn } = useTheme();
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const autoplay = swiperRef.current?.autoplay;
        if (!autoplay) return;
        if (entry.isIntersecting) autoplay.start();
        else autoplay.stop();
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-20 md:py-24 ${
        lightsOn ? "bg-white" : "bg-section-primary"
      }`}
    >
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-64 w-48 -translate-y-1/2 opacity-20"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.1) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-64 w-48 -translate-y-1/2 opacity-20"
        style={{
          backgroundImage: lightsOn
            ? "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(122,184,0,0.1) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-nextray-green" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
              Featured Projects
            </span>
            <span className="h-px w-10 bg-nextray-green" />
          </div>

          <h2
            className={`mb-5 font-heading text-3xl font-bold md:text-4xl lg:text-[2.5rem] ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Delivering Excellence{" "}
            <span className="text-nextray-green">in Every Project</span>
          </h2>

          <p
            className={`mx-auto max-w-2xl text-base leading-relaxed ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            {featuredProjectsSubtitle}
          </p>
        </div>

        <AnimateIn>
          <motion.div
            key={lightsOn ? "featured-lit-on" : "featured-lit-off"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative px-10 md:px-14"
          >
            {/* Nav buttons */}
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className={`absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-all hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-[#e8eaed] bg-white text-[#4a4a4a]"
                  : "border-white/10 bg-card text-white/80"
              }`}
              aria-label="Previous project"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className={`absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-all hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-[#e8eaed] bg-white text-[#4a4a4a]"
                  : "border-white/10 bg-card text-white/80"
              }`}
              aria-label="Next project"
            >
              <ChevronRight size={22} />
            </button>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                swiper.autoplay.stop();
              }}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView={1.15}
              spaceBetween={20}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 140,
                modifier: 2,
                slideShadows: false,
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: ".featured-pagination",
              }}
              breakpoints={{
                640: { slidesPerView: 2.1, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
              className="featured-swiper pb-2!"
            >
              {featuredProjects.map((project) => {
                const { wattage, category } = parseProductTitle(project.title);
                return (
                  <SwiperSlide key={project.title}>
                    {({ isActive }) => (
                      <article
                        className={`overflow-hidden rounded-xl shadow-md transition-shadow duration-500 ${
                          lightsOn
                            ? "bg-white shadow-black/10"
                            : "bg-card shadow-black/25"
                        } ${isActive ? "shadow-lg" : ""}`}
                      >
                        <div
                          className={`relative aspect-square overflow-hidden ${
                            lightsOn ? "bg-white" : "bg-black"
                          }`}
                        >
                          {isActive && <FeaturedRibbon />}
                          <div className="absolute bottom-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-nextray-green shadow-md">
                            <Zap
                              size={14}
                              className="text-white"
                              fill="currentColor"
                              strokeWidth={1.5}
                            />
                          </div>
                          <ProductLightImage
                            imageUnlit={project.imageUnlit}
                            imageLit={project.imageLit}
                            alt={project.title}
                            fill
                            catalog
                            className={`object-cover object-center transition-transform duration-500 ${
                              lightsOn ? "scale-[1.2]" : "scale-[1.35]"
                            }`}
                            sizes="(max-width: 768px) 80vw, 30vw"
                          />
                        </div>

                        <div className="px-4 py-4">
                          <p
                            className={`text-sm font-bold uppercase tracking-wide ${
                              lightsOn ? "text-[#1a1a1a]" : "text-white"
                            }`}
                          >
                            {wattage}
                          </p>
                          <p
                            className={`text-xs ${
                              lightsOn ? "text-[#6b6b6b]" : "text-white/55"
                            }`}
                          >
                            {category}
                          </p>
                        </div>
                      </article>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Custom pagination */}
            <div className="featured-pagination mt-8 flex items-center justify-center gap-2" />
          </motion.div>
        </AnimateIn>

        {/* View all CTA */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/gallery/projects"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-nextray-green px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-nextray-green transition-all duration-300 hover:bg-nextray-green/5"
          >
            <LayoutGrid size={18} />
            View All Projects
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

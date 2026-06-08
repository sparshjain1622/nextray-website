"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SafeImage from "./SafeImage";
import { clients, clientsSubtitle } from "@/lib/home-data";
import { useTheme } from "@/context/ThemeContext";
import RotatingWords from "./RotatingWords";
import AnimateIn from "./AnimateIn";
import { ArrowRight, ChevronLeft, ChevronRight, Download } from "lucide-react";
import "swiper/css";

function ClientLogo({
  src,
  index,
  lightsOn,
}: {
  src: string;
  index: number;
  lightsOn: boolean;
}) {
  return (
    <div
      className={`group h-32 w-full rounded-xl border p-1.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:h-36 ${
        lightsOn
          ? "border-[#e8eaed] bg-white"
          : "border-white/10 bg-card"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
        <SafeImage
          src={src}
          alt={`Client ${index + 1}`}
          fill
          className="object-contain object-center scale-110 transition-transform duration-300 group-hover:scale-[1.18]"
          sizes="150px"
        />
      </div>
    </div>
  );
}

export default function Clients() {
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
      id="clients"
      className={`py-20 md:py-24 ${
        lightsOn ? "bg-[#f4f5f7]" : "bg-section-secondary"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-nextray-green" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-nextray-green">
              Our Clients
            </span>
            <span className="h-px w-10 bg-nextray-green" />
          </div>

          <h2
            className={`mb-4 font-heading text-3xl font-bold md:text-4xl lg:text-[2.5rem] ${
              lightsOn ? "text-[#1a1a1a]" : "text-white"
            }`}
          >
            Partnering with{" "}
            <RotatingWords
              words={["Enterprises", "Industry Leaders", "Institutions", "OEMs"]}
              className="text-3xl md:text-4xl lg:text-[2.5rem]"
            />
          </h2>

          <p
            className={`mx-auto max-w-xl text-base ${
              lightsOn ? "text-[#6b6b6b]" : "text-white/60"
            }`}
          >
            {clientsSubtitle}
          </p>

          <span className="mx-auto mt-5 block h-0.5 w-10 bg-nextray-green" />
        </div>

        {/* Logo carousel */}
        <AnimateIn>
          <div className="relative px-12 md:px-14">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className={`absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-all hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-[#e8eaed] bg-white text-[#4a4a4a]"
                  : "border-white/10 bg-card text-white/80"
              }`}
              aria-label="Previous clients"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className={`absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm transition-all hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-[#e8eaed] bg-white text-[#4a4a4a]"
                  : "border-white/10 bg-card text-white/80"
              }`}
              aria-label="Next clients"
            >
              <ChevronRight size={20} />
            </button>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                swiper.autoplay.stop();
              }}
              modules={[Autoplay]}
              loop
              speed={4000}
              allowTouchMove
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 3, spaceBetween: 16 },
                640: { slidesPerView: 4, spaceBetween: 18 },
                768: { slidesPerView: 5, spaceBetween: 20 },
                1024: { slidesPerView: 6, spaceBetween: 20 },
                1280: { slidesPerView: 7, spaceBetween: 22 },
              }}
              className="clients-swiper"
            >
              {clients.map((src, index) => (
                <SwiperSlide key={src}>
                  <ClientLogo src={src} index={index} lightsOn={lightsOn} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimateIn>

        {/* CTA buttons */}
        <AnimateIn delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gallery/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-nextray-green px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-nextray-green-bright"
            >
              View Our Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href="#"
              className={`inline-flex items-center gap-2 rounded-lg border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest transition-all hover:border-nextray-green hover:text-nextray-green ${
                lightsOn
                  ? "border-nextray-green bg-white text-nextray-green"
                  : "border-nextray-green bg-transparent text-nextray-green"
              }`}
            >
              Download Catalog
              <Download size={16} />
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

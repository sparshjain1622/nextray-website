"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  title: string;
  image: string;
}

interface ImageGalleryProps {
  items: readonly GalleryItem[];
}

export default function ImageGallery({ items }: ImageGalleryProps) {
  const { lightsOn } = useTheme();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (index: number) => setLightbox(index);
  const close = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % items.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => open(index)}
            className={`group overflow-hidden rounded-lg border text-left transition-all hover:-translate-y-0.5 hover:shadow-lg ${
              lightsOn
                ? "border-[#e8eaed] bg-white shadow-sm"
                : "border-white/10 bg-card"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            {item.title && (
              <p
                className={`px-3 py-2.5 text-xs font-semibold md:text-sm ${
                  lightsOn ? "text-[#1a1a1a]" : "text-white"
                }`}
              >
                {item.title}
              </p>
            )}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-16 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:right-16 md:top-1/2 md:-translate-y-1/2"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
          <div className="relative max-h-[80vh] w-full max-w-4xl">
            <Image
              src={items[lightbox].image}
              alt={items[lightbox].title}
              width={1200}
              height={800}
              className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {items[lightbox].title && (
              <p className="mt-3 text-center text-sm font-medium text-white">
                {items[lightbox].title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

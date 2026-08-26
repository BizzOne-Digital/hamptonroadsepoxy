"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { GalleryItemDTO } from "@/lib/gallery";

interface GalleryGridProps {
  items: GalleryItemDTO[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory)),
    [items, activeCategory]
  );

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  if (items.length === 0) {
    return (
      <p className="text-charcoal/60 text-center py-16">
        Our project gallery is coming soon — check back shortly.
      </p>
    );
  }

  return (
    <>
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? "bg-forest text-ivory"
                  : "bg-cream text-forest hover:bg-forest/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <Reveal key={item._id} delay={(i % 3) * 0.06}>
            <button
              onClick={() => setActiveIndex(i)}
              className="relative aspect-square rounded-xl overflow-hidden w-full group"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-ivory text-xs font-semibold">{item.title}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {activeIndex !== null && filtered[activeIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button aria-label="Close" onClick={close} className="absolute top-5 right-5 text-ivory hover:text-gold">
            <X size={28} />
          </button>
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 sm:left-8 text-ivory hover:text-gold"
          >
            <ChevronLeft size={36} />
          </button>
          <div className="relative w-full max-w-3xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[activeIndex].imageUrl}
              alt={filtered[activeIndex].title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 sm:right-8 text-ivory hover:text-gold"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}

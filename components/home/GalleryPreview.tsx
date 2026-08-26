"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export interface GalleryPreviewImage {
  src: string;
  alt: string;
}

interface GalleryPreviewProps {
  images: GalleryPreviewImage[];
}

export default function GalleryPreview({ images }: GalleryPreviewProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  if (images.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading eyebrow="Our Work" title="A Look at Recent Installations" />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-14">
          {images.map((image, i) => (
            <Reveal key={image.src} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActiveIndex(i)}
                className="relative aspect-square rounded-xl overflow-hidden w-full group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-full border border-forest/20 px-6 py-2.5 text-sm font-semibold text-forest hover:bg-forest hover:text-ivory transition-colors"
          >
            View More Projects
          </Link>
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute top-5 right-5 text-ivory hover:text-gold"
          >
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
          <div
            className="relative w-full max-w-3xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
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
    </section>
  );
}

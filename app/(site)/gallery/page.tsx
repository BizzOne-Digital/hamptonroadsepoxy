import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getAllGalleryItems } from "@/lib/gallery";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse recent metallic, quartz, and classic epoxy flooring installations by Hampton Roads Epoxy across Hampton Roads.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <>
      <section className="bg-forest text-ivory">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Work</span>
            <h1 className="font-heading text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight">
              Floors That Speak for Themselves
            </h1>
            <p className="text-ivory/80 text-lg mt-5 max-w-xl leading-relaxed">
              A look at recent metallic, quartz, and classic epoxy flooring
              installations across {`Hampton Roads`}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-20 sm:py-28">
          <GalleryGrid items={items} />
        </div>
      </section>

      <section className="bg-forest text-ivory">
        <div className="container-page py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl max-w-lg">
            Like what you see? Let&apos;s plan your floor.
          </h2>
          <LinkButton href="/booking" variant="primary">
            Get a Free Quote <ArrowRight size={16} />
          </LinkButton>
        </div>
      </section>
    </>
  );
}

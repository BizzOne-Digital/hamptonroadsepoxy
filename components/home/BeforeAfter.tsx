"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const pairs = [
  {
    before:
      "/bef1.png",
    after:
      "/aft1.png",
    label: "Residential Garage",
  },
  {
    before:
      "/bef2.png",
    after:
      "/af2.png",
    label: "Commercial Showroom",
  },
];

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pairs[activeIndex];

  return (
    <section className="bg-ivory">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="The Transformation"
            title="Concrete In. A Statement Floor Out."
            description="Slide through a few of the transformations our epoxy systems make possible."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={active.before} alt={`${active.label} before`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              <span className="absolute top-3 left-3 bg-charcoal/80 text-ivory text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                Before
              </span>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={active.after} alt={`${active.label} after`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                After
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {pairs.map((pair, i) => (
              <button
                key={pair.label}
                onClick={() => setActiveIndex(i)}
                className={`text-sm font-semibold px-5 py-2 rounded-full border transition-colors ${
                  i === activeIndex
                    ? "bg-forest text-ivory border-forest"
                    : "border-cream text-charcoal/70 hover:border-forest"
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

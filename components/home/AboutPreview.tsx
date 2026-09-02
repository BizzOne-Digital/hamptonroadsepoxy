import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

const points = [
  "Owner-operated with hands-on quality control",
  "Meticulous concrete prep for lasting results",
  "Premium, industrial-grade epoxy systems",
  "Clear communication from quote to completion",
];

export default function AboutPreview() {
  return (
    <section className="bg-ivory">
      <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/new/about.png"
              alt="Hampton Roads Epoxy technician applying a metallic epoxy floor coating"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            About Hampton Roads Epoxy
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-forest mt-4 leading-tight">
            Built on Craftsmanship, Backed by Hands-On Ownership
          </h2>
          <p className="text-charcoal/75 text-lg mt-5 leading-relaxed">
            Hampton Roads Epoxy is a locally owned flooring company dedicated
            to transforming concrete surfaces across {siteConfig.serviceArea}.
            From luxury garages to busy commercial spaces, we treat every
            floor like it&apos;s the last impression your space makes.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="text-gold mt-0.5 shrink-0" size={20} />
                <span className="text-charcoal/85">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <LinkButton href="/about" variant="outline">
              Learn More About Us
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

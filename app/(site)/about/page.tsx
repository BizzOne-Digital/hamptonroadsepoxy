import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Hampton Roads Epoxy, an owner-operated epoxy flooring company serving Hampton Roads with premium metallic, quartz, and classic epoxy floors.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Quality First",
    description: "We never cut corners on surface prep — the foundation of every long-lasting epoxy floor.",
  },
  {
    title: "Honest Communication",
    description: "You'll always know what to expect, from your first estimate through the final walkthrough.",
  },
  {
    title: "Local Accountability",
    description: "As a Hampton Roads business, our reputation is built one floor at a time in our own community.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-forest text-ivory">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">About Us</span>
            <h1 className="font-heading text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight">
              Hampton Roads&apos; Trusted Epoxy Flooring Specialists
            </h1>
            <p className="text-ivory/80 text-lg mt-5 max-w-xl leading-relaxed">
              Owner-operated and hands-on, Hampton Roads Epoxy exists to
              make concrete floors beautiful, durable, and easy to live
              with.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/new/metallic2.jpg"
                alt="Finished metallic epoxy flooring in a residential space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest leading-tight">Our Story</h2>
            <p className="text-charcoal/75 text-lg mt-5 leading-relaxed">
              Hampton Roads Epoxy was built on a simple idea: homeowners and
              business owners deserve flooring that looks incredible and
              performs even better. What started as a passion for
              craftsmanship has grown into a trusted local flooring company
              serving garages, basements, showrooms, and commercial spaces
              throughout {siteConfig.serviceArea}.
            </p>
            <p className="text-charcoal/75 text-lg mt-4 leading-relaxed">
              Every project is personally overseen to make sure it meets our
              standard — properly prepped concrete, premium epoxy systems,
              and a finish our clients are proud to show off.
            </p>
            <div className="mt-8">
              <LinkButton href="/contact" variant="outline">
                Get in Touch <ArrowRight size={16} />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Approach</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest leading-tight mt-4">
              Why Professional Preparation Matters
            </h2>
            <p className="text-charcoal/75 text-lg mt-5 leading-relaxed">
              A beautiful epoxy floor is only as good as the surface beneath
              it. Before a drop of epoxy goes down, we properly diamond
              grind, clean, and repair the concrete so every coat bonds the
              way it should — no shortcuts, no bubbling, no peeling down the
              road.
            </p>
            <p className="text-charcoal/75 text-lg mt-4 leading-relaxed">
              That same care carries through to installation: precise mixing,
              even application, and a finish that holds up to daily traffic,
              tires, and tools for years to come.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/new/quarttz1.jpg"
                alt="Close-up of a professionally finished quartz epoxy floor surface"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal className="lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Residential &amp; Commercial</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-forest leading-tight mt-4">
              Expertise Across Every Space
            </h2>
            <p className="text-charcoal/75 text-lg mt-5 leading-relaxed">
              From a single-car garage to a full commercial showroom, we
              tailor every system to how the space is actually used. Garages,
              basements, workshops, and home gyms get flooring built for
              daily wear, while retail floors, warehouses, and commercial
              garages get systems designed for heavy traffic and long-term
              performance.
            </p>
            <div className="mt-8">
              <LinkButton href="/services" variant="outline">
                See Our Services <ArrowRight size={16} />
              </LinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/new/expoxy3-final.jpg"
                alt="Finished flake epoxy garage floor installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="What We Stand For" title="Our Values" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 h-full shadow-sm border border-cream">
                  <CheckCircle2 className="text-gold mb-4" size={28} />
                  <h3 className="font-heading text-xl text-forest">{value.title}</h3>
                  <p className="text-charcoal/70 text-sm mt-3 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest text-ivory">
        <div className="container-page py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl max-w-lg">
            Let&apos;s discuss your flooring project.
          </h2>
          <LinkButton href="/booking" variant="primary">
            Book a Consultation <ArrowRight size={16} />
          </LinkButton>
        </div>
      </section>
    </>
  );
}

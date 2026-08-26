import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { getAllServices } from "@/lib/services";
import { getServiceVisuals } from "@/lib/serviceVisuals";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Epoxy Flooring Services",
  description:
    "Explore Hampton Roads Epoxy's metallic epoxy, quartz epoxy, and classic epoxy flooring services for residential and commercial spaces across Hampton Roads, Virginia.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <section className="bg-forest text-ivory">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Services</span>
            <h1 className="font-heading text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight">
              Flooring Systems Built for Every Space
            </h1>
            <p className="text-ivory/80 text-lg mt-5 max-w-xl leading-relaxed">
              From dramatic metallic finishes to dependable everyday epoxy,
              we help you choose the right system for your home or business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-20 sm:py-28 flex flex-col gap-16">
          {services.map((service, i) => {
            const visuals = getServiceVisuals(service.slug);
            return (
              <Reveal key={service.slug} delay={i * 0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={visuals.heroImage}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl text-forest">{service.title}</h2>
                    <p className="text-charcoal/75 text-lg mt-4 leading-relaxed">{service.shortDescription}</p>
                    <div className="mt-7">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 font-semibold text-forest hover:text-gold transition-colors"
                      >
                        Explore {service.title} <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <SectionHeading align="left" title="Not sure which system is right for you?" />
          <LinkButton href="/contact" variant="primary">
            Ask a Question <ArrowRight size={16} />
          </LinkButton>
        </div>
      </section>
    </>
  );
}

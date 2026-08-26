import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import { getServiceVisuals } from "@/lib/serviceVisuals";
import type { ServiceDTO } from "@/types";

export default function ServiceDetail({ service }: { service: ServiceDTO }) {
  const visuals = getServiceVisuals(service.slug);
  const heroImage = service.image?.url || visuals.heroImage;
  const descriptionParagraphs = service.description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.businessName,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    areaServed: {
      "@type": "Place",
      name: siteConfig.serviceArea,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-forest text-ivory overflow-hidden">
        <Image
          src={heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/95 to-forest/70" />
        <div className="container-page relative py-20 sm:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our Services</span>
            <h1 className="font-heading text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight">{service.title}</h1>
            <p className="text-ivory/80 text-lg mt-5 max-w-xl leading-relaxed">{service.shortDescription}</p>
            <div className="mt-8">
              <LinkButton href="/booking" variant="primary">
                Request an Estimate <ArrowRight size={16} />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Reveal>
              <h2 className="font-heading text-3xl text-forest">Overview</h2>
              {descriptionParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-charcoal/75 text-lg mt-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {visuals.gallery.map((src) => (
                  <div key={src} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={src} alt={service.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="bg-cream rounded-2xl p-7">
              <h3 className="font-heading text-xl text-forest mb-4">Key Features</h3>
              <ul className="flex flex-col gap-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold mt-0.5 shrink-0" size={18} />
                    <span className="text-charcoal/85 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading text-xl text-forest mt-8 mb-4">Ideal For</h3>
              <ul className="flex flex-wrap gap-2">
                {visuals.idealFor.map((item) => (
                  <li key={item} className="bg-white text-forest text-xs font-semibold px-3 py-2 rounded-full border border-forest/10">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <LinkButton href="/booking" variant="secondary" className="w-full">
                  Book a Consultation
                </LinkButton>
                <a
                  href={siteConfig.phoneHref}
                  className="text-center text-sm font-semibold text-forest hover:text-gold"
                >
                  Or call {siteConfig.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest text-ivory">
        <div className="container-page py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <SectionHeading light align="left" title={`Ready to get started with ${service.title.toLowerCase()}?`} />
          <LinkButton href="/contact" variant="primary">
            Get a Free Quote <ArrowRight size={16} />
          </LinkButton>
        </div>
      </section>
    </>
  );
}

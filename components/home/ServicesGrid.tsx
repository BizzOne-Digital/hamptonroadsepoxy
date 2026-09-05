import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getServiceVisuals } from "@/lib/serviceVisuals";
import type { ServiceDTO } from "@/types";

export default function ServicesGrid({ services }: { services: ServiceDTO[] }) {
  if (services.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Flooring Systems for Every Space"
            description="Every project starts with proper concrete preparation and ends with a finish built to perform for years."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 items-stretch">
          {services.map((service, i) => {
            const visuals = getServiceVisuals(service.slug);
            const heroImage = service.image?.url || visuals.heroImage;
            return (
              <Reveal key={service.slug} delay={i * 0.1} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <Image
                      src={heroImage}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading text-xl text-forest">{service.title}</h3>
                      <ArrowUpRight className="text-gold shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                    </div>
                    <p className="text-charcoal/70 mt-2 text-sm leading-relaxed line-clamp-2">{service.shortDescription}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

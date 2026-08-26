import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export default function LeadCTA() {
  return (
    <section className="relative bg-forest text-ivory overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600607688066-890987f19d2b?auto=format&fit=crop&w=2000&q=80"
        alt="Glossy epoxy floor reflecting light"
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-forest/80" />
      <div className="container-page relative py-20 sm:py-24 flex flex-col items-center text-center gap-6">
        <h2 className="font-heading text-3xl sm:text-4xl max-w-2xl leading-tight">
          Ready to Transform Your Floor?
        </h2>
        <p className="text-ivory/80 max-w-xl">
          Get a free, no-pressure quote from Hampton Roads Epoxy. We&apos;ll
          walk you through your options and help you find the right system
          for your space.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <LinkButton href="/booking" variant="primary">
            Request an Estimate <ArrowRight size={16} />
          </LinkButton>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 text-ivory font-semibold hover:text-gold transition-colors"
          >
            <Phone size={18} /> Call Now: {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

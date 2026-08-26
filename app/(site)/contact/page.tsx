import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Hampton Roads Epoxy for a free epoxy flooring quote. Call 757-718-0117 or send us a message to get started on your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-ivory">
      <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact Us</span>
            <h1 className="font-heading text-4xl sm:text-5xl text-forest mt-4 leading-tight">
              Let&apos;s Talk About Your Floor
            </h1>
            <p className="text-charcoal/70 text-lg mt-5 leading-relaxed">
              Reach out for a free, no-pressure quote. We typically respond
              within one business day.
            </p>

            <div className="flex flex-col gap-5 mt-10">
              <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-forest font-semibold hover:text-gold">
                <span className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </span>
                {siteConfig.phone}
              </a>
              <a href={siteConfig.emailHref} className="flex items-center gap-3 text-forest font-semibold hover:text-gold">
                <span className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </span>
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-3 text-forest font-semibold">
                <span className="w-11 h-11 rounded-full bg-cream flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </span>
                Serving {siteConfig.serviceArea}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-3">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

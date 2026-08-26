import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import BookingForm from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free consultation with Hampton Roads Epoxy for your metallic, quartz, or classic epoxy flooring project in Hampton Roads, Virginia.",
  alternates: { canonical: "/booking" },
};

const bullets = [
  "Free, no-obligation consultation",
  "On-site or virtual assessment available",
  "Straightforward guidance on the right system for your space",
  "Fast response time from our team",
];

export default function BookingPage() {
  return (
    <section className="bg-ivory">
      <div className="container-page py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Book a Consultation</span>
            <h1 className="font-heading text-4xl sm:text-5xl text-forest mt-4 leading-tight">
              Schedule Your Free Consultation
            </h1>
            <p className="text-charcoal/70 text-lg mt-5 leading-relaxed">
              Tell us a bit about your project and choose a preferred date.
              We&apos;ll confirm your appointment shortly after.
            </p>
            <ul className="flex flex-col gap-3 mt-8">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="text-gold mt-0.5 shrink-0" size={20} />
                  <span className="text-charcoal/80">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-3">
          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

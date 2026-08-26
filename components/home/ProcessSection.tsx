import { PhoneCall, ClipboardList, HardHat, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: PhoneCall,
    title: "Reach Out",
    description: "Call, book, or submit our contact form to tell us about your project.",
  },
  {
    icon: ClipboardList,
    title: "Free Consultation",
    description: "We assess your space and walk you through the best flooring options.",
  },
  {
    icon: HardHat,
    title: "Prep & Install",
    description: "Our team grinds, preps, and installs your flooring system with precision.",
  },
  {
    icon: Sparkles,
    title: "Enjoy the Reveal",
    description: "Walk on a durable, beautiful new floor built to last for years.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-ivory">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading eyebrow="Our Process" title="From First Call to Finished Floor" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14 relative">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="relative flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-forest flex items-center justify-center relative">
                  <Icon className="text-gold" size={26} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-forest">{title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

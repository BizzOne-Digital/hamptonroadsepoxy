import { Gem, Wrench, CalendarClock, HeartHandshake } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: Gem,
    title: "Premium-Grade Materials",
    description: "We use industrial epoxy systems built to resist stains, hot tires, and heavy daily use.",
  },
  {
    icon: Wrench,
    title: "Meticulous Surface Prep",
    description: "Every project begins with proper grinding and prep — the true key to a floor that lasts.",
  },
  {
    icon: CalendarClock,
    title: "Reliable Scheduling",
    description: "We show up on time, communicate clearly, and finish your project on schedule.",
  },
  {
    icon: HeartHandshake,
    title: "Owner-Led Service",
    description: "Orlando personally oversees every project, from first estimate to final walkthrough.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-forest text-ivory">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Quality You Can See, Service You Can Trust"
            light
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {reasons.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-ivory/10 flex items-center justify-center">
                  <Icon className="text-gold" size={22} />
                </div>
                <h3 className="font-heading text-xl">{title}</h3>
                <p className="text-ivory/70 text-sm leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

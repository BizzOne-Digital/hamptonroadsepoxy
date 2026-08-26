import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const industries = [
  {
    title: "Residential",
    description: "Garage floors, basements, patios, and pool decks finished to elevate everyday living.",
    image:
      "/img1.png",
  },
  {
    title: "Commercial",
    description: "Showrooms, retail floors, and warehouses built to handle heavy daily traffic.",
    image:
      "/img2.png",
  },
];

export default function IndustriesSection() {
  return (
    <section className="bg-cream">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Who We Serve"
            title="Residential & Commercial Flooring Experts"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-14">
          {industries.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <h3 className="font-heading text-2xl text-ivory">{item.title}</h3>
                  <p className="text-ivory/80 text-sm mt-2 max-w-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";

interface TestimonialItem {
  _id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    await connectDB();
    const docs = await Testimonial.find().sort({ createdAt: -1 }).limit(3).lean();
    return docs.map((d) => ({
      _id: String(d._id),
      name: d.name,
      location: d.location,
      quote: d.quote,
      rating: d.rating,
    }));
  } catch {
    return [];
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-ivory">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <SectionHeading eyebrow="Client Feedback" title="What Homeowners & Businesses Say" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14">
          {testimonials.map((t, i) => (
            <Reveal key={t._id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-sm h-full flex flex-col gap-4 border border-cream">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-charcoal/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto pt-3 border-t border-cream">
                  <p className="font-semibold text-forest text-sm">{t.name}</p>
                  <p className="text-charcoal/60 text-xs">{t.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

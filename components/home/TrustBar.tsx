import { ShieldCheck, Award, Clock, ThumbsUp } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Award, label: "Premium Materials" },
  { icon: Clock, label: "On-Time Installation" },
  { icon: ThumbsUp, label: "Satisfaction Focused" },
];

export default function TrustBar() {
  return (
    <section className="bg-cream border-y border-cream">
      <div className="container-page py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center sm:justify-start gap-3">
            <Icon className="text-gold shrink-0" size={22} />
            <span className="text-sm font-semibold text-forest">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

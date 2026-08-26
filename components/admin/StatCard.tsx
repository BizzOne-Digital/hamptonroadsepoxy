import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
}

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-cream p-6 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center shrink-0">
        <Icon className="text-forest" size={22} />
      </div>
      <div>
        <p className="text-2xl font-heading text-forest">{value}</p>
        <p className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold mt-1">{label}</p>
      </div>
    </div>
  );
}

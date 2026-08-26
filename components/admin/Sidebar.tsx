"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Images,
  Wrench,
  Quote,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex flex-col h-full bg-forest text-ivory w-64 shrink-0">
      <div className="flex items-center justify-between h-20 px-6 border-b border-ivory/10">
        <Link href="/admin" className="font-heading text-lg">
          HR <span className="text-gold">Epoxy</span>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-ivory/10 text-gold" : "text-ivory/75 hover:bg-ivory/5 hover:text-ivory"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-ivory/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-ivory/75 hover:bg-ivory/5 hover:text-ivory w-full"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
}

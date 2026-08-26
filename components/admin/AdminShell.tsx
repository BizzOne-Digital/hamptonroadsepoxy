"use client";

import { useState, ReactNode } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-ivory">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setOpen(false)} />
          <div className="relative">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-forest text-ivory">
          <span className="font-heading text-lg">HR <span className="text-gold">Epoxy</span> Admin</span>
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-full overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}

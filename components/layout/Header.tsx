"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-cream">
      <div className="container-page flex items-center justify-between h-20">
        <Link href="/" className="flex items-center shrink-0" aria-label="Hampton Roads Epoxy home">
          <Image
            src="/logo.png"
            alt="Hampton Roads Epoxy"
            width={160}
            height={64}
            priority
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal/80 hover:text-forest transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-gold transition-colors"
          >
            <Phone size={16} />
            {siteConfig.phone}
          </a>
          <Link
            href="/booking"
            className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#255cc4] transition-colors shadow-sm"
          >
            Get a Free Quote
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-6 h-0.5 bg-forest" />
          <span className="block w-6 h-0.5 bg-forest" />
          <span className="block w-4 h-0.5 bg-forest" />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  phone: string;
  phoneHref: string;
}

export default function MobileMenu({ open, onClose, phone, phoneHref }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/50 z-50 md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-ivory z-50 md:hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-cream">
              <span className="font-heading text-lg text-forest">Menu</span>
              <button aria-label="Close menu" onClick={onClose} className="p-2">
                <X size={22} className="text-forest" />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-8 gap-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="text-lg font-medium text-charcoal hover:text-forest"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={onClose}
                className="text-lg font-medium text-charcoal hover:text-forest"
              >
                Book a Consultation
              </Link>
            </nav>
            <div className="mt-auto px-6 py-8 border-t border-cream flex flex-col gap-4">
              <a
                href={phoneHref}
                className="flex items-center gap-2 text-base font-semibold text-forest"
              >
                <Phone size={18} />
                {phone}
              </a>
              <Link
                href="/booking"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

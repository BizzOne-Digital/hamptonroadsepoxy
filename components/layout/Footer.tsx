import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-ivory mt-auto">
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-heading text-2xl mb-3">
            Hampton Roads <span className="text-gold">Epoxy</span>
          </h3>
          <p className="text-ivory/70 max-w-sm leading-relaxed">
            Premium metallic, quartz, and classic epoxy flooring for garages,
            homes, and businesses across {siteConfig.serviceArea}.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-ivory/90 hover:text-gold">
              <Phone size={16} /> {siteConfig.phone}
            </a>
            <a href={siteConfig.emailHref} className="flex items-center gap-2 text-ivory/90 hover:text-gold">
              <Mail size={16} /> {siteConfig.email}
            </a>
            <span className="flex items-center gap-2 text-ivory/90">
              <MapPin size={16} /> Serving {siteConfig.serviceArea}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gold mb-4">Services</h4>
          <ul className="flex flex-col gap-3">
            {siteConfig.services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-ivory/80 hover:text-gold text-sm">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gold mb-4">Company</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/about" className="text-ivory/80 hover:text-gold text-sm">About Us</Link></li>
            <li><Link href="/services" className="text-ivory/80 hover:text-gold text-sm">All Services</Link></li>
            <li><Link href="/contact" className="text-ivory/80 hover:text-gold text-sm">Contact</Link></li>
            <li><Link href="/booking" className="text-ivory/80 hover:text-gold text-sm">Book a Consultation</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/60">
          <span>&copy; {year} Hampton Roads Epoxy. All rights reserved.</span>
          <span>Owned &amp; operated by {siteConfig.ownerName}</span>
        </div>
      </div>
    </footer>
  );
}

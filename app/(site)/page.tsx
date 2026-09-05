import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesGrid from "@/components/home/ServicesGrid";
import BeforeAfter from "@/components/home/BeforeAfter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import IndustriesSection from "@/components/home/IndustriesSection";
import ProcessSection from "@/components/home/ProcessSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import LeadCTA from "@/components/home/LeadCTA";
import { siteConfig } from "@/lib/siteConfig";
import { getAllServices } from "@/lib/services";
import { getAllGalleryItems } from "@/lib/gallery";
import { getSiteSettings } from "@/lib/getSiteSettings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium Epoxy Flooring in Hampton Roads, VA",
  description:
    "Hampton Roads Epoxy installs premium metallic, quartz, and classic epoxy flooring for garages, homes, and businesses across Hampton Roads. Get a free quote today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hampton Roads Epoxy | Premium Epoxy Flooring",
    description:
      "Metallic, quartz, and classic epoxy flooring for garages, homes, and businesses across Hampton Roads.",
    url: siteConfig.url,
  },
};

export default async function Home() {
  const services = await getAllServices();
  const galleryItems = await getAllGalleryItems();
  const settings = await getSiteSettings();
  const galleryImages = galleryItems.slice(0, 6).map((item) => ({
    src: item.imageUrl,
    alt: item.title,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: settings.businessName,
    image: `${siteConfig.url}/og-image.jpg`,
    url: siteConfig.url,
    telephone: settings.phone,
    email: settings.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressRegion: "VA",
      addressLocality: settings.address,
      addressCountry: "US",
    },
    areaServed: siteConfig.serviceAreaCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero phone={settings.phone} phoneHref={settings.phoneHref} serviceArea={settings.address} />
      <TrustBar />
      <AboutPreview />
      <ServicesGrid services={services} />
      <BeforeAfter />
      <WhyChooseUs />
      <IndustriesSection />
      <ProcessSection />
      <GalleryPreview images={galleryImages} />
      <Testimonials />
      <LeadCTA />
    </>
  );
}

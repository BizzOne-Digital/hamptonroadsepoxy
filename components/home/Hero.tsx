"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some mobile browsers only honor autoplay when muted is set as a
    // property (not just the HTML attribute) before calling play().
    video.muted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);

  return (
    <section className="relative bg-forest text-ivory overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Luxury garage with a glossy metallic epoxy floor"
          fill
          priority
          className="hidden sm:block object-cover"
          sizes="100vw"
        />
        <video
          ref={videoRef}
          className="sm:hidden absolute inset-0 w-full h-full object-cover"
          src="/hero-mobile.mp4"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster="/hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
      </div>

      <div className="container-page relative py-12 sm:py-32 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold bg-ivory/10 px-4 py-2 rounded-full">
            <ShieldCheck size={14} /> Serving All of {siteConfig.serviceArea}
          </span>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl leading-[1.15] sm:leading-[1.1] mt-4 sm:mt-6">
            Flooring That Turns Your Space Into a Statement
          </h1>

          <p className="hidden sm:block text-ivory/80 text-lg mt-6 max-w-xl leading-relaxed">
            Hampton Roads Epoxy installs premium metallic, quartz, and classic
            epoxy flooring for garages, homes, and businesses — built to
            impress and engineered to last.
          </p>
          <p className="sm:hidden text-ivory/80 text-base mt-3 max-w-xl leading-relaxed">
            Premium metallic, quartz &amp; epoxy flooring — built to impress.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 sm:mt-9">
            <LinkButton href="/booking" variant="primary">
              Get a Free Quote <ArrowRight size={16} />
            </LinkButton>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 text-ivory font-semibold hover:text-gold transition-colors"
            >
              <Phone size={18} /> {siteConfig.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

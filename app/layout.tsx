import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Hampton Roads Epoxy | Premium Epoxy Flooring in Hampton Roads, VA",
    template: "%s | Hampton Roads Epoxy",
  },
  description:
    "Hampton Roads Epoxy installs premium metallic, quartz, and classic epoxy flooring for garages, homes, and businesses across Hampton Roads. Get a free quote today.",
  keywords: [
    "epoxy flooring Hampton Roads",
    "metallic epoxy flooring Virginia",
    "quartz epoxy flooring",
    "garage floor coating Virginia Beach",
    "epoxy contractor Norfolk",
  ],
  openGraph: {
    title: "Hampton Roads Epoxy | Premium Epoxy Flooring",
    description:
      "Metallic, quartz, and classic epoxy flooring for garages, homes, and businesses across Hampton Roads.",
    url: siteConfig.url,
    siteName: "Hampton Roads Epoxy",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1A2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal antialiased font-body">
        {children}
      </body>
    </html>
  );
}

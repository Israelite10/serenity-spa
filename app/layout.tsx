import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://serenity-spa.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Serenity Spa & Wellness — Luxury Massage & Spa Treatments",
    template: "%s | Serenity Spa & Wellness",
  },
  description:
    "Premium massage and wellness treatments designed to restore your body and mind. Book your appointment at Serenity Spa & Wellness today.",
  openGraph: {
    title: "Serenity Spa & Wellness — Luxury Massage & Spa Treatments",
    description:
      "Premium massage and wellness treatments designed to restore your body and mind.",
    url: siteUrl,
    siteName: "Serenity Spa & Wellness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serenity Spa & Wellness",
    description: "Premium wellness treatments designed to restore your body and mind.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: "Serenity Spa & Wellness",
  image: `${siteUrl}/images/og-cover.jpg`,
  telephone: "+19368668505",
  email: "oliviabellaalvaro@gmail.com",
  priceRange: "$$",
  url: siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-ink text-white antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

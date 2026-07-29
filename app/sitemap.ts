import { MetadataRoute } from "next";
import { services } from "@/lib/services-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://serenity-spa.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/booking`, lastModified: new Date(), priority: 0.9 },
    ...services.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}

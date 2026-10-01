import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: absoluteUrl(`/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/mentions-legales"), changeFrequency: "yearly", priority: 0.2 },
  ];
}

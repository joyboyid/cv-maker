import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";
import { seoArticles } from "@/lib/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/panduan`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...seoArticles.map((article) => ({
      url: `${siteUrl}/panduan/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/builder`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/portfolio/builder`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/cover-letter/builder`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...guidePages,
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/donations`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
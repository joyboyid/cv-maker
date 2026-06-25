import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://cv-satu-halaman.vercel.app";

const defaultKeywords = [
  "buat cv online",
  "resume generator",
  "cv ats friendly",
  "cv satu halaman",
  "cover letter generator",
  "portfolio maker",
  "cv fresh graduate",
  "cv indonesia gratis",
];

interface PageSeoOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} — ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${siteUrl}/opengraph-image`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
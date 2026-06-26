import { PanduanPageClient } from "@/components/PanduanPageClient";
import { JsonLd } from "@/components/JsonLd";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import { seoArticles } from "@/lib/seo-content";
import { siteConfig } from "@/lib/site";

const pageDescription =
  "Tips membuat CV ATS-friendly, CV fresh graduate, cover letter, portofolio, dan FAQ lengkap — panduan gratis untuk pelamar kerja Indonesia.";

export const metadata = createPageMetadata({
  title: "Panduan CV & Lamaran Kerja",
  description: pageDescription,
  path: "/panduan",
  keywords: [
    "panduan cv",
    "tips lamaran kerja",
    "cara buat cv",
    "cv ats friendly panduan",
    "surat lamaran kerja",
  ],
});

export default function PanduanPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Panduan CV & Lamaran Kerja",
    description: pageDescription,
    url: `${siteUrl}/panduan`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    hasPart: seoArticles.map((article) => ({
      "@type": "Article",
      name: article.title,
      url: `${siteUrl}/panduan/${article.slug}`,
      description: article.description,
    })),
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <PanduanPageClient />
    </>
  );
}
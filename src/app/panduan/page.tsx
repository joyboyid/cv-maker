import Link from "next/link";
import { BookOpen, FileText } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SeoHubCard } from "@/components/SeoArticleLayout";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import {
  seoArticles,
  seoCategoryLabels,
  type SeoArticle,
} from "@/lib/seo-content";
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

const categories = ["cv", "lamaran", "portofolio", "umum"] as const;

function groupByCategory(): Record<SeoArticle["category"], SeoArticle[]> {
  return categories.reduce(
    (acc, category) => {
      acc[category] = seoArticles.filter((article) => article.category === category);
      return acc;
    },
    {} as Record<SeoArticle["category"], SeoArticle[]>,
  );
}

export default function PanduanPage() {
  const grouped = groupByCategory();

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
    <div className="shell-page-gradient">
      <JsonLd data={collectionJsonLd} />

      <SiteHeader layout="compact" />

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="shell-heading mt-5 text-3xl sm:text-4xl">
            Panduan CV & Lamaran Kerja
          </h1>
          <p className="shell-muted mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            Kumpulan artikel praktis untuk pelamar kerja Indonesia — dari CV
            ATS-friendly sampai cover letter dan portofolio. Gratis, tanpa daftar.
          </p>
        </section>

        {categories.map((category) => {
          const articles = grouped[category];
          if (articles.length === 0) return null;

          return (
            <section key={category} className="mt-12">
              <h2 className="shell-heading text-xl">
                {seoCategoryLabels[category]}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <SeoHubCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/50 p-8 text-center dark:border-blue-900 dark:bg-blue-950/30 sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="shell-heading mt-4 text-xl">
            Sudah baca? Langsung praktik
          </h2>
          <p className="shell-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            Terapkan tips di atas langsung di builder — template modern, skor ATS,
            export PDF, dan multi-draft gratis.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Buat CV sekarang
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
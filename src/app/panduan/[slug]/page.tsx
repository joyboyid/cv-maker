import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { SeoArticleLayout } from "@/components/SeoArticleLayout";
import { createPageMetadata, siteUrl } from "@/lib/seo";
import {
  getSeoArticle,
  seoArticleMap,
  seoArticles,
} from "@/lib/seo-content";
import { siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return seoArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getSeoArticle(slug);

  if (!article) {
    return createPageMetadata({
      title: "Panduan tidak ditemukan",
      description: "Halaman panduan tidak ditemukan.",
      path: `/panduan/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/panduan/${article.slug}`,
    keywords: article.keywords,
  });
}

export default async function PanduanArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getSeoArticle(slug);

  if (!article) {
    notFound();
  }

  const related = article.relatedSlugs
    .map((relatedSlug) => seoArticleMap[relatedSlug])
    .filter(Boolean)
    .slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "id-ID",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/panduan/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  const faqJsonLd =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <SeoArticleLayout article={article} related={related} />
    </>
  );
}
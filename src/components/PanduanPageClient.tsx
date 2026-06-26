"use client";

import Link from "next/link";
import { BookOpen, FileText } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SeoHubCard } from "@/components/SeoArticleLayout";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getGuideCategoryLabel } from "@/lib/site-i18n";
import { seoArticles, type SeoArticle } from "@/lib/seo-content";

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

export function PanduanPageClient() {
  const { locale, t } = useSiteLocale();
  const grouped = groupByCategory();

  return (
    <div className="shell-page-gradient">
      <SiteHeader layout="compact" />

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="shell-heading mt-5 text-3xl sm:text-4xl">
            {t("guides_hub_title")}
          </h1>
          <p className="shell-muted mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            {t("guides_hub_desc")}
          </p>
          {locale === "en" ? (
            <p className="mx-auto mt-3 max-w-xl rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              {t("guides_id_notice")}
            </p>
          ) : null}
        </section>

        {categories.map((category) => {
          const articles = grouped[category];
          if (articles.length === 0) return null;

          return (
            <section key={category} className="mt-12">
              <h2 className="shell-heading text-xl">
                {getGuideCategoryLabel(locale, category)}
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
          <h2 className="shell-heading mt-4 text-xl">{t("guides_practice_title")}</h2>
          <p className="shell-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            {t("guides_practice_desc")}
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {t("home_cta_cv")}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
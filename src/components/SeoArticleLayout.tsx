"use client";

import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getGuideCategoryLabel } from "@/lib/site-i18n";
import type { SeoArticle, SeoArticleBlock } from "@/lib/seo-content";

function ArticleBlock({
  block,
  tipLabel,
}: {
  block: SeoArticleBlock;
  tipLabel: string;
}) {
  if (block.type === "h2" && block.text) {
    return <h2 className="shell-heading mt-8 text-xl first:mt-0">{block.text}</h2>;
  }
  if (block.type === "h3" && block.text) {
    return <h3 className="shell-title mt-6 text-lg">{block.text}</h3>;
  }
  if (block.type === "p" && block.text) {
    return <p className="shell-body mt-4 leading-relaxed">{block.text}</p>;
  }
  if (block.type === "ul" && block.items) {
    return (
      <ul className="shell-body mt-4 list-inside list-disc space-y-2 leading-relaxed">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol" && block.items) {
    return (
      <ol className="shell-body mt-4 list-inside list-decimal space-y-2 leading-relaxed">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }
  if (block.type === "tip" && block.text) {
    return (
      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-sm leading-relaxed text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
        <strong className="font-semibold">{tipLabel} </strong>
        {block.text}
      </div>
    );
  }
  return null;
}

function FaqSection({
  items,
  title,
}: {
  items: SeoArticle["faq"];
  title: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="shell-heading text-xl">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details key={item.question} className="shell-card group">
            <summary className="shell-title cursor-pointer list-none text-sm [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="shell-body mt-3 text-sm leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

interface SeoArticleLayoutProps {
  article: SeoArticle;
  related?: SeoArticle[];
}

export function SeoArticleLayout({ article, related = [] }: SeoArticleLayoutProps) {
  const { locale, t } = useSiteLocale();
  const dateLocale = locale === "en" ? "en-US" : "id-ID";

  return (
    <div className="shell-page-gradient">
      <SiteHeader
        layout="compact"
        maxWidth="3xl"
        backHref="/panduan"
        backLabel={t("guides_back")}
        rightAction={
          <Link
            href={article.cta.href}
            className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:inline-flex"
          >
            {article.cta.label}
          </Link>
        }
      />

      <main className="mx-auto max-w-3xl px-6 pb-20">
        {locale === "en" ? (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {t("guides_id_notice")}
          </p>
        ) : null}

        <article className="shell-card-lg p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-blue-100 px-2.5 py-1 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {getGuideCategoryLabel(locale, article.category)}
            </span>
            <span className="shell-muted inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
            <span className="shell-muted">
              {t("guides_updated")}{" "}
              {new Date(article.updatedAt).toLocaleDateString(dateLocale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="shell-heading mt-4 text-3xl tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          <p className="shell-muted mt-4 text-base leading-relaxed">
            {article.description}
          </p>

          <div className="mt-8 border-t border-[var(--shell-border)] pt-8">
            {article.blocks.map((block, index) => (
              <ArticleBlock
                key={`${block.type}-${index}`}
                block={block}
                tipLabel={t("guides_tip_label")}
              />
            ))}
            <FaqSection items={article.faq} title={t("guides_faq_title")} />
          </div>
        </article>

        <section className="mt-8 rounded-2xl bg-slate-900 px-6 py-8 text-center text-white dark:bg-slate-950 sm:px-10">
          <h2 className="text-lg font-bold">{article.cta.label}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-300">
            {article.cta.description}
          </p>
          <Link
            href={article.cta.href}
            className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {t("common_start_now")}
          </Link>
        </section>

        {related.length > 0 ? (
          <section className="mt-10">
            <h2 className="shell-heading text-lg">{t("guides_read_also")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/panduan/${item.slug}`}
                  className="shell-card transition hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {getGuideCategoryLabel(locale, item.category)}
                  </p>
                  <h3 className="shell-title mt-1 text-sm">{item.title}</h3>
                  <p className="shell-muted mt-2 line-clamp-2 text-xs">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}

interface SeoHubCardProps {
  article: SeoArticle;
}

export function SeoHubCard({ article }: SeoHubCardProps) {
  const { locale, t } = useSiteLocale();

  return (
    <Link
      href={`/panduan/${article.slug}`}
      className="shell-card-lg block p-6 transition hover:border-blue-300 dark:hover:border-blue-700"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {getGuideCategoryLabel(locale, article.category)}
        </span>
        <span className="shell-muted inline-flex items-center gap-1 text-xs">
          <Clock className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>
      <h2 className="shell-title mt-3 text-lg">{article.title}</h2>
      <p className="shell-muted mt-2 text-sm leading-relaxed">{article.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
        <BookOpen className="h-4 w-4" />
        {t("common_read_guide")}
      </span>
    </Link>
  );
}
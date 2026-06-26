"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Download,
  FileSignature,
  FileText,
  Globe2,
  LayoutTemplate,
  Shield,
  Sparkles,
} from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getHomeBenefits,
  getHomeFeatures,
  getHomeSteps,
  getHomeTemplates,
} from "@/lib/site-i18n";

const featureIcons = [FileText, Shield, Globe2, Download];

export function HomePageClient() {
  const { locale, t } = useSiteLocale();
  const features = getHomeFeatures(locale);
  const benefits = getHomeBenefits(locale);
  const steps = getHomeSteps(locale);
  const templates = getHomeTemplates(locale);

  return (
    <div className="shell-page-gradient">
      <SiteHeader layout="marketing" />

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="py-12 text-center sm:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            {t("home_badge")}
          </div>
          <h1 className="shell-heading mx-auto max-w-3xl text-4xl tracking-tight sm:text-5xl">
            {t("home_hero_title")}{" "}
            <span className="text-blue-600">{t("home_hero_highlight")}</span>{" "}
            {t("home_hero_suffix")}
          </h1>
          <p className="shell-muted mx-auto mt-5 max-w-2xl text-lg">
            {t("home_hero_desc")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              {t("home_cta_cv")}
            </Link>
            <Link
              href="/portfolio/builder"
              className="shell-btn-secondary rounded-xl px-6 py-3 text-sm font-semibold"
            >
              <LayoutTemplate className="h-4 w-4 text-violet-600" />
              {t("home_cta_portfolio")}
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                {t("common_new")}
              </p>
              <h2 className="shell-heading mt-2 text-2xl">{t("home_cover_title")}</h2>
              <p className="shell-muted mt-3 max-w-xl text-sm leading-relaxed">
                {t("home_cover_desc")}
              </p>
            </div>
            <Link
              href="/cover-letter/builder"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <FileSignature className="h-4 w-4" />
              {t("home_cover_cta")}
            </Link>
          </div>
        </section>

        <section className="mb-10 mt-10 rounded-3xl border border-violet-100 bg-violet-50/50 p-8 dark:border-violet-900 dark:bg-violet-950/30 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-400">
                {t("common_new")}
              </p>
              <h2 className="shell-heading mt-2 text-2xl">{t("home_portfolio_title")}</h2>
              <p className="shell-muted mt-3 max-w-xl text-sm leading-relaxed">
                {t("home_portfolio_desc")}
              </p>
            </div>
            <Link
              href="/portfolio/builder"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              {t("home_portfolio_cta")}
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = featureIcons[index] ?? FileText;
            return (
              <article key={feature.title} className="shell-card-lg p-5">
                <Icon className="h-6 w-6 text-blue-600" />
                <h3 className="shell-title mt-3">{feature.title}</h3>
                <p className="shell-muted mt-2 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="shell-card-lg mt-16 p-8 sm:p-10">
          <h2 className="shell-heading text-2xl">{t("home_how_title")}</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {index + 1}
                </span>
                <span className="shell-body pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map(({ name, color, desc, gradient = true }) => (
            <div key={name} className="shell-card-lg overflow-hidden">
              <div
                className={`h-40 ${gradient ? `bg-gradient-to-br ${color}` : color}`}
              />
              <div className="p-4">
                <h3 className="shell-title">
                  {t("home_template_prefix")} {name}
                </h3>
                <p className="shell-muted mt-1 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white/80 p-8 dark:border-slate-700 dark:bg-slate-900/40 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {t("home_guides_badge")}
              </p>
              <h2 className="shell-heading mt-2 text-2xl">{t("home_guides_title")}</h2>
              <p className="shell-muted mt-3 max-w-xl text-sm leading-relaxed">
                {t("home_guides_desc")}
              </p>
            </div>
            <Link
              href="/panduan"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <BookOpen className="h-4 w-4 text-blue-600" />
              {t("common_open_guides")}
            </Link>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-blue-100 bg-blue-50/40 p-8 dark:border-blue-900 dark:bg-blue-950/30 sm:p-10">
          <h2 className="shell-heading text-2xl">{t("home_free_title")}</h2>
          <p className="shell-muted mt-3 max-w-2xl">{t("home_free_desc")}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((point) => (
              <li key={point} className="shell-body flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-3xl bg-slate-900 px-8 py-10 text-center text-white dark:bg-slate-950 sm:px-12">
          <h2 className="text-2xl font-bold">{t("home_cta_final_title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            {t("home_cta_final_desc")}
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <CheckCircle2 className="h-4 w-4" />
            {t("nav_build_cv")}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
"use client";

import Link from "next/link";
import { Coffee, Heart, Sparkles } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WalletCard } from "@/components/WalletCard";
import { donationMethods } from "@/lib/donations";
import { getDonationsFreeNote, getDonationsIntro, getDonationsNotes } from "@/lib/site-i18n";

export function DonationsPageClient() {
  const { locale, t } = useSiteLocale();

  return (
    <div className="shell-page-gradient">
      <SiteHeader layout="compact" />

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <Heart className="h-7 w-7" />
          </div>
          <h1 className="shell-heading mt-5 text-3xl sm:text-4xl">
            {t("donations_title")}
          </h1>
          <p className="shell-muted mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            {getDonationsIntro(locale)}
          </p>
        </section>

        <section className="mt-10 space-y-4">
          {donationMethods.map((method) => (
            <WalletCard key={method.id} method={method} />
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-amber-100 bg-amber-50/60 p-6 dark:border-amber-900 dark:bg-amber-950/30 sm:p-8">
          <div className="flex items-start gap-3">
            <Coffee className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
            <div className="space-y-2 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
              <p className="font-medium">{t("donations_note_title")}</p>
              <ul className="list-inside list-disc space-y-1 text-amber-800/90 dark:text-amber-300/90">
                {getDonationsNotes(locale).map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="shell-card-lg mt-10 p-8 text-center sm:p-10">
          <div className="flex items-center justify-center gap-2 text-violet-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("donations_free_title")}</span>
          </div>
          <p className="shell-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            {getDonationsFreeNote(locale)}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t("donations_cta_cv")}
            </Link>
            <Link
              href="/about"
              className="shell-btn-secondary rounded-xl px-6 py-3 text-sm font-semibold"
            >
              {t("footer_about")}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
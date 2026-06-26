"use client";

import Link from "next/link";
import { useSiteLocale } from "@/components/LocaleProvider";

export function SiteFooter() {
  const { t } = useSiteLocale();

  return (
    <footer className="shell-footer py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="shell-title">{t("site_name")}</p>
        <p className="shell-muted mt-1 text-sm">{t("footer_tagline")}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link
            href="/builder"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_build_cv")}
          </Link>
          <Link
            href="/portfolio/builder"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_build_portfolio")}
          </Link>
          <Link
            href="/cover-letter/builder"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_cover_letter")}
          </Link>
          <Link
            href="/panduan"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_guides")}
          </Link>
          <Link
            href="/about"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_about")}
          </Link>
          <Link
            href="/donations"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_donations")}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("footer_contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
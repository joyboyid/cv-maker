"use client";

import { Languages } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";

export function LocaleToggle() {
  const { locale, toggleLocale } = useSiteLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      title={locale === "id" ? "English" : "Indonesia"}
      className="fixed bottom-20 right-5 z-50 inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      <Languages className="h-4 w-4" />
      <span className="uppercase">{locale === "id" ? "EN" : "ID"}</span>
    </button>
  );
}
export type SiteLocale = "id" | "en";

export const LOCALE_STORAGE_KEY = "cv-maker-locale";

export function readStoredLocale(): SiteLocale {
  if (typeof window === "undefined") return "id";
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // ignore
  }
  return "id";
}

export function detectBrowserLocale(): SiteLocale {
  if (typeof navigator === "undefined") return "id";
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "id";
}

export function applyDocumentLocale(locale: SiteLocale): void {
  document.documentElement.lang = locale;
}
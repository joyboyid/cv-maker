"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyDocumentLocale,
  detectBrowserLocale,
  LOCALE_STORAGE_KEY,
  type SiteLocale,
} from "@/lib/site-locale";
import { st, type SiteMessageKey } from "@/lib/site-i18n";

interface LocaleContextValue {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
  toggleLocale: () => void;
  t: (key: SiteMessageKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>("id");

  useEffect(() => {
    let initial: SiteLocale = "id";
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      initial =
        stored === "en" || stored === "id" ? stored : detectBrowserLocale();
    } catch {
      initial = detectBrowserLocale();
    }
    setLocaleState(initial);
    applyDocumentLocale(initial);
  }, []);

  useEffect(() => {
    applyDocumentLocale(locale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  const setLocale = useCallback((next: SiteLocale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === "id" ? "en" : "id"));
  }, []);

  const t = useCallback((key: SiteMessageKey) => st(locale, key), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useSiteLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useSiteLocale must be used within LocaleProvider");
  }
  return context;
}
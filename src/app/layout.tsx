import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import { LocaleToggle } from "@/components/LocaleToggle";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LOCALE_STORAGE_KEY } from "@/lib/site-locale";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { createPageMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://cv-satu-halaman.vercel.app",
  ),
  ...createPageMetadata({
    title: "CV Satu Halaman — Buat Resume ATS-Friendly Gratis",
    description:
      "Buat CV, portofolio, dan cover letter online gratis. Template modern, export PDF, multi-draft, bahasa Indonesia & Inggris. Tanpa daftar.",
    path: "/",
  }),
};

const bootScript = `
(function() {
  try {
    var themeKey = ${JSON.stringify(THEME_STORAGE_KEY)};
    var storedTheme = localStorage.getItem(themeKey);
    var mode = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : 'system';
    var dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';

    var localeKey = ${JSON.stringify(LOCALE_STORAGE_KEY)};
    var storedLocale = localStorage.getItem(localeKey);
    var locale = storedLocale === 'en' || storedLocale === 'id'
      ? storedLocale
      : (navigator.language && navigator.language.toLowerCase().indexOf('en') === 0 ? 'en' : 'id');
    document.documentElement.lang = locale;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-full font-sans">
        <LocaleProvider>
          <ThemeProvider>
            {children}
            <LocaleToggle />
            <ThemeToggle />
            <ServiceWorkerRegister />
          </ThemeProvider>
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
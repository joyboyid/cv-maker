import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="shell-footer py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="shell-title">{siteConfig.name}</p>
        <p className="shell-muted mt-1 text-sm">
          100% gratis untuk siapa saja · Tanpa daftar · Data tersimpan di browser
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link
            href="/builder"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Buat CV
          </Link>
          <Link
            href="/portfolio/builder"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Buat Portofolio
          </Link>
          <Link
            href="/cover-letter/builder"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Cover Letter
          </Link>
          <Link
            href="/panduan"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Panduan
          </Link>
          <Link
            href="/about"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Tentang Boim
          </Link>
          <Link
            href="/donations"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Donasi
          </Link>
          <Link
            href="/contact"
            className="text-sm text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
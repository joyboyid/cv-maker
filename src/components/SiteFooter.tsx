import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-medium text-slate-900">{siteConfig.name}</p>
        <p className="mt-1 text-sm text-slate-500">
          100% gratis untuk siapa saja · Tanpa daftar · Data tersimpan di browser
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link
            href="/about"
            className="text-sm text-blue-600 transition hover:text-blue-700"
          >
            Tentang Boim
          </Link>
          <Link
            href="/donations"
            className="text-sm text-blue-600 transition hover:text-blue-700"
          >
            Donasi
          </Link>
        </div>
      </div>
    </footer>
  );
}
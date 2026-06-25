import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-medium text-slate-900">{siteConfig.name}</p>
        <p className="mt-1 text-sm text-slate-500">
          100% gratis untuk siapa saja · Tanpa daftar · Data tersimpan di browser
        </p>
      </div>
    </footer>
  );
}
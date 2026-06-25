import Link from "next/link";
import { ArrowLeft, Coffee, Heart, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { WalletCard } from "@/components/WalletCard";
import { donationMethods } from "@/lib/donations";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Donasi",
  description:
    "Dukung pengembangan CV Satu Halaman lewat PayPal, Solana, Bitcoin, atau Ethereum.",
  path: "/donations",
});

export default function DonationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50/30">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Beranda
        </Link>
        <Link
          href="/builder"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Buat CV
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <Heart className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Donasi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            CV Satu Halaman tetap 100% gratis untuk semua orang. Kalau tool ini
            membantu kamu, donasi sukarela sangat dihargai buat biaya server
            dan pengembangan fitur ke depan. Terima kasih!
          </p>
        </section>

        <section className="mt-10 space-y-4">
          {donationMethods.map((method) => (
            <WalletCard key={method.id} method={method} />
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-amber-100 bg-amber-50/60 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Coffee className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div className="space-y-2 text-sm leading-relaxed text-amber-900">
              <p className="font-medium">Catatan penting</p>
              <ul className="list-inside list-disc space-y-1 text-amber-800/90">
                <li>
                  Untuk crypto, pastikan jaringan &amp; aset yang dikirim sesuai
                  dengan wallet tujuan.
                </li>
                <li>
                  Kirim hanya ke alamat di halaman ini — donasi tidak bisa
                  dibatalkan.
                </li>
                <li>
                  Tidak ada imbalan khusus; ini murni dukungan sukarela. Makasih
                  ya!
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="flex items-center justify-center gap-2 text-violet-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Tetap gratis untuk semua</span>
          </div>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
            Donasi tidak mengubah akses fitur. Siapa pun tetap bisa buat dan
            unduh CV tanpa batas.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Buat CV gratis
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Tentang Boim
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
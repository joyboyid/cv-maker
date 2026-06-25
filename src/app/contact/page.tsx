import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { ContactCard } from "@/components/ContactCard";
import { SiteFooter } from "@/components/SiteFooter";
import { contactChannels } from "@/lib/contact";

export const metadata = {
  title: "Contact Me — CV Satu Halaman",
  description:
    "Hubungi Boim lewat Telegram @setooo untuk pertanyaan, saran, atau kolaborasi.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50/40">
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Contact Me
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Ada pertanyaan, saran fitur, laporan bug, atau mau ngobrol soal IT?
            Hubungi aku lewat Telegram — biasanya membalas kalau lagi tidak
            sibuk nonton anime, hihihi.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          {contactChannels.map((channel) => (
            <ContactCard key={channel.id} channel={channel} />
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="flex items-center justify-center gap-2 text-sky-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Respon mungkin tidak instan</span>
          </div>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
            Aku handle sendiri, jadi balasan bisa agak lama kalau lagi kerja atau
            tidur. Tapi pesan kamu pasti kubaca!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://t.me/setooo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Chat di Telegram
            </a>
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
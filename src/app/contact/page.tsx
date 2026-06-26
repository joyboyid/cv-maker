import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { ContactCard } from "@/components/ContactCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { contactChannels } from "@/lib/contact";

import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Me",
  description:
    "Hubungi Boim lewat Telegram @setooo untuk pertanyaan, saran, atau kolaborasi.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="shell-page-gradient">
      <SiteHeader layout="compact" />

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h1 className="shell-heading mt-5 text-3xl sm:text-4xl">
            Contact Me
          </h1>
          <p className="shell-muted mx-auto mt-4 max-w-2xl text-base leading-relaxed">
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

        <section className="shell-card-lg mt-10 p-8 text-center sm:p-10">
          <div className="flex items-center justify-center gap-2 text-sky-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Respon mungkin tidak instan</span>
          </div>
          <p className="shell-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed">
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
              className="shell-btn-secondary rounded-xl px-6 py-3 text-sm font-semibold"
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
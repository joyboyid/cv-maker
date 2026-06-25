import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clapperboard,
  FileText,
  Shield,
  Sparkles,
  Tv,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { createPageMetadata } from "@/lib/seo";

const interests = [
  {
    icon: Shield,
    title: "Keamanan siber",
    description:
      "Suka eksplorasi dunia cybersecurity — kadang latihan di pwn.college.",
  },
  {
    icon: Tv,
    title: "Drama, film & anime",
    description:
      "Hobi ngisi waktu luang dengan nonton drama, film, dan anime favorit.",
  },
  {
    icon: Clapperboard,
    title: "IT & infrastruktur",
    description:
      "Passion di bidang IT, dari support harian sampai hal-hal teknis di balik layar.",
  },
];

export const metadata = createPageMetadata({
  title: "Tentang Boim",
  description:
    "Kenalan dengan Boim, pembuat CV Satu Halaman — pecinta IT, keamanan siber, dan anime.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
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
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-blue-600 to-slate-800 px-8 py-10 text-white sm:px-12">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-white/30 shadow-xl">
                <Image
                  src="/boim-avatar.jpg"
                  alt="Boim — pembuat CV Satu Halaman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-100">
                  Tentang pembuat
                </p>
                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Boim</h1>
                <p className="mt-2 text-blue-100">IT Support · Pecinta IT & keamanan</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-8 py-10 sm:px-12">
            <div className="flex items-center gap-2 text-blue-600">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Halo, kenalan yuk!</span>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Aku adalah <strong className="text-slate-900">Boim</strong>, orang
                yang sangat suka bidang IT dan sangat menyukai tentang keamanan.
                Dunia teknologi dan cybersecurity selalu menarik buatku — dari
                troubleshooting sehari-hari sampai eksplorasi hal-hal di balik
                sistem.
              </p>
              <p>
                Kadang aku menghabiskan waktu dengan menonton drama, film, dan
                anime. Di sela-sela itu, aku juga kadang menyendiri belajar di{" "}
                <a
                  href="https://pwn.college"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-700"
                >
                  pwn.college
                </a>
                — tempat yang seru buat asah skill keamanan siber.
              </p>
              <p>
                Btw, aku sekarang kerja sebagai{" "}
                <strong className="text-slate-900">IT Support</strong> di salah
                satu ISP di Indonesia, hihihi. Terima kasih sudah mampir dan
                pakai tool ini!
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {interests.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <item.icon className="h-6 w-6 text-blue-600" />
              <h2 className="mt-3 font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-blue-100 bg-blue-50/50 p-8 text-center sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            CV Satu Halaman
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
            Tool ini kubuat supaya siapa pun bisa bikin CV profesional satu
            halaman dengan mudah — gratis, tanpa daftar, dan data tetap di
            browser kamu.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Coba buat CV sekarang
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
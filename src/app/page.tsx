import Link from "next/link";
import {
  CheckCircle2,
  Download,
  FileText,
  Globe2,
  Shield,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

const features = [
  {
    icon: FileText,
    title: "Satu halaman, fokus",
    description:
      "Dirancang untuk CV one-pager — tidak kepanjangan, langsung ke inti.",
  },
  {
    icon: Shield,
    title: "ATS-friendly",
    description:
      "Layout bersih, font standar, tanpa elemen yang mengganggu parsing recruiter tools.",
  },
  {
    icon: Globe2,
    title: "Bahasa Indonesia & Inggris",
    description:
      "Label section dan export bisa ID atau EN — cocok untuk lamaran lokal maupun remote.",
  },
  {
    icon: Download,
    title: "Export PDF instan",
    description:
      "Isi form, lihat preview langsung, unduh PDF tanpa perlu daftar akun.",
  },
];

const benefits = [
  "Tanpa biaya — dipakai sebanyak yang kamu mau",
  "Tanpa watermark pada file PDF",
  "Data CV tetap di browser kamu, tidak diupload ke server",
  "Cocok untuk fresh graduate, magang, dan profesional",
];

const steps = [
  "Isi profil, pengalaman, pendidikan, dan keahlian",
  "Pilih template Modern, Minimal, atau Classic",
  "Cek skor satu halaman & sesuaikan panjang konten",
  "Unduh PDF dan kirim lamaran",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-slate-900">CV Satu Halaman</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Tentang
          </Link>
          <Link
            href="/donations"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Donasi
          </Link>
          <Link
            href="/builder"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Buat CV
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="py-12 text-center sm:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            100% Gratis · Tanpa daftar · Data di browser
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Buat CV profesional{" "}
            <span className="text-blue-600">satu halaman</span> dalam 5 menit
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Tool pembuatan resume untuk pelamar kerja di Indonesia. Format
            ATS-friendly, preview langsung, export PDF — gratis untuk semua orang.
          </p>
          <div className="mt-8">
            <Link
              href="/builder"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Buat CV Sekarang
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <feature.icon className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Cara pakai</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Modern", color: "from-blue-600 to-blue-800", desc: "Sidebar berwarna — tech & kreatif." },
            { name: "Minimal", color: "bg-slate-100", desc: "Bersih & netral — semua industri.", gradient: false },
            { name: "Classic", color: "bg-amber-50", desc: "Formal serif — korporat & pemerintah.", gradient: false },
            { name: "Academic", color: "from-slate-700 to-slate-900", desc: "Fokus riset, publikasi, pendidikan." },
            { name: "Creative", color: "from-fuchsia-500 to-orange-500", desc: "Bold & colorful — desain & media." },
            { name: "Executive", color: "from-slate-800 to-slate-600", desc: "Timeline — manajemen & leadership." },
          ].map(({ name, color, desc, gradient = true }) => (
            <div
              key={name}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div
                className={`h-40 ${gradient ? `bg-gradient-to-br ${color}` : color}`}
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">Template {name}</h3>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-blue-100 bg-blue-50/40 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Gratis untuk semua orang
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Tidak ada langganan, tidak ada batasan fitur, tidak ada watermark.
            Siapa pun bisa membuat dan mengunduh CV tanpa biaya.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {benefits.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-3xl bg-slate-900 px-8 py-10 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold">Siap kirim lamaran?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Data CV disimpan otomatis di browser kamu. Privasi terjaga — tidak
            perlu upload ke server.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <CheckCircle2 className="h-4 w-4" />
            Buat CV
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
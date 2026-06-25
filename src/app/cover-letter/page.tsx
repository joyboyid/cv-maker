"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileSignature, PenLine } from "lucide-react";
import { CoverLetterPreview } from "@/components/cover-letter/CoverLetterPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { decodeCoverLetterState } from "@/lib/share-cover-letter";
import type { CoverLetterState } from "@/types/cover-letter";

export default function SharedCoverLetterPage() {
  const [state, setState] = useState<CoverLetterState | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("d");

    if (!encoded) {
      setError(true);
      return;
    }

    const decoded = decodeCoverLetterState(encoded);
    if (!decoded) {
      setError(true);
      return;
    }

    setState(decoded);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <FileSignature className="h-10 w-10 text-slate-400" />
        <h1 className="mt-4 text-xl font-semibold text-slate-900">
          Cover letter tidak ditemukan
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          Link tidak valid atau sudah rusak. Minta pengirim untuk membagikan
          link baru dari builder cover letter.
        </p>
        <Link
          href="/cover-letter/builder"
          className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Buat cover letter sendiri
        </Link>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Memuat cover letter...
      </div>
    );
  }

  const name = state.data.sender.fullName || "Cover Letter";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Cover Letter Bersama
            </p>
            <h1 className="text-lg font-semibold text-slate-900">{name}</h1>
          </div>
          <Link
            href="/cover-letter/builder"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <PenLine className="h-4 w-4" />
            Buat cover letter
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <CoverLetterPreview data={state.data} settings={state.settings} />
        <p className="mt-4 text-center text-xs text-slate-400">
          Tampilan read-only · Dibuat dengan CV Satu Halaman
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
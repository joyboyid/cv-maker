"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileSignature, PenLine } from "lucide-react";
import { CoverLetterPreview } from "@/components/cover-letter/CoverLetterPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
      <div className="shell-loading flex-col px-6 text-center">
        <FileSignature className="shell-muted h-10 w-10" />
        <h1 className="shell-title mt-4 text-xl">
          Cover letter tidak ditemukan
        </h1>
        <p className="shell-body mt-2 max-w-md text-sm">
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
      <div className="shell-loading">
        Memuat cover letter...
      </div>
    );
  }

  const name = state.data.sender.fullName || "Cover Letter";

  return (
    <div className="shell-page">
      <SiteHeader
        layout="share"
        maxWidth="4xl"
        activeToolId="cover-letter"
        shareMeta={{ label: "Cover Letter Bersama", title: name }}
        rightAction={
          <Link
            href="/cover-letter/builder"
            className="shell-btn-secondary text-sm"
          >
            <PenLine className="h-4 w-4" />
            Buat cover letter
          </Link>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <CoverLetterPreview data={state.data} settings={state.settings} />
        <p className="shell-muted mt-4 text-center text-xs">
          Tampilan read-only · Dibuat dengan CV Satu Halaman
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
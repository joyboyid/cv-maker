"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, PenLine } from "lucide-react";
import { ResumePreview } from "@/components/ResumePreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { decodeShareState } from "@/lib/share-resume";
import { defaultResumeState } from "@/lib/resume-defaults";
import type { ResumeState } from "@/types/resume";

export default function SharedCvPage() {
  const [state, setState] = useState<ResumeState | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("d");

    if (!encoded) {
      setError(true);
      return;
    }

    const decoded = decodeShareState(encoded);
    if (!decoded) {
      setError(true);
      return;
    }

    setState(decoded);
  }, []);

  if (error) {
    return (
      <div className="shell-loading flex-col px-6 text-center">
        <FileText className="shell-muted h-10 w-10" />
        <h1 className="shell-title mt-4 text-xl">
          CV tidak ditemukan
        </h1>
        <p className="shell-body mt-2 max-w-md text-sm">
          Link tidak valid atau sudah rusak. Minta pengirim untuk membagikan
          link baru dari builder.
        </p>
        <Link
          href="/builder"
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Buat CV sendiri
        </Link>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="shell-loading">
        Memuat CV...
      </div>
    );
  }

  const name = state.data.personal.fullName || "CV";

  return (
    <div className="shell-page">
      <SiteHeader
        layout="share"
        maxWidth="4xl"
        activeToolId="cv"
        shareMeta={{ label: "CV Bersama", title: name }}
        rightAction={
          <Link href="/builder" className="shell-btn-secondary text-sm">
            <PenLine className="h-4 w-4" />
            Buat CV sendiri
          </Link>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <ResumePreview data={state.data} settings={state.settings} />
        <p className="mt-4 text-center text-xs text-slate-400">
          Tampilan read-only · Dibuat dengan CV Satu Halaman
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
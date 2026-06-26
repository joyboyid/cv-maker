"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileSignature, PenLine } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { CoverLetterPreview } from "@/components/cover-letter/CoverLetterPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { decodeCoverLetterState } from "@/lib/share-cover-letter";
import type { CoverLetterState } from "@/types/cover-letter";

export default function SharedCoverLetterPage() {
  const { t } = useSiteLocale();
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
        <h1 className="shell-title mt-4 text-xl">{t("share_not_found_cover")}</h1>
        <p className="shell-body mt-2 max-w-md text-sm">
          {t("share_not_found_cover_desc")}
        </p>
        <Link
          href="/cover-letter/builder"
          className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          {t("share_create_cover")}
        </Link>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="shell-loading">{t("share_loading_cover")}</div>
    );
  }

  const name = state.data.sender.fullName || "Cover Letter";

  return (
    <div className="shell-page">
      <SiteHeader
        layout="share"
        maxWidth="4xl"
        activeToolId="cover-letter"
        shareMeta={{ label: t("share_cover_label"), title: name }}
        rightAction={
          <Link
            href="/cover-letter/builder"
            className="shell-btn-secondary text-sm"
          >
            <PenLine className="h-4 w-4" />
            {t("share_create_cover")}
          </Link>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <CoverLetterPreview data={state.data} settings={state.settings} />
        <p className="shell-muted mt-4 text-center text-xs">
          {t("share_readonly_cv")}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
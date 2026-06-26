"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, PenLine } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { ResumePreview } from "@/components/ResumePreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { decodeShareState } from "@/lib/share-resume";
import { defaultResumeState } from "@/lib/resume-defaults";
import type { ResumeState } from "@/types/resume";

export default function SharedCvPage() {
  const { t } = useSiteLocale();
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
        <h1 className="shell-title mt-4 text-xl">{t("share_not_found_cv")}</h1>
        <p className="shell-body mt-2 max-w-md text-sm">
          {t("share_not_found_cv_desc")}
        </p>
        <Link
          href="/builder"
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          {t("share_create_cv")}
        </Link>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="shell-loading">{t("share_loading_cv")}</div>
    );
  }

  const name = state.data.personal.fullName || "CV";

  return (
    <div className="shell-page">
      <SiteHeader
        layout="share"
        maxWidth="4xl"
        activeToolId="cv"
        shareMeta={{ label: t("share_cv_label"), title: name }}
        rightAction={
          <Link href="/builder" className="shell-btn-secondary text-sm">
            <PenLine className="h-4 w-4" />
            {t("share_create_cv")}
          </Link>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <ResumePreview data={state.data} settings={state.settings} />
        <p className="shell-muted mt-4 text-center text-xs">
          {t("share_readonly_cv")}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
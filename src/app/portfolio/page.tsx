"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutTemplate, PenLine } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { decodePortfolioState } from "@/lib/share-portfolio";
import type { PortfolioState } from "@/types/portfolio";

export default function SharedPortfolioPage() {
  const { t } = useSiteLocale();
  const [state, setState] = useState<PortfolioState | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("d");

    if (!encoded) {
      setError(true);
      return;
    }

    const decoded = decodePortfolioState(encoded);
    if (!decoded) {
      setError(true);
      return;
    }

    setState(decoded);
  }, []);

  if (error) {
    return (
      <div className="shell-loading flex-col px-6 text-center">
        <LayoutTemplate className="shell-muted h-10 w-10" />
        <h1 className="shell-title mt-4 text-xl">{t("share_not_found_portfolio")}</h1>
        <p className="shell-body mt-2 max-w-md text-sm">
          {t("share_not_found_portfolio_desc")}
        </p>
        <Link
          href="/portfolio/builder"
          className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          {t("share_create_portfolio")}
        </Link>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="shell-loading">{t("share_loading_portfolio")}</div>
    );
  }

  const name = state.data.profile.fullName || "Portofolio";

  return (
    <div className="shell-page">
      <SiteHeader
        layout="share"
        maxWidth="4xl"
        activeToolId="portfolio"
        shareMeta={{ label: t("share_portfolio_label"), title: name }}
        rightAction={
          <Link href="/portfolio/builder" className="shell-btn-secondary text-sm">
            <PenLine className="h-4 w-4" />
            {t("share_create_portfolio")}
          </Link>
        }
      />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <PortfolioPreview data={state.data} settings={state.settings} />
        <p className="shell-muted mt-4 text-center text-xs">
          {t("share_readonly_cv")}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
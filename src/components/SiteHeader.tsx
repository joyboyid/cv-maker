"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { ToolsMenu } from "@/components/ToolsMenu";

type SiteHeaderLayout = "marketing" | "compact" | "builder" | "share";

interface SiteHeaderProps {
  layout?: SiteHeaderLayout;
  sticky?: boolean;
  maxWidth?: "3xl" | "4xl" | "6xl" | "full";
  activeToolId?: "cv" | "portfolio" | "cover-letter";
  backHref?: string;
  backLabel?: string;
  brand?: React.ReactNode;
  shareMeta?: { label: string; title: string };
  actions?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const maxWidthClass: Record<NonNullable<SiteHeaderProps["maxWidth"]>, string> = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  full: "max-w-[1600px]",
};

export function SiteHeader({
  layout = "marketing",
  sticky = false,
  maxWidth = layout === "marketing" ? "6xl" : layout === "builder" ? "full" : "4xl",
  activeToolId,
  backHref = "/",
  backLabel,
  brand,
  shareMeta,
  actions,
  rightAction,
}: SiteHeaderProps) {
  const { t } = useSiteLocale();
  const resolvedBackLabel = backLabel ?? t("nav_home");

  const shellClass = sticky
    ? "shell-header"
    : layout === "share"
      ? "shell-header-static"
      : "";

  const inner = (
    <div
      className={`mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${
        layout === "builder" ? "flex-wrap" : ""
      } ${maxWidthClass[maxWidth]}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {layout === "marketing" ? (
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <span className="shell-heading text-lg">{t("site_name")}</span>
          </Link>
        ) : null}

        {layout === "compact" || layout === "builder" ? (
          <>
            <Link
              href={backHref}
              className="shell-link inline-flex shrink-0 items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{resolvedBackLabel}</span>
            </Link>
            {layout === "builder" && brand ? (
              <>
                <div className="shell-divider hidden sm:block" />
                {brand}
              </>
            ) : null}
          </>
        ) : null}

        {layout === "share" && shareMeta ? (
          <div className="min-w-0">
            <p className="shell-muted text-xs font-medium uppercase tracking-wide">
              {shareMeta.label}
            </p>
            <h1 className="shell-title truncate text-lg">{shareMeta.title}</h1>
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
        {layout === "marketing" ? (
          <nav className="hidden items-center gap-3 md:flex">
            <Link href="/panduan" className="shell-link font-medium">
              {t("nav_guides")}
            </Link>
            <Link href="/about" className="shell-link font-medium">
              {t("nav_about")}
            </Link>
            <Link href="/donations" className="shell-link font-medium">
              {t("nav_donations")}
            </Link>
            <Link href="/contact" className="shell-link font-medium">
              {t("nav_contact")}
            </Link>
          </nav>
        ) : null}

        <ToolsMenu activeToolId={activeToolId} />

        {rightAction}

        {actions}
      </div>
    </div>
  );

  if (shellClass) {
    return <header className={shellClass}>{inner}</header>;
  }

  return <header className="w-full">{inner}</header>;
}
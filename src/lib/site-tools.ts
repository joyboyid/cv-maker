import {
  FileSignature,
  FileText,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";
import { st } from "@/lib/site-i18n";
import type { SiteLocale } from "@/lib/site-locale";

export type SiteToolId = "cv" | "portfolio" | "cover-letter";

export interface SiteTool {
  id: SiteToolId;
  label: string;
  shortLabel: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accentClass: string;
  activeBgClass: string;
}

const toolMeta = [
  {
    id: "cv" as const,
    href: "/builder",
    icon: FileText,
    accentClass: "text-blue-600",
    activeBgClass: "bg-blue-50 dark:bg-blue-950/40",
    labelKey: "tool_cv_label" as const,
    shortKey: "tool_cv_short" as const,
    descKey: "tool_cv_desc" as const,
  },
  {
    id: "portfolio" as const,
    href: "/portfolio/builder",
    icon: LayoutTemplate,
    accentClass: "text-violet-600",
    activeBgClass: "bg-violet-50 dark:bg-violet-950/40",
    labelKey: "tool_portfolio_label" as const,
    shortKey: "tool_portfolio_short" as const,
    descKey: "tool_portfolio_desc" as const,
  },
  {
    id: "cover-letter" as const,
    href: "/cover-letter/builder",
    icon: FileSignature,
    accentClass: "text-emerald-600",
    activeBgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    labelKey: "tool_cover_label" as const,
    shortKey: "tool_cover_short" as const,
    descKey: "tool_cover_desc" as const,
  },
];

export function getSiteTools(locale: SiteLocale): SiteTool[] {
  return toolMeta.map((tool) => ({
    id: tool.id,
    href: tool.href,
    icon: tool.icon,
    accentClass: tool.accentClass,
    activeBgClass: tool.activeBgClass,
    label: st(locale, tool.labelKey),
    shortLabel: st(locale, tool.shortKey),
    description: st(locale, tool.descKey),
  }));
}

export function getActiveToolId(pathname: string): SiteToolId | undefined {
  if (pathname.startsWith("/portfolio/builder") || pathname === "/portfolio") {
    return "portfolio";
  }
  if (
    pathname.startsWith("/cover-letter/builder") ||
    pathname === "/cover-letter"
  ) {
    return "cover-letter";
  }
  if (pathname.startsWith("/builder") || pathname === "/cv") {
    return "cv";
  }
  return undefined;
}
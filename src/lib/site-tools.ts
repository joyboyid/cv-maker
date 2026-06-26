import {
  FileSignature,
  FileText,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";

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

export const siteTools: SiteTool[] = [
  {
    id: "cv",
    label: "CV Satu Halaman",
    shortLabel: "CV",
    description: "Resume ATS-friendly, skor ATS, export PDF",
    href: "/builder",
    icon: FileText,
    accentClass: "text-blue-600",
    activeBgClass: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    id: "portfolio",
    label: "Portofolio",
    shortLabel: "Portofolio",
    description: "Halaman proyek & skill, share link",
    href: "/portfolio/builder",
    icon: LayoutTemplate,
    accentClass: "text-violet-600",
    activeBgClass: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    shortLabel: "Cover Letter",
    description: "Surat lamaran, generate dari CV",
    href: "/cover-letter/builder",
    icon: FileSignature,
    accentClass: "text-emerald-600",
    activeBgClass: "bg-emerald-50 dark:bg-emerald-950/40",
  },
];

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
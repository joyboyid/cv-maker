import { defaultResumeState } from "@/lib/resume-defaults";
import type { PaperSize, ResumeSettings } from "@/types/resume";

const TEMPLATES = [
  "modern",
  "minimal",
  "classic",
  "academic",
  "creative",
  "executive",
] as const;

const PAPER_SIZES: PaperSize[] = ["a4", "letter", "legal", "folio"];

export function normalizeResumeSettings(
  raw?: Partial<ResumeSettings>,
): ResumeSettings {
  const source = raw ?? {};

  const template = source.template ?? defaultResumeState.settings.template;
  const paperSize = source.paperSize ?? defaultResumeState.settings.paperSize;

  return {
    template: TEMPLATES.includes(template as (typeof TEMPLATES)[number])
      ? (template as ResumeSettings["template"])
      : defaultResumeState.settings.template,
    language: source.language === "en" ? "en" : "id",
    accentColor:
      typeof source.accentColor === "string" && source.accentColor
        ? source.accentColor
        : defaultResumeState.settings.accentColor,
    paperSize: PAPER_SIZES.includes(paperSize as PaperSize)
      ? (paperSize as PaperSize)
      : defaultResumeState.settings.paperSize,
  };
}
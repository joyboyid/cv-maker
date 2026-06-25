import { defaultCoverLetterSettings } from "@/lib/cover-letter-defaults";
import type {
  CoverLetterContent,
  CoverLetterData,
  CoverLetterRecipient,
  CoverLetterSender,
  CoverLetterSettings,
  CoverLetterState,
  CoverLetterTemplateId,
} from "@/types/cover-letter";
import type { Language, PaperSize } from "@/types/resume";

const PAPER_SIZES: PaperSize[] = ["a4", "letter", "legal", "folio"];
const TEMPLATES: CoverLetterTemplateId[] = ["formal", "startup", "academic"];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeSender(sender: unknown): CoverLetterSender {
  const source =
    sender && typeof sender === "object" ? (sender as Partial<CoverLetterSender>) : {};

  return {
    fullName: asString(source.fullName),
    email: asString(source.email),
    phone: asString(source.phone),
    location: asString(source.location),
    linkedin: asString(source.linkedin),
    website: asString(source.website),
  };
}

function normalizeRecipient(recipient: unknown): CoverLetterRecipient {
  const source =
    recipient && typeof recipient === "object"
      ? (recipient as Partial<CoverLetterRecipient>)
      : {};

  return {
    hiringManagerName: asString(source.hiringManagerName),
    companyName: asString(source.companyName),
    companyAddress: asString(source.companyAddress),
    position: asString(source.position),
  };
}

function normalizeContent(content: unknown): CoverLetterContent {
  const source =
    content && typeof content === "object"
      ? (content as Partial<CoverLetterContent>)
      : {};

  return {
    date: asString(source.date),
    greeting: asString(source.greeting),
    opening: asString(source.opening),
    body: asString(source.body),
    closing: asString(source.closing),
    signature: asString(source.signature),
  };
}

export function mergeCoverLetterData(source: Partial<CoverLetterData> | unknown): CoverLetterData {
  const input =
    source && typeof source === "object" ? (source as Partial<CoverLetterData>) : {};

  return {
    sender: normalizeSender(input.sender),
    recipient: normalizeRecipient(input.recipient),
    content: normalizeContent(input.content),
  };
}

export function normalizeCoverLetterSettings(
  settings: Partial<CoverLetterSettings> | unknown,
): CoverLetterSettings {
  const source =
    settings && typeof settings === "object"
      ? (settings as Partial<CoverLetterSettings>)
      : {};

  return {
    template: TEMPLATES.includes(source.template as CoverLetterTemplateId)
      ? (source.template as CoverLetterTemplateId)
      : defaultCoverLetterSettings.template,
    language:
      source.language === "en" || source.language === "id"
        ? source.language
        : defaultCoverLetterSettings.language,
    paperSize: PAPER_SIZES.includes(source.paperSize as PaperSize)
      ? (source.paperSize as PaperSize)
      : defaultCoverLetterSettings.paperSize,
  };
}

export function mergeCoverLetterState(
  source: Partial<CoverLetterState> | unknown,
): CoverLetterState {
  const input =
    source && typeof source === "object" ? (source as Partial<CoverLetterState>) : {};

  return {
    data: mergeCoverLetterData(input.data),
    settings: normalizeCoverLetterSettings(input.settings),
  };
}
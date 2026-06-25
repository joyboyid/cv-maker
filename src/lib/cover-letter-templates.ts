import type { CoverLetterTemplateId } from "@/types/cover-letter";

export const COVER_LETTER_TEMPLATE_OPTIONS: {
  id: CoverLetterTemplateId;
  label: string;
  hint: string;
}[] = [
  {
    id: "formal",
    label: "Formal",
    hint: "Klasik serif — korporat, bank, pemerintah",
  },
  {
    id: "startup",
    label: "Startup",
    hint: "Modern sans-serif — tech & produk digital",
  },
  {
    id: "academic",
    label: "Academic",
    hint: "Terstruktur — riset, kampus, institusi",
  },
];
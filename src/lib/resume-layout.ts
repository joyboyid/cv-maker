import type { PaperSize } from "@/types/resume";

const DPI = 96;
const MM_TO_PX = DPI / 25.4;

export interface PaperDimensions {
  id: PaperSize;
  label: string;
  labelId: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  pdfFormat: string | [number, number];
}

export interface DynamicPageLayout {
  widthPx: number;
  heightPx: number;
  widthMm: number;
  heightMm: number;
  contentScale: number;
  naturalContentHeight: number;
  isCompressed: boolean;
}

export const PAPER_SIZES: Record<PaperSize, PaperDimensions> = {
  a4: {
    id: "a4",
    label: "A4",
    labelId: "A4 (210 × 297 mm)",
    widthMm: 210,
    heightMm: 297,
    widthPx: Math.round(210 * MM_TO_PX),
    heightPx: Math.round(297 * MM_TO_PX),
    pdfFormat: "a4",
  },
  letter: {
    id: "letter",
    label: "Letter",
    labelId: "Letter (216 × 279 mm)",
    widthMm: 215.9,
    heightMm: 279.4,
    widthPx: Math.round(8.5 * DPI),
    heightPx: Math.round(11 * DPI),
    pdfFormat: "letter",
  },
  legal: {
    id: "legal",
    label: "Legal",
    labelId: "Legal (216 × 356 mm)",
    widthMm: 215.9,
    heightMm: 355.6,
    widthPx: Math.round(8.5 * DPI),
    heightPx: Math.round(14 * DPI),
    pdfFormat: "legal",
  },
  folio: {
    id: "folio",
    label: "Folio",
    labelId: "Folio (210 × 330 mm)",
    widthMm: 210,
    heightMm: 330,
    widthPx: Math.round(210 * MM_TO_PX),
    heightPx: Math.round(330 * MM_TO_PX),
    pdfFormat: [210, 330],
  },
};

export const PAPER_SIZE_OPTIONS = Object.values(PAPER_SIZES);

/** @deprecated gunakan getPaperDimensions('a4') */
export const A4_WIDTH_PX = PAPER_SIZES.a4.widthPx;
/** @deprecated gunakan getPaperDimensions('a4') */
export const A4_HEIGHT_PX = PAPER_SIZES.a4.heightPx;

export function getPaperDimensions(paperSize: PaperSize = "a4"): PaperDimensions {
  return PAPER_SIZES[paperSize] ?? PAPER_SIZES.a4;
}

export function pxToMm(px: number): number {
  return (px * 25.4) / DPI;
}

/**
 * Hitung layout 1 halaman: tinggi kertas mengikuti konten.
 * Hanya mengecilkan (scale) jika konten melebihi tinggi maksimum format.
 */
export function computeDynamicPageLayout(
  naturalContentHeight: number,
  paperSize: PaperSize = "a4",
): DynamicPageLayout {
  const paper = getPaperDimensions(paperSize);

  if (naturalContentHeight <= 0) {
    return {
      widthPx: paper.widthPx,
      heightPx: paper.heightPx,
      widthMm: paper.widthMm,
      heightMm: paper.heightMm,
      contentScale: 1,
      naturalContentHeight: 0,
      isCompressed: false,
    };
  }

  if (naturalContentHeight <= paper.heightPx) {
    const heightPx = naturalContentHeight;
    return {
      widthPx: paper.widthPx,
      heightPx,
      widthMm: paper.widthMm,
      heightMm: pxToMm(heightPx),
      contentScale: 1,
      naturalContentHeight,
      isCompressed: false,
    };
  }

  return {
    widthPx: paper.widthPx,
    heightPx: paper.heightPx,
    widthMm: paper.widthMm,
    heightMm: paper.heightMm,
    contentScale: paper.heightPx / naturalContentHeight,
    naturalContentHeight,
    isCompressed: true,
  };
}

export function buildPdfFilename(fullName: string): string {
  const slug = fullName.trim().replace(/\s+/g, "-").toLowerCase() || "resume";
  return `${slug}-cv.pdf`;
}
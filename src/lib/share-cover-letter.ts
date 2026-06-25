import LZString from "lz-string";

import { mergeCoverLetterState } from "@/lib/sanitize-cover-letter";
import type { CoverLetterState } from "@/types/cover-letter";

export function encodeCoverLetterState(state: CoverLetterState): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(state));
}

export function decodeCoverLetterState(encoded: string): CoverLetterState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return mergeCoverLetterState(JSON.parse(json) as Partial<CoverLetterState>);
  } catch {
    return null;
  }
}

export function buildCoverLetterShareUrl(state: CoverLetterState): string {
  const encoded = encodeCoverLetterState(state);
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/cover-letter?d=${encoded}`;
}
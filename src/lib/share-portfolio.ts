import LZString from "lz-string";

import { mergePortfolioState } from "@/lib/sanitize-portfolio";
import type { PortfolioState } from "@/types/portfolio";

export function encodePortfolioState(state: PortfolioState): string {
  const payload = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(payload);
}

export function decodePortfolioState(encoded: string): PortfolioState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;

    const parsed = JSON.parse(json) as Partial<PortfolioState>;
    return mergePortfolioState(parsed);
  } catch {
    return null;
  }
}

export function buildPortfolioShareUrl(state: PortfolioState): string {
  const encoded = encodePortfolioState(state);
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/portfolio?d=${encoded}`;
}
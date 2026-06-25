import LZString from "lz-string";

import { mergeResumeState } from "@/lib/sanitize-resume";
import { normalizeResumeSettings } from "@/lib/settings-utils";
import type { ResumeState } from "@/types/resume";

export function encodeShareState(state: ResumeState): string {
  const payload = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(payload);
}

export function decodeShareState(encoded: string): ResumeState | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;

    const parsed = JSON.parse(json) as Partial<ResumeState>;
    return {
      data: mergeResumeState(parsed),
      settings: normalizeResumeSettings(parsed.settings),
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(state: ResumeState): string {
  const encoded = encodeShareState(state);
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/cv?d=${encoded}`;
}
import { defaultCoverLetterState } from "@/lib/cover-letter-defaults";
import { mergeCoverLetterState } from "@/lib/sanitize-cover-letter";
import type { CoverLetterState } from "@/types/cover-letter";

const STORAGE_KEY = "cover-letter-state-v1";

export function loadCoverLetterState(): CoverLetterState {
  if (typeof window === "undefined") {
    return defaultCoverLetterState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCoverLetterState;

    const parsed = JSON.parse(raw) as Partial<CoverLetterState>;
    return mergeCoverLetterState(parsed);
  } catch {
    return defaultCoverLetterState;
  }
}

export function saveCoverLetterState(state: CoverLetterState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearCoverLetterState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
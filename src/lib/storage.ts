import { defaultResumeState } from "@/lib/resume-defaults";
import { mergeResumeState } from "@/lib/sanitize-resume";
import { normalizeResumeSettings } from "@/lib/settings-utils";
import type { ResumeState } from "@/types/resume";

const STORAGE_KEY = "cv-maker-state-v2";

export function loadResumeState(): ResumeState {
  if (typeof window === "undefined") {
    return defaultResumeState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultResumeState;

    const parsed = JSON.parse(raw) as Partial<ResumeState>;
    return {
      data: mergeResumeState(parsed),
      settings: normalizeResumeSettings(parsed.settings),
    };
  } catch {
    return defaultResumeState;
  }
}

export function saveResumeState(state: ResumeState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearResumeState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
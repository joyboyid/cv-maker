import { defaultPortfolioState } from "@/lib/portfolio-defaults";
import { mergePortfolioState } from "@/lib/sanitize-portfolio";
import type { PortfolioState } from "@/types/portfolio";

const STORAGE_KEY = "portfolio-maker-state-v1";

export function loadPortfolioState(): PortfolioState {
  if (typeof window === "undefined") {
    return defaultPortfolioState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolioState;

    const parsed = JSON.parse(raw) as Partial<PortfolioState>;
    return mergePortfolioState(parsed);
  } catch {
    return defaultPortfolioState;
  }
}

export function savePortfolioState(state: PortfolioState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPortfolioState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
import { defaultPortfolioState } from "@/lib/portfolio-defaults";
import {
  addDraftEntry,
  clearDraftCollectionStorage,
  createDraftCollection,
  deleteDraftEntry,
  duplicateDraftEntry,
  getActiveDraftState,
  loadDraftCollectionFromStorage,
  renameDraftEntry,
  resetActiveDraftState,
  saveDraftCollectionToStorage,
  switchActiveDraft,
  updateActiveDraftState,
  type DraftCollection,
} from "@/lib/draft-storage";
import { mergePortfolioState } from "@/lib/sanitize-portfolio";
import type { PortfolioState } from "@/types/portfolio";

const DRAFTS_KEY = "portfolio-drafts-v1";
const LEGACY_KEY = "portfolio-maker-state-v1";

function normalizePortfolioState(raw: unknown): PortfolioState {
  return mergePortfolioState(raw);
}

export function loadPortfolioDraftStore(): DraftCollection<PortfolioState> {
  return loadDraftCollectionFromStorage(
    DRAFTS_KEY,
    defaultPortfolioState,
    "Portofolio Utama",
    normalizePortfolioState,
    {
      key: LEGACY_KEY,
      toState: normalizePortfolioState,
      name: "Portofolio Utama",
    },
  );
}

export function savePortfolioDraftStore(
  store: DraftCollection<PortfolioState>,
): void {
  saveDraftCollectionToStorage(DRAFTS_KEY, store);
}

export function loadPortfolioState(): PortfolioState {
  return getActiveDraftState(loadPortfolioDraftStore()) ?? defaultPortfolioState;
}

export function savePortfolioState(state: PortfolioState): void {
  const store = loadPortfolioDraftStore();
  savePortfolioDraftStore(updateActiveDraftState(store, state));
}

export function clearPortfolioState(): void {
  clearDraftCollectionStorage(DRAFTS_KEY);
  clearDraftCollectionStorage(LEGACY_KEY);
}

export function addPortfolioDraft(
  store: DraftCollection<PortfolioState>,
  name: string,
): DraftCollection<PortfolioState> {
  const active = getActiveDraftState(store) ?? defaultPortfolioState;
  return addDraftEntry(store, name, active);
}

export function resetPortfolioDraftStore(
  store: DraftCollection<PortfolioState>,
): DraftCollection<PortfolioState> {
  return resetActiveDraftState(store, defaultPortfolioState);
}

export {
  switchActiveDraft as switchPortfolioDraft,
  renameDraftEntry as renamePortfolioDraft,
  deleteDraftEntry as deletePortfolioDraft,
  duplicateDraftEntry as duplicatePortfolioDraft,
  updateActiveDraftState as updatePortfolioDraftState,
};
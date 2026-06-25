import { defaultCoverLetterState } from "@/lib/cover-letter-defaults";
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
import { mergeCoverLetterState } from "@/lib/sanitize-cover-letter";
import type { CoverLetterState } from "@/types/cover-letter";

const DRAFTS_KEY = "cover-letter-drafts-v1";
const LEGACY_KEY = "cover-letter-state-v1";

function normalizeCoverLetterState(raw: unknown): CoverLetterState {
  return mergeCoverLetterState(raw);
}

export function loadCoverLetterDraftStore(): DraftCollection<CoverLetterState> {
  return loadDraftCollectionFromStorage(
    DRAFTS_KEY,
    defaultCoverLetterState,
    "Cover Letter Utama",
    normalizeCoverLetterState,
    {
      key: LEGACY_KEY,
      toState: normalizeCoverLetterState,
      name: "Cover Letter Utama",
    },
  );
}

export function saveCoverLetterDraftStore(
  store: DraftCollection<CoverLetterState>,
): void {
  saveDraftCollectionToStorage(DRAFTS_KEY, store);
}

export function loadCoverLetterState(): CoverLetterState {
  return getActiveDraftState(loadCoverLetterDraftStore()) ?? defaultCoverLetterState;
}

export function saveCoverLetterState(state: CoverLetterState): void {
  const store = loadCoverLetterDraftStore();
  saveCoverLetterDraftStore(updateActiveDraftState(store, state));
}

export function clearCoverLetterState(): void {
  clearDraftCollectionStorage(DRAFTS_KEY);
  clearDraftCollectionStorage(LEGACY_KEY);
}

export function addCoverLetterDraft(
  store: DraftCollection<CoverLetterState>,
  name: string,
): DraftCollection<CoverLetterState> {
  const active = getActiveDraftState(store) ?? defaultCoverLetterState;
  return addDraftEntry(store, name, active);
}

export function resetCoverLetterDraftStore(
  store: DraftCollection<CoverLetterState>,
): DraftCollection<CoverLetterState> {
  return resetActiveDraftState(store, defaultCoverLetterState);
}

export {
  switchActiveDraft as switchCoverLetterDraft,
  renameDraftEntry as renameCoverLetterDraft,
  deleteDraftEntry as deleteCoverLetterDraft,
  duplicateDraftEntry as duplicateCoverLetterDraft,
  updateActiveDraftState as updateCoverLetterDraftState,
};
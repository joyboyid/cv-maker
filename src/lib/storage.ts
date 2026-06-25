import { defaultResumeState } from "@/lib/resume-defaults";
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
import { mergeResumeState } from "@/lib/sanitize-resume";
import { normalizeResumeSettings } from "@/lib/settings-utils";
import type { ResumeState } from "@/types/resume";

const DRAFTS_KEY = "cv-maker-drafts-v1";
const LEGACY_KEY = "cv-maker-state-v2";

function normalizeResumeState(raw: unknown): ResumeState {
  const parsed =
    raw && typeof raw === "object" ? (raw as Partial<ResumeState>) : {};
  return {
    data: mergeResumeState(parsed),
    settings: normalizeResumeSettings(parsed.settings),
  };
}

function legacyToResumeState(raw: unknown): ResumeState {
  return normalizeResumeState(raw);
}

export function loadResumeDraftStore(): DraftCollection<ResumeState> {
  return loadDraftCollectionFromStorage(
    DRAFTS_KEY,
    defaultResumeState,
    "CV Utama",
    normalizeResumeState,
    {
      key: LEGACY_KEY,
      toState: legacyToResumeState,
      name: "CV Utama",
    },
  );
}

export function saveResumeDraftStore(store: DraftCollection<ResumeState>): void {
  saveDraftCollectionToStorage(DRAFTS_KEY, store);
}

export function loadResumeState(): ResumeState {
  return getActiveDraftState(loadResumeDraftStore()) ?? defaultResumeState;
}

export function saveResumeState(state: ResumeState): void {
  const store = loadResumeDraftStore();
  saveResumeDraftStore(updateActiveDraftState(store, state));
}

export function clearResumeState(): void {
  clearDraftCollectionStorage(DRAFTS_KEY);
  clearDraftCollectionStorage(LEGACY_KEY);
}

export function createResumeDraftStore(): DraftCollection<ResumeState> {
  return createDraftCollection(defaultResumeState, "CV Utama");
}

export function addResumeDraft(
  store: DraftCollection<ResumeState>,
  name: string,
): DraftCollection<ResumeState> {
  const active = getActiveDraftState(store) ?? defaultResumeState;
  return addDraftEntry(store, name, active);
}

export function resetResumeDraftStore(
  store: DraftCollection<ResumeState>,
): DraftCollection<ResumeState> {
  return resetActiveDraftState(store, defaultResumeState);
}

export {
  switchActiveDraft as switchResumeDraft,
  renameDraftEntry as renameResumeDraft,
  deleteDraftEntry as deleteResumeDraft,
  duplicateDraftEntry as duplicateResumeDraft,
  updateActiveDraftState as updateResumeDraftState,
};
export interface DraftEntry<T> {
  id: string;
  name: string;
  updatedAt: number;
  state: T;
}

export interface DraftCollection<T> {
  activeId: string;
  drafts: DraftEntry<T>[];
}

export function createDraftId(): string {
  const suffix =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `draft-${suffix}`;
}

export function createDraftEntry<T>(
  name: string,
  state: T,
  id = createDraftId(),
): DraftEntry<T> {
  return {
    id,
    name,
    updatedAt: Date.now(),
    state,
  };
}

export function createDraftCollection<T>(
  defaultState: T,
  defaultName = "Draft 1",
): DraftCollection<T> {
  const draft = createDraftEntry(defaultName, defaultState);
  return {
    activeId: draft.id,
    drafts: [draft],
  };
}

export function getActiveDraft<T>(
  collection: DraftCollection<T>,
): DraftEntry<T> | undefined {
  return (
    collection.drafts.find((draft) => draft.id === collection.activeId) ??
    collection.drafts[0]
  );
}

export function getActiveDraftState<T>(collection: DraftCollection<T>): T | null {
  return getActiveDraft(collection)?.state ?? null;
}

export function updateActiveDraftState<T>(
  collection: DraftCollection<T>,
  state: T,
): DraftCollection<T> {
  const active = getActiveDraft(collection);
  if (!active) return collection;

  return {
    ...collection,
    drafts: collection.drafts.map((draft) =>
      draft.id === active.id
        ? { ...draft, state, updatedAt: Date.now() }
        : draft,
    ),
  };
}

export function switchActiveDraft<T>(
  collection: DraftCollection<T>,
  draftId: string,
): DraftCollection<T> {
  if (!collection.drafts.some((draft) => draft.id === draftId)) {
    return collection;
  }
  return { ...collection, activeId: draftId };
}

export function addDraftEntry<T>(
  collection: DraftCollection<T>,
  name: string,
  state: T,
): DraftCollection<T> {
  const draft = createDraftEntry(name, structuredClone(state));
  return {
    activeId: draft.id,
    drafts: [...collection.drafts, draft],
  };
}

export function renameDraftEntry<T>(
  collection: DraftCollection<T>,
  draftId: string,
  name: string,
): DraftCollection<T> {
  return {
    ...collection,
    drafts: collection.drafts.map((draft) =>
      draft.id === draftId ? { ...draft, name: name.trim() || draft.name } : draft,
    ),
  };
}

export function deleteDraftEntry<T>(
  collection: DraftCollection<T>,
  draftId: string,
): DraftCollection<T> {
  if (collection.drafts.length <= 1) return collection;

  const drafts = collection.drafts.filter((draft) => draft.id !== draftId);
  const activeId =
    collection.activeId === draftId ? drafts[0].id : collection.activeId;

  return { activeId, drafts };
}

export function duplicateDraftEntry<T>(
  collection: DraftCollection<T>,
  draftId: string,
): DraftCollection<T> {
  const source = collection.drafts.find((draft) => draft.id === draftId);
  if (!source) return collection;

  const copy = createDraftEntry(`${source.name} (salinan)`, structuredClone(source.state));
  return {
    activeId: copy.id,
    drafts: [...collection.drafts, copy],
  };
}

export function resetActiveDraftState<T>(
  collection: DraftCollection<T>,
  defaultState: T,
): DraftCollection<T> {
  return updateActiveDraftState(collection, structuredClone(defaultState));
}

export function loadDraftCollectionFromStorage<T>(
  storageKey: string,
  defaultState: T,
  defaultName: string,
  normalize: (raw: unknown) => T,
  legacy?: { key: string; toState: (raw: unknown) => T; name?: string },
): DraftCollection<T> {
  if (typeof window === "undefined") {
    return createDraftCollection(defaultState, defaultName);
  }

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as DraftCollection<unknown>;
      if (parsed?.drafts?.length && parsed.activeId) {
        return {
          activeId: parsed.activeId,
          drafts: parsed.drafts.map((draft, index) => ({
            id: typeof draft.id === "string" ? draft.id : createDraftId(),
            name:
              typeof draft.name === "string" && draft.name.trim()
                ? draft.name
                : `Draft ${index + 1}`,
            updatedAt:
              typeof draft.updatedAt === "number" ? draft.updatedAt : Date.now(),
            state: normalize(draft.state),
          })),
        };
      }
    }
  } catch {
    // fall through to legacy / default
  }

  if (legacy) {
    try {
      const legacyRaw = localStorage.getItem(legacy.key);
      if (legacyRaw) {
        const legacyState = legacy.toState(JSON.parse(legacyRaw));
        const collection = createDraftCollection(
          legacyState,
          legacy.name ?? defaultName,
        );
        saveDraftCollectionToStorage(storageKey, collection);
        return collection;
      }
    } catch {
      // ignore
    }
  }

  return createDraftCollection(defaultState, defaultName);
}

export function saveDraftCollectionToStorage<T>(
  storageKey: string,
  collection: DraftCollection<T>,
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify(collection));
}

export function clearDraftCollectionStorage(storageKey: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey);
}
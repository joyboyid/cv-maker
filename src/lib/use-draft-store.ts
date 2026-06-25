"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getActiveDraft,
  type DraftCollection,
  type DraftEntry,
} from "@/lib/draft-storage";

interface UseDraftStoreOptions<T> {
  loadStore: () => DraftCollection<T>;
  saveStore: (store: DraftCollection<T>) => void;
  defaultState: T;
  addDraft: (store: DraftCollection<T>, name: string) => DraftCollection<T>;
  resetDraft: (store: DraftCollection<T>) => DraftCollection<T>;
  switchDraft: (store: DraftCollection<T>, id: string) => DraftCollection<T>;
  renameDraft: (store: DraftCollection<T>, id: string, name: string) => DraftCollection<T>;
  deleteDraft: (store: DraftCollection<T>, id: string) => DraftCollection<T>;
  duplicateDraft: (store: DraftCollection<T>, id: string) => DraftCollection<T>;
  updateDraft: (store: DraftCollection<T>, state: T) => DraftCollection<T>;
}

export function useDraftStore<T>(options: UseDraftStoreOptions<T>) {
  const [hydrated, setHydrated] = useState(false);
  const [store, setStore] = useState<DraftCollection<T> | null>(null);
  const [state, setState] = useState<T>(options.defaultState);

  useEffect(() => {
    const loaded = options.loadStore();
    const active = getActiveDraft(loaded) ?? loaded.drafts[0];
    setStore(loaded);
    setState(active.state);
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (nextStore: DraftCollection<T>, nextState?: T) => {
      setStore(nextStore);
      if (nextState) setState(nextState);
      options.saveStore(nextStore);
    },
    [options],
  );

  const updateState = useCallback(
    (updater: T | ((prev: T) => T)) => {
      if (!store) return;
      const nextState =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(state)
          : updater;
      setState(nextState);
      persist(options.updateDraft(store, nextState));
    },
    [store, state, persist, options],
  );

  const selectDraft = useCallback(
    (id: string) => {
      if (!store) return;
      const synced = options.updateDraft(store, state);
      const switched = options.switchDraft(synced, id);
      const active = getActiveDraft(switched);
      if (!active) return;
      persist(switched, active.state);
    },
    [store, state, persist, options],
  );

  const createDraft = useCallback(
    (name: string) => {
      if (!store) return;
      const synced = options.updateDraft(store, state);
      const next = options.addDraft(synced, name);
      const active = getActiveDraft(next);
      if (!active) return;
      persist(next, active.state);
    },
    [store, state, persist, options],
  );

  const renameDraftById = useCallback(
    (id: string, name: string) => {
      if (!store) return;
      persist(options.renameDraft(store, id, name));
    },
    [store, persist, options],
  );

  const deleteDraftById = useCallback(
    (id: string) => {
      if (!store) return;
      const synced = options.updateDraft(store, state);
      const next = options.deleteDraft(synced, id);
      const active = getActiveDraft(next);
      if (!active) return;
      persist(next, active.state);
    },
    [store, state, persist, options],
  );

  const duplicateDraftById = useCallback(
    (id: string) => {
      if (!store) return;
      const synced = options.updateDraft(store, state);
      const next = options.duplicateDraft(synced, id);
      const active = getActiveDraft(next);
      if (!active) return;
      persist(next, active.state);
    },
    [store, state, persist, options],
  );

  const resetActive = useCallback(() => {
    if (!store) return;
    const next = options.resetDraft(store);
    const active = getActiveDraft(next);
    if (!active) return;
    persist(next, active.state);
  }, [store, persist, options]);

  const draftSummaries: DraftEntry<T>[] = store?.drafts ?? [];

  return {
    hydrated,
    state,
    setState: updateState,
    draftSummaries,
    activeDraftId: store?.activeId ?? "",
    selectDraft,
    createDraft,
    renameDraftById,
    deleteDraftById,
    duplicateDraftById,
    resetActive,
  };
}
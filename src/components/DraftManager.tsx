"use client";

import { useState } from "react";
import { Copy, FilePlus2, Pencil, Trash2 } from "lucide-react";

export interface DraftSummary {
  id: string;
  name: string;
  updatedAt: number;
}

interface DraftManagerProps {
  drafts: DraftSummary[];
  activeId: string;
  language?: "id" | "en";
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function DraftManager({
  drafts,
  activeId,
  language = "id",
  onSelect,
  onCreate,
  onRename,
  onDelete,
  onDuplicate,
}: DraftManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const labels =
    language === "id"
      ? {
          title: "Draft tersimpan",
          new: "Draft baru",
          rename: "Ubah nama",
          duplicate: "Duplikat",
          delete: "Hapus",
          save: "Simpan",
          cancel: "Batal",
          deleteConfirm: "Hapus draft ini?",
          updated: "Diperbarui",
        }
      : {
          title: "Saved drafts",
          new: "New draft",
          rename: "Rename",
          duplicate: "Duplicate",
          delete: "Delete",
          save: "Save",
          cancel: "Cancel",
          deleteConfirm: "Delete this draft?",
          updated: "Updated",
        };

  const startRename = (draft: DraftSummary) => {
    setEditingId(draft.id);
    setEditName(draft.name);
  };

  const submitRename = () => {
    if (!editingId) return;
    onRename(editingId, editName);
    setEditingId(null);
    setEditName("");
  };

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString(language === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="shell-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="shell-title text-sm">{labels.title}</h3>
        <button
          type="button"
          onClick={onCreate}
          className="shell-btn-secondary gap-1 px-2.5 py-1.5 text-xs"
        >
          <FilePlus2 className="h-3.5 w-3.5" />
          {labels.new}
        </button>
      </div>

      <div className="space-y-2">
        {drafts.map((draft) => {
          const isActive = draft.id === activeId;
          const isEditing = editingId === draft.id;

          return (
            <div
              key={draft.id}
              className={`rounded-lg border px-3 py-2 ${
                isActive ? "shell-draft-active" : "shell-draft-inactive"
              }`}
            >
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    className="shell-input flex-1 rounded-md px-2 py-1 text-sm"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") submitRename();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={submitRename}
                    className="text-xs font-medium text-blue-600"
                  >
                    {labels.save}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="shell-muted text-xs"
                  >
                    {labels.cancel}
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelect(draft.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="shell-title truncate text-sm">
                      {draft.name}
                    </p>
                    <p className="shell-muted text-[11px]">
                      {labels.updated} {formatDate(draft.updatedAt)}
                    </p>
                  </button>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => startRename(draft)}
                      aria-label={labels.rename}
                      className="shell-muted rounded p-1 hover:bg-[var(--shell-hover)] hover:text-[var(--shell-heading)]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicate(draft.id)}
                      aria-label={labels.duplicate}
                      className="shell-muted rounded p-1 hover:bg-[var(--shell-hover)] hover:text-[var(--shell-heading)]"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!confirm(labels.deleteConfirm)) return;
                        onDelete(draft.id);
                      }}
                      disabled={drafts.length <= 1}
                      aria-label={labels.delete}
                      className="shell-muted rounded p-1 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
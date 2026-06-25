"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { textareaClass } from "@/components/ui/Field";
import {
  applyLinkedInToResume,
  parseLinkedInText,
} from "@/lib/linkedin-parser";
import type { ResumeData } from "@/types/resume";

interface LinkedInPrefillPanelProps {
  currentData: ResumeData;
  onApply: (data: ResumeData) => void;
  language?: "id" | "en";
}

export function LinkedInPrefillPanel({
  currentData,
  onApply,
  language = "id",
}: LinkedInPrefillPanelProps) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"fill-empty" | "replace">("fill-empty");
  const [notice, setNotice] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const labels =
    language === "id"
      ? {
          title: "Import dari LinkedIn",
          hint: "Buka profil LinkedIn → seleksi semua (Ctrl+A) → salin → tempel di sini.",
          placeholder:
            "Tempel teks profil LinkedIn kamu di sini...\n\nContoh: nama, headline, About, Experience, Education, Skills",
          parse: "Parse & isi form",
          fillEmpty: "Isi field kosong saja",
          replace: "Ganti section terdeteksi",
          success: "Profil LinkedIn berhasil diimport!",
          sections: "Section terdeteksi",
        }
      : {
          title: "Import from LinkedIn",
          hint: "Open your LinkedIn profile → select all (Ctrl+A) → copy → paste here.",
          placeholder:
            "Paste your LinkedIn profile text here...\n\nName, headline, About, Experience, Education, Skills",
          parse: "Parse & fill form",
          fillEmpty: "Fill empty fields only",
          replace: "Replace detected sections",
          success: "LinkedIn profile imported!",
          sections: "Sections detected",
        };

  const handleParse = () => {
    const result = parseLinkedInText(text);
    setWarnings(result.warnings);

    if (!result.data.personal?.fullName && result.sectionsFound.length === 0) {
      setNotice(
        language === "id"
          ? "Gagal membaca profil. Pastikan teks lengkap dari halaman LinkedIn."
          : "Could not read profile. Paste the full LinkedIn profile text.",
      );
      return;
    }

    onApply(applyLinkedInToResume(currentData, result.data, mode));

    const sectionNote =
      result.sectionsFound.length > 0
        ? `${labels.sections}: ${result.sectionsFound.join(", ")}`
        : null;

    setNotice(
      [labels.success, sectionNote].filter(Boolean).join(" · "),
    );
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-sky-600 p-1.5 text-white">
            <LinkedInIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{labels.title}</h3>
            <p className="text-[11px] text-slate-500">{labels.hint}</p>
          </div>
        </div>
        <span className="text-xs font-medium text-sky-700">
          {open ? "Tutup" : "Buka"}
        </span>
      </button>

      {open ? (
        <div className="mt-4 space-y-3">
          <textarea
            className={textareaClass}
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={labels.placeholder}
          />

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <label className="inline-flex items-center gap-1.5">
              <input
                type="radio"
                name="linkedin-mode"
                checked={mode === "fill-empty"}
                onChange={() => setMode("fill-empty")}
              />
              {labels.fillEmpty}
            </label>
            <label className="inline-flex items-center gap-1.5">
              <input
                type="radio"
                name="linkedin-mode"
                checked={mode === "replace"}
                onChange={() => setMode("replace")}
              />
              {labels.replace}
            </label>
          </div>

          <button
            type="button"
            onClick={handleParse}
            disabled={!text.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {labels.parse}
          </button>

          {notice ? (
            <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {notice}
            </div>
          ) : null}

          {warnings.length > 0 ? (
            <ul className="list-inside list-disc space-y-1 text-xs text-amber-800">
              {warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  FileText,
  Link2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { AtsScorePanel } from "@/components/AtsScorePanel";
import { DraftManager } from "@/components/DraftManager";
import { LinkedInPrefillPanel } from "@/components/LinkedInPrefillPanel";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { SiteFooter } from "@/components/SiteFooter";
import { calculateAtsScore } from "@/lib/ats-score";
import {
  buildPdfFilename,
  getPaperDimensions,
  type DynamicPageLayout,
} from "@/lib/resume-layout";
import { defaultResumeState, sampleResumeData } from "@/lib/resume-defaults";
import { exportElementToPdf, PdfExportError } from "@/lib/pdf-export";
import { buildShareUrl } from "@/lib/share-resume";
import { t } from "@/lib/i18n";
import { useDraftStore } from "@/lib/use-draft-store";
import {
  addResumeDraft,
  clearResumeState,
  deleteResumeDraft,
  duplicateResumeDraft,
  loadResumeDraftStore,
  renameResumeDraft,
  resetResumeDraftStore,
  saveResumeDraftStore,
  switchResumeDraft,
  updateResumeDraftState,
} from "@/lib/storage";
import type { ResumeData, ResumeSettings, ResumeState } from "@/types/resume";

export default function BuilderPage() {
  const {
    hydrated,
    state,
    setState,
    draftSummaries,
    activeDraftId,
    selectDraft,
    createDraft,
    renameDraftById,
    deleteDraftById,
    duplicateDraftById,
    resetActive,
  } = useDraftStore<ResumeState>({
    loadStore: loadResumeDraftStore,
    saveStore: saveResumeDraftStore,
    defaultState: defaultResumeState,
    addDraft: addResumeDraft,
    resetDraft: resetResumeDraftStore,
    switchDraft: switchResumeDraft,
    renameDraft: renameResumeDraft,
    deleteDraft: deleteResumeDraft,
    duplicateDraft: duplicateResumeDraft,
    updateDraft: updateResumeDraftState,
  });

  const data = state.data;
  const settings = state.settings;

  const setData = (next: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    setState((prev) => ({
      ...prev,
      data: typeof next === "function" ? next(prev.data) : next,
    }));
  };

  const setSettings = (
    next: ResumeSettings | ((prev: ResumeSettings) => ResumeSettings),
  ) => {
    setState((prev) => ({
      ...prev,
      settings: typeof next === "function" ? next(prev.settings) : next,
    }));
  };

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [pageLayout, setPageLayout] = useState<DynamicPageLayout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const paper = useMemo(
    () => getPaperDimensions(settings.paperSize),
    [settings.paperSize],
  );

  const atsResult = useMemo(
    () => calculateAtsScore(data, settings.language, settings.paperSize),
    [data, settings.language, settings.paperSize],
  );

  const handleExport = async () => {
    if (!previewRef.current) {
      setExportError("Preview belum siap. Tunggu sebentar lalu coba lagi.");
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      await exportElementToPdf(
        previewRef.current,
        buildPdfFilename(data.personal.fullName),
      );
    } catch (error) {
      const message =
        error instanceof PdfExportError
          ? error.message
          : "Gagal mengunduh PDF. Coba lagi.";
      setExportError(message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const url = buildShareUrl({ data, settings });

    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      window.prompt("Salin link CV ini:", url);
    }
  };

  const handleReset = () => {
    if (!confirm("Reset draft CV aktif?")) return;
    resetActive();
  };

  const handleLoadSample = () => {
    setData(sampleResumeData);
  };

  const handleCreateDraft = () => {
    const name = prompt("Nama draft baru:", `CV ${draftSummaries.length + 1}`);
    if (!name?.trim()) return;
    createDraft(name.trim());
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Memuat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Beranda
            </Link>
            <div className="hidden h-4 w-px bg-slate-200 sm:block" />
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-slate-900">CV Satu Halaman</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:text-sm"
            >
              <Sparkles className="h-4 w-4" />
              {t(settings.language, "loadSample")}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:text-sm"
            >
              {shareCopied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {shareCopied
                ? t(settings.language, "linkCopied")
                : t(settings.language, "shareLink")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              {t(settings.language, "reset")}
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:opacity-60 sm:text-sm"
            >
              <Download className="h-4 w-4" />
              {isExporting ? "Menyimpan..." : t(settings.language, "exportPdf")}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-2 lg:px-6">
        <div className="space-y-4">
          <DraftManager
            drafts={draftSummaries}
            activeId={activeDraftId}
            language={settings.language}
            onSelect={selectDraft}
            onCreate={handleCreateDraft}
            onRename={renameDraftById}
            onDelete={deleteDraftById}
            onDuplicate={duplicateDraftById}
          />
          <LinkedInPrefillPanel
            currentData={data}
            language={settings.language}
            onApply={setData}
          />
          <AtsScorePanel result={atsResult} lang={settings.language} />
          <ResumeForm
            data={data}
            settings={settings}
            onDataChange={setData}
            onSettingsChange={setSettings}
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Preview</h2>
            <span className="text-xs text-slate-500">
              {paper.label} · {paper.widthMm}×
              {Math.round(pageLayout?.heightMm ?? paper.heightMm)} mm ·{" "}
              {pageLayout?.isCompressed
                ? t(settings.language, "paperCompressed")
                : t(settings.language, "paperAutoFit")}
            </span>
          </div>
          {exportError ? (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {exportError}
            </div>
          ) : null}
          <ResumePreview
            ref={previewRef}
            data={data}
            settings={settings}
            onPageLayoutChange={setPageLayout}
          />
          <p className="mt-3 text-center text-xs text-slate-400">
            100% gratis · Tanpa watermark pada PDF
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  Download,
  FileSignature,
  Link2,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { CoverLetterForm } from "@/components/cover-letter/CoverLetterForm";
import { CoverLetterPreview } from "@/components/cover-letter/CoverLetterPreview";
import { DraftManager } from "@/components/DraftManager";
import { LinkedInPrefillPanel } from "@/components/LinkedInPrefillPanel";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  buildPdfCoverLetterFilename,
  defaultCoverLetterState,
  generateCoverLetterFromCv,
  sampleCoverLetterData,
} from "@/lib/cover-letter-defaults";
import { ct } from "@/lib/cover-letter-i18n";
import {
  addCoverLetterDraft,
  deleteCoverLetterDraft,
  duplicateCoverLetterDraft,
  loadCoverLetterDraftStore,
  renameCoverLetterDraft,
  resetCoverLetterDraftStore,
  saveCoverLetterDraftStore,
  switchCoverLetterDraft,
  updateCoverLetterDraftState,
} from "@/lib/cover-letter-storage";
import { exportElementToPdf, PdfExportError } from "@/lib/pdf-export";
import {
  getPaperDimensions,
  type DynamicPageLayout,
} from "@/lib/resume-layout";
import { buildCoverLetterShareUrl } from "@/lib/share-cover-letter";
import { defaultResumeData } from "@/lib/resume-defaults";
import { loadResumeState } from "@/lib/storage";
import { useDraftStore } from "@/lib/use-draft-store";
import type {
  CoverLetterData,
  CoverLetterSettings,
  CoverLetterState,
} from "@/types/cover-letter";

export default function CoverLetterBuilderPage() {
  const { t: ts } = useSiteLocale();
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
  } = useDraftStore<CoverLetterState>({
    loadStore: loadCoverLetterDraftStore,
    saveStore: saveCoverLetterDraftStore,
    defaultState: defaultCoverLetterState,
    addDraft: addCoverLetterDraft,
    resetDraft: resetCoverLetterDraftStore,
    switchDraft: switchCoverLetterDraft,
    renameDraft: renameCoverLetterDraft,
    deleteDraft: deleteCoverLetterDraft,
    duplicateDraft: duplicateCoverLetterDraft,
    updateDraft: updateCoverLetterDraftState,
  });

  const data = state.data;
  const settings = state.settings;

  const setData = (
    next: CoverLetterData | ((prev: CoverLetterData) => CoverLetterData),
  ) => {
    setState((prev) => ({
      ...prev,
      data: typeof next === "function" ? next(prev.data) : next,
    }));
  };

  const setSettings = (
    next:
      | CoverLetterSettings
      | ((prev: CoverLetterSettings) => CoverLetterSettings),
  ) => {
    setState((prev) => ({
      ...prev,
      settings: typeof next === "function" ? next(prev.settings) : next,
    }));
  };

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [pageLayout, setPageLayout] = useState<DynamicPageLayout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const paper = useMemo(
    () => getPaperDimensions(settings.paperSize),
    [settings.paperSize],
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
        buildPdfCoverLetterFilename(data.sender.fullName),
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
    const url = buildCoverLetterShareUrl({ data, settings });

    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      window.prompt("Salin link cover letter ini:", url);
    }
  };

  const handleReset = () => {
    if (!confirm("Reset draft cover letter aktif?")) return;
    resetActive();
    setNotice(null);
  };

  const handleLoadSample = () => {
    setData(sampleCoverLetterData);
    setNotice(null);
  };

  const handleGenerateFromCv = () => {
    try {
      const resume = loadResumeState();
      if (!resume.data.personal.fullName && resume.data.experiences.length === 0) {
        setNotice("Data CV masih kosong. Isi CV dulu di builder.");
        return;
      }
      setData(generateCoverLetterFromCv(resume.data, settings.language));
      setNotice(ct(settings.language, "importSuccess"));
      setTimeout(() => setNotice(null), 3000);
    } catch {
      setNotice("Gagal generate dari CV.");
    }
  };

  const handleCreateDraft = () => {
    const name = prompt(
      "Nama draft baru:",
      `Cover Letter ${draftSummaries.length + 1}`,
    );
    if (!name?.trim()) return;
    createDraft(name.trim());
  };

  if (!hydrated) {
    return (
      <div className="shell-loading">{ts("common_loading")}</div>
    );
  }

  return (
    <div className="shell-page">
      <SiteHeader
        layout="builder"
        sticky
        activeToolId="cover-letter"
        brand={
          <div className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-emerald-600" />
            <span className="shell-title">{ct(settings.language, "builder")}</span>
          </div>
        }
        actions={
          <>
            <button
              type="button"
              onClick={handleLoadSample}
              className="shell-btn-secondary"
            >
              <Sparkles className="h-4 w-4" />
              {ct(settings.language, "loadSample")}
            </button>
            <button
              type="button"
              onClick={handleGenerateFromCv}
              className="shell-btn-secondary"
            >
              <Wand2 className="h-4 w-4" />
              {ct(settings.language, "importFromCv")}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="shell-btn-secondary"
            >
              {shareCopied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              {shareCopied
                ? ct(settings.language, "linkCopied")
                : ct(settings.language, "shareLink")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="shell-btn-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              {ct(settings.language, "reset")}
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60 sm:text-sm"
            >
              <Download className="h-4 w-4" />
              {isExporting ? ts("builder_export_saving") : ct(settings.language, "exportPdf")}
            </button>
          </>
        }
      />

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
          {notice ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              {notice}
            </div>
          ) : null}
          <LinkedInPrefillPanel
            currentData={defaultResumeData}
            language={settings.language}
            onApply={(resumeData) => {
              setData(generateCoverLetterFromCv(resumeData, settings.language));
              setNotice(ct(settings.language, "importSuccess"));
              setTimeout(() => setNotice(null), 3000);
            }}
          />
          <CoverLetterForm
            data={data}
            settings={settings}
            onDataChange={setData}
            onSettingsChange={setSettings}
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="shell-title text-sm">{ts("common_preview")}</h2>
            <span className="shell-muted text-xs">
              {paper.label} · {settings.template} · {paper.widthMm}×
              {Math.round(pageLayout?.heightMm ?? paper.heightMm)} mm
            </span>
          </div>
          {exportError ? (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
              {exportError}
            </div>
          ) : null}
          <CoverLetterPreview
            ref={previewRef}
            data={data}
            settings={settings}
            onPageLayoutChange={setPageLayout}
          />
          <p className="shell-muted mt-3 text-center text-xs">
            {ts("builder_preview_footer_share")}
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
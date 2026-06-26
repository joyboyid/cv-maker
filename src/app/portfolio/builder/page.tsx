"use client";

import { useRef, useState } from "react";
import {
  Check,
  Download,
  Import,
  LayoutTemplate,
  Link2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { DraftManager } from "@/components/DraftManager";
import { PortfolioForm } from "@/components/portfolio/PortfolioForm";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  defaultPortfolioState,
  importPortfolioFromResume,
  samplePortfolioData,
} from "@/lib/portfolio-defaults";
import { pt } from "@/lib/portfolio-i18n";
import {
  addPortfolioDraft,
  deletePortfolioDraft,
  duplicatePortfolioDraft,
  loadPortfolioDraftStore,
  renamePortfolioDraft,
  resetPortfolioDraftStore,
  savePortfolioDraftStore,
  switchPortfolioDraft,
  updatePortfolioDraftState,
} from "@/lib/portfolio-storage";
import { buildPdfPortfolioFilename } from "@/lib/portfolio-utils";
import { exportElementToPdf, PdfExportError } from "@/lib/pdf-export";
import { buildPortfolioShareUrl } from "@/lib/share-portfolio";
import { loadResumeState } from "@/lib/storage";
import { useDraftStore } from "@/lib/use-draft-store";
import type { PortfolioData, PortfolioSettings, PortfolioState } from "@/types/portfolio";

export default function PortfolioBuilderPage() {
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
  } = useDraftStore<PortfolioState>({
    loadStore: loadPortfolioDraftStore,
    saveStore: savePortfolioDraftStore,
    defaultState: defaultPortfolioState,
    addDraft: addPortfolioDraft,
    resetDraft: resetPortfolioDraftStore,
    switchDraft: switchPortfolioDraft,
    renameDraft: renamePortfolioDraft,
    deleteDraft: deletePortfolioDraft,
    duplicateDraft: duplicatePortfolioDraft,
    updateDraft: updatePortfolioDraftState,
  });

  const data = state.data;
  const settings = state.settings;

  const setData = (
    next: PortfolioData | ((prev: PortfolioData) => PortfolioData),
  ) => {
    setState((prev) => ({
      ...prev,
      data: typeof next === "function" ? next(prev.data) : next,
    }));
  };

  const setSettings = (
    next: PortfolioSettings | ((prev: PortfolioSettings) => PortfolioSettings),
  ) => {
    setState((prev) => ({
      ...prev,
      settings: typeof next === "function" ? next(prev.settings) : next,
    }));
  };

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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
        buildPdfPortfolioFilename(data.profile.fullName),
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
    const url = buildPortfolioShareUrl({ data, settings });

    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      window.prompt("Salin link portofolio ini:", url);
    }
  };

  const handleReset = () => {
    if (!confirm("Reset draft portofolio aktif?")) return;
    resetActive();
    setImportNotice(null);
  };

  const handleLoadSample = () => {
    setData(samplePortfolioData);
    setImportNotice(null);
  };

  const handleImportFromCv = () => {
    try {
      const resume = loadResumeState();
      if (!resume.data.personal.fullName && resume.data.projects.length === 0) {
        setImportNotice("Data CV masih kosong. Isi CV dulu di builder.");
        return;
      }
      setData(importPortfolioFromResume(resume));
      setImportNotice(pt(settings.language, "importSuccess"));
      setTimeout(() => setImportNotice(null), 3000);
    } catch {
      setImportNotice("Gagal import data CV.");
    }
  };

  const handleCreateDraft = () => {
    const name = prompt(
      "Nama draft baru:",
      `Portofolio ${draftSummaries.length + 1}`,
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
        activeToolId="portfolio"
        brand={
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5 text-violet-600" />
            <span className="shell-title">{ts("tool_portfolio_label")}</span>
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
              {pt(settings.language, "loadSample")}
            </button>
            <button
              type="button"
              onClick={handleImportFromCv}
              className="shell-btn-secondary"
            >
              <Import className="h-4 w-4" />
              {pt(settings.language, "importFromCv")}
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
                ? pt(settings.language, "linkCopied")
                : pt(settings.language, "shareLink")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="shell-btn-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              {pt(settings.language, "reset")}
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-violet-700 disabled:opacity-60 sm:text-sm"
            >
              <Download className="h-4 w-4" />
              {isExporting ? ts("builder_export_saving") : pt(settings.language, "exportPdf")}
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
          {importNotice ? (
            <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs text-violet-800 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
              {importNotice}
            </div>
          ) : null}
          <PortfolioForm
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
              {ts("builder_portfolio_layout").replace("{template}", settings.template)}
            </span>
          </div>
          {exportError ? (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
              {exportError}
            </div>
          ) : null}
          <PortfolioPreview ref={previewRef} data={data} settings={settings} />
          <p className="shell-muted mt-3 text-center text-xs">
            {ts("builder_preview_footer_share")}
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
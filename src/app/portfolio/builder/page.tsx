"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  Import,
  LayoutTemplate,
  Link2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { PortfolioForm } from "@/components/portfolio/PortfolioForm";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";
import { SiteFooter } from "@/components/SiteFooter";
import {
  defaultPortfolioState,
  importPortfolioFromResume,
  samplePortfolioData,
} from "@/lib/portfolio-defaults";
import { pt } from "@/lib/portfolio-i18n";
import { buildPdfPortfolioFilename } from "@/lib/portfolio-utils";
import {
  clearPortfolioState,
  loadPortfolioState,
  savePortfolioState,
} from "@/lib/portfolio-storage";
import { exportElementToPdf, PdfExportError } from "@/lib/pdf-export";
import { buildPortfolioShareUrl } from "@/lib/share-portfolio";
import { loadResumeState } from "@/lib/storage";

export default function PortfolioBuilderPage() {
  const [data, setData] = useState(defaultPortfolioState.data);
  const [settings, setSettings] = useState(defaultPortfolioState.settings);
  const [hydrated, setHydrated] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = loadPortfolioState();
      setData(saved.data);
      setSettings(saved.settings);
    } catch {
      clearPortfolioState();
      setData(defaultPortfolioState.data);
      setSettings(defaultPortfolioState.settings);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePortfolioState({ data, settings });
  }, [data, settings, hydrated]);

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
    if (!confirm("Reset semua data portofolio?")) return;
    clearPortfolioState();
    setData(defaultPortfolioState.data);
    setSettings(defaultPortfolioState.settings);
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
              <LayoutTemplate className="h-5 w-5 text-violet-600" />
              <span className="font-semibold text-slate-900">Portofolio</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:text-sm"
            >
              <Sparkles className="h-4 w-4" />
              {pt(settings.language, "loadSample")}
            </button>
            <button
              type="button"
              onClick={handleImportFromCv}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:text-sm"
            >
              <Import className="h-4 w-4" />
              {pt(settings.language, "importFromCv")}
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
                ? pt(settings.language, "linkCopied")
                : pt(settings.language, "shareLink")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 sm:text-sm"
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
              {isExporting ? "Menyimpan..." : pt(settings.language, "exportPdf")}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-2 lg:px-6">
        <div>
          {importNotice ? (
            <div className="mb-4 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs text-violet-800">
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
            <h2 className="text-sm font-semibold text-slate-700">Preview</h2>
            <span className="text-xs text-slate-500">
              Template {settings.template} · Web layout
            </span>
          </div>
          {exportError ? (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {exportError}
            </div>
          ) : null}
          <PortfolioPreview ref={previewRef} data={data} settings={settings} />
          <p className="mt-3 text-center text-xs text-slate-400">
            100% gratis · Bagikan link read-only · Data di browser
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
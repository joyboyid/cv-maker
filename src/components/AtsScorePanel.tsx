"use client";

import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import type { AtsCheck, AtsScoreResult } from "@/lib/ats-score";
import { t } from "@/lib/i18n";
import type { Language } from "@/types/resume";

interface AtsScorePanelProps {
  result: AtsScoreResult;
  lang: Language;
}

function StatusIcon({ status }: { status: AtsCheck["status"] }) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />;
  if (status === "warn") return <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />;
  return <XCircle className="h-4 w-4 shrink-0 text-red-500" />;
}

function gradeColor(grade: AtsScoreResult["grade"]): string {
  if (grade === "A" || grade === "B") return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (grade === "C") return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

export function AtsScorePanel({ result, lang }: AtsScorePanelProps) {
  const passCount = result.checks.filter((c) => c.status === "pass").length;

  return (
    <div className={`rounded-xl border px-4 py-4 ${gradeColor(result.grade)}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{t(lang, "atsScore")}</p>
          <p className="mt-1 text-2xl font-bold">{result.score}/100</p>
          <p className="mt-1 text-xs opacity-80">
            Grade {result.grade} · {passCount}/{result.checks.length} cek lolos
          </p>
        </div>
        <div className="text-right text-xs opacity-80">
          <p>{t(lang, "contentScore")}</p>
          <p className="font-semibold">{result.contentFit}/100</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {result.checks.map((check) => (
          <li
            key={check.id}
            className="flex items-start gap-2 rounded-lg bg-white/60 px-2.5 py-2 text-xs text-slate-700"
          >
            <StatusIcon status={check.status} />
            <div>
              <p className="font-medium">{check.label}</p>
              <p className="mt-0.5 text-slate-500">{check.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
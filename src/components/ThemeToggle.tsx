"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const labels = {
  system: "Tema sistem",
  light: "Tema terang",
  dark: "Tema gelap",
} as const;

export function ThemeToggle() {
  const { mode, resolved, cycleMode } = useTheme();

  const Icon =
    mode === "system" ? Monitor : resolved === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={labels[mode]}
      title={labels[mode]}
      className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/10 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
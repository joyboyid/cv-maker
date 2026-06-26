"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Wrench } from "lucide-react";
import {
  getActiveToolId,
  siteTools,
  type SiteToolId,
} from "@/lib/site-tools";

interface ToolsMenuProps {
  activeToolId?: SiteToolId;
  align?: "left" | "right";
  className?: string;
}

export function ToolsMenu({
  activeToolId,
  align = "right",
  className = "",
}: ToolsMenuProps) {
  const pathname = usePathname();
  const resolvedActive = activeToolId ?? getActiveToolId(pathname);
  const activeTool = siteTools.find((tool) => tool.id === resolvedActive);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--shell-border)] bg-[var(--shell-surface)] px-3 py-2 text-sm font-medium text-[var(--shell-heading)] transition hover:bg-[var(--shell-hover)]"
      >
        <Wrench className="h-4 w-4 text-blue-600" />
        <span className="hidden sm:inline">Tools</span>
        <span className="sm:hidden">{activeTool?.shortLabel ?? "Tools"}</span>
        <ChevronDown
          className={`h-4 w-4 text-[var(--shell-muted)] transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className={`absolute top-[calc(100%+0.5rem)] z-50 w-72 overflow-hidden rounded-xl border border-[var(--shell-border)] bg-[var(--shell-surface)] p-1.5 shadow-xl shadow-slate-900/10 dark:shadow-black/40 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <p className="shell-muted px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide">
            Pilih tool
          </p>
          {siteTools.map((tool) => {
            const isActive = tool.id === resolvedActive;
            const Icon = tool.icon;

            return (
              <Link
                key={tool.id}
                href={tool.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition hover:bg-[var(--shell-hover)] ${
                  isActive ? tool.activeBgClass : ""
                }`}
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--shell-surface-subtle)] ${tool.accentClass}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="shell-title text-sm">{tool.label}</p>
                    {isActive ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    ) : null}
                  </div>
                  <p className="shell-muted mt-0.5 text-xs leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
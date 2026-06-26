"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { DonationMethod } from "@/lib/donations";

interface WalletCardProps {
  method: DonationMethod;
}

export function WalletCard({ method }: WalletCardProps) {
  const [copied, setCopied] = useState(false);
  const copyValue = method.href ?? method.address;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(`Salin ${method.name}:`, copyValue);
    }
  };

  return (
    <article className="shell-card-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold ${method.accentBg} ${method.accent}`}
          >
            {method.symbol}
          </div>
          <div>
            <h2 className="shell-title">{method.name}</h2>
            <p className="shell-muted text-xs">{method.network}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {method.href ? (
            <a
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Buka
            </a>
          ) : null}
          <button
            type="button"
            onClick={handleCopy}
            className="shell-btn-secondary px-3 py-1.5 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Tersalin
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Salin
              </>
            )}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="mt-4 w-full rounded-xl border border-[var(--shell-border-subtle)] bg-[var(--shell-surface-subtle)] px-4 py-3 text-left transition hover:bg-[var(--shell-hover)]"
      >
        <p className="shell-body break-all font-mono text-xs leading-relaxed sm:text-sm">
          {method.address}
        </p>
      </button>
    </article>
  );
}
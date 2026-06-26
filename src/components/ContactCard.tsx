"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Send } from "lucide-react";
import type { ContactChannel } from "@/lib/contact";

interface ContactCardProps {
  channel: ContactChannel;
}

export function ContactCard({ channel }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(channel.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(`Salin ${channel.name}:`, channel.handle);
    }
  };

  return (
    <article className="shell-card-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${channel.accentBg} ${channel.accent}`}
          >
            <Send className="h-5 w-5" />
          </div>
          <div>
            <h2 className="shell-title">{channel.name}</h2>
            <p className="shell-muted text-xs">{channel.label}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Chat
          </a>
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
        <p className="shell-body font-mono text-sm font-medium">
          {channel.handle}
        </p>
      </button>
    </article>
  );
}
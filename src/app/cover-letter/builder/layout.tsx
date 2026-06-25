import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cover Letter Generator — Surat Lamaran Gratis",
  description:
    "Buat surat lamaran profesional dengan template Formal, Startup, dan Academic. Multi-draft, generate dari CV, import LinkedIn, export PDF.",
  path: "/cover-letter/builder",
  keywords: ["cover letter", "surat lamaran", "application letter"],
});

export default function CoverLetterBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
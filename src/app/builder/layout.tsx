import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Buat CV Online — Builder ATS-Friendly",
  description:
    "Editor CV satu halaman dengan 6 template, skor ATS, multi-draft, export PDF, dan share link. Data tersimpan di browser — gratis tanpa daftar.",
  path: "/builder",
  keywords: ["cv builder", "editor cv", "ats score", "multi cv"],
});

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
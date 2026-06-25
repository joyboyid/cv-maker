import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Buat Portofolio Online — Generator Gratis",
  description:
    "Buat portofolio web profesional dengan 3 template, multi-draft, import dari CV, share link, dan export PDF. Gratis untuk developer dan kreator.",
  path: "/portfolio/builder",
  keywords: ["portfolio maker", "portofolio online", "developer portfolio"],
});

export default function PortfolioBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
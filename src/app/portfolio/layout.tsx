import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portofolio Bersama",
  description: "Tampilan read-only portofolio yang dibagikan melalui link.",
  path: "/portfolio",
  noIndex: true,
});

export default function SharedPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
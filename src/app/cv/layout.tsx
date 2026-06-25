import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "CV Bersama",
  description: "Tampilan read-only CV yang dibagikan melalui link.",
  path: "/cv",
  noIndex: true,
});

export default function SharedCvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
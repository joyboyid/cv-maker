import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cover Letter Bersama",
  description: "Tampilan read-only cover letter yang dibagikan melalui link.",
  path: "/cover-letter",
  noIndex: true,
});

export default function SharedCoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
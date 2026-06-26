import { HomePageClient } from "@/components/HomePageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CV Satu Halaman — Buat Resume ATS-Friendly Gratis",
  description:
    "Buat CV, portofolio, dan cover letter online gratis. Template modern, export PDF, multi-draft, bahasa Indonesia & Inggris. Tanpa daftar.",
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
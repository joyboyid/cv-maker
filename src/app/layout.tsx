import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CV Satu Halaman — Buat Resume ATS-Friendly Gratis",
  description:
    "Buat CV dan resume satu halaman online gratis. Template modern, export PDF, bahasa Indonesia & Inggris. Tanpa daftar, tanpa biaya.",
  keywords: [
    "buat cv online",
    "resume generator",
    "cv ats friendly",
    "cv satu halaman",
    "cv fresh graduate",
  ],
  openGraph: {
    title: "CV Satu Halaman — 100% Gratis",
    description:
      "Tool pembuatan CV satu halaman untuk pelamar kerja Indonesia. Gratis untuk semua orang.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
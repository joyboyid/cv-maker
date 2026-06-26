import { DonationsPageClient } from "@/components/DonationsPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Donasi",
  description:
    "Dukung pengembangan CV Satu Halaman lewat PayPal, Solana, Bitcoin, atau Ethereum.",
  path: "/donations",
});

export default function DonationsPage() {
  return <DonationsPageClient />;
}
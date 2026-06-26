import { AboutPageClient } from "@/components/AboutPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Tentang Boim",
  description:
    "Kenalan dengan Boim, pembuat CV Satu Halaman — pecinta IT, keamanan siber, dan anime.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
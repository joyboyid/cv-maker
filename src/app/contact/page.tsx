import { ContactPageClient } from "@/components/ContactPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Me",
  description:
    "Hubungi Boim lewat Telegram @setooo untuk pertanyaan, saran, atau kolaborasi.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
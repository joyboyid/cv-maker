import type { TemplateId } from "@/types/resume";

export const TEMPLATE_OPTIONS: { id: TemplateId; label: string; hint: string }[] =
  [
    { id: "modern", label: "Modern", hint: "Sidebar berwarna — tech & kreatif" },
    { id: "minimal", label: "Minimal", hint: "Bersih & netral — semua industri" },
    { id: "classic", label: "Classic", hint: "Formal serif — korporat" },
    { id: "academic", label: "Academic", hint: "Riset, publikasi, pendidikan" },
    { id: "creative", label: "Creative", hint: "Bold & colorful — desain & media" },
    { id: "executive", label: "Executive", hint: "Leadership — manajemen senior" },
  ];
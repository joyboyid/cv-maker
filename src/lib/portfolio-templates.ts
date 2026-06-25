import type { PortfolioTemplateId } from "@/types/portfolio";

export const PORTFOLIO_TEMPLATE_OPTIONS: {
  id: PortfolioTemplateId;
  label: string;
  hint: string;
}[] = [
  {
    id: "minimal",
    label: "Minimal",
    hint: "Bersih & profesional — cocok untuk semua bidang",
  },
  {
    id: "developer",
    label: "Developer",
    hint: "Dark mode & tech stack — untuk programmer",
  },
  {
    id: "creative",
    label: "Creative",
    hint: "Bold & colorful — desain, media, kreatif",
  },
];
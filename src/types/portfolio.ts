import type { Language } from "@/types/resume";

export type PortfolioTemplateId = "minimal" | "developer" | "creative";

export interface PortfolioProfile {
  fullName: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  github: string;
  linkedin: string;
  website: string;
  behance: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  link: string;
  demoLink: string;
  imageUrl: string;
  techStack: string[];
  featured: boolean;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  skills: string[];
  projects: PortfolioProject[];
}

export interface PortfolioSettings {
  template: PortfolioTemplateId;
  language: Language;
  accentColor: string;
}

export interface PortfolioState {
  data: PortfolioData;
  settings: PortfolioSettings;
}
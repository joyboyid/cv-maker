import { defaultPortfolioSettings } from "@/lib/portfolio-defaults";
import type {
  PortfolioData,
  PortfolioProfile,
  PortfolioProject,
  PortfolioSettings,
  PortfolioState,
  PortfolioTemplateId,
} from "@/types/portfolio";
import type { Language } from "@/types/resume";

const TEMPLATES: PortfolioTemplateId[] = ["minimal", "developer", "creative"];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function cleanStrings(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function normalizeProfile(profile: unknown): PortfolioProfile {
  const source =
    profile && typeof profile === "object"
      ? (profile as Partial<PortfolioProfile>)
      : {};

  return {
    fullName: asString(source.fullName),
    tagline: asString(source.tagline),
    bio: asString(source.bio),
    email: asString(source.email),
    phone: asString(source.phone),
    location: asString(source.location),
    avatarUrl: asString(source.avatarUrl),
    github: asString(source.github),
    linkedin: asString(source.linkedin),
    website: asString(source.website),
    behance: asString(source.behance),
  };
}

function normalizeProjects(items: unknown): PortfolioProject[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const project = item as Partial<PortfolioProject>;
      const rawTechStack = project.techStack as unknown;
      const techStack = Array.isArray(rawTechStack)
        ? rawTechStack
            .map((tech) => (typeof tech === "string" ? tech.trim() : ""))
            .filter(Boolean)
        : typeof rawTechStack === "string"
          ? rawTechStack
              .split(",")
              .map((tech) => tech.trim())
              .filter(Boolean)
          : [];

      return {
        id: asString(project.id, `proj-${index}`),
        name: asString(project.name),
        description: asString(project.description),
        link: asString(project.link),
        demoLink: asString(project.demoLink),
        imageUrl: asString(project.imageUrl),
        techStack,
        featured: Boolean(project.featured),
      };
    });
}

export function mergePortfolioData(source: Partial<PortfolioData> | unknown): PortfolioData {
  const input =
    source && typeof source === "object" ? (source as Partial<PortfolioData>) : {};

  return {
    profile: normalizeProfile(input.profile),
    skills: cleanStrings(input.skills),
    projects: normalizeProjects(input.projects),
  };
}

export function normalizePortfolioSettings(
  settings: Partial<PortfolioSettings> | unknown,
): PortfolioSettings {
  const source =
    settings && typeof settings === "object"
      ? (settings as Partial<PortfolioSettings>)
      : {};

  const language: Language =
    source.language === "en" || source.language === "id" ? source.language : "id";

  const accentColor =
    typeof source.accentColor === "string" && /^#[0-9a-fA-F]{6}$/.test(source.accentColor)
      ? source.accentColor
      : defaultPortfolioSettings.accentColor;

  return {
    template: TEMPLATES.includes(source.template as PortfolioTemplateId)
      ? (source.template as PortfolioTemplateId)
      : defaultPortfolioSettings.template,
    language,
    accentColor,
  };
}

export function mergePortfolioState(source: Partial<PortfolioState> | unknown): PortfolioState {
  const input =
    source && typeof source === "object" ? (source as Partial<PortfolioState>) : {};

  return {
    data: mergePortfolioData(input.data),
    settings: normalizePortfolioSettings(input.settings),
  };
}
import { defaultResumeData } from "@/lib/resume-defaults";
import type {
  Award,
  Certification,
  Education,
  Experience,
  PersonalInfo,
  Project,
  Publication,
  ResumeData,
  ResumeState,
  Volunteer,
} from "@/types/resume";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function cleanStrings(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function normalizePersonal(personal: unknown): PersonalInfo {
  const source =
    personal && typeof personal === "object"
      ? (personal as Partial<PersonalInfo>)
      : {};

  return {
    fullName: asString(source.fullName),
    title: asString(source.title),
    email: asString(source.email),
    phone: asString(source.phone),
    location: asString(source.location),
    linkedin: asString(source.linkedin),
    website: asString(source.website),
    summary: asString(source.summary),
  };
}

function normalizeExperiences(items: unknown): Experience[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const exp = item as Partial<Experience>;
      return {
        id: asString(exp.id, `exp-${index}`),
        company: asString(exp.company),
        position: asString(exp.position),
        location: asString(exp.location),
        startDate: asString(exp.startDate),
        endDate: asString(exp.endDate),
        current: Boolean(exp.current),
        bullets: cleanStrings(exp.bullets),
      };
    });
}

function normalizeEducation(items: unknown): Education[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const edu = item as Partial<Education>;
      return {
        id: asString(edu.id, `edu-${index}`),
        institution: asString(edu.institution),
        degree: asString(edu.degree),
        field: asString(edu.field),
        startDate: asString(edu.startDate),
        endDate: asString(edu.endDate),
        gpa: asString(edu.gpa),
        highlights: cleanStrings(edu.highlights),
      };
    });
}

function normalizeCertifications(items: unknown): Certification[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => {
      if (typeof item === "string") {
        const name = item.trim();
        if (!name) return null;
        return {
          id: `cert-${index}`,
          name,
          issueDate: "",
          expireDate: "",
          credentialId: "",
        };
      }

      if (!item || typeof item !== "object") return null;

      const cert = item as Partial<Certification>;
      const name = asString(cert.name);
      if (!name) return null;

      return {
        id: asString(cert.id, `cert-${index}`),
        name,
        issueDate: asString(cert.issueDate),
        expireDate: asString(cert.expireDate),
        credentialId: asString(cert.credentialId),
      };
    })
    .filter((item): item is Certification => item !== null);
}

function normalizeProjects(items: unknown): Project[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const project = item as Partial<Project>;
      return {
        id: asString(project.id, `proj-${index}`),
        name: asString(project.name),
        link: asString(project.link),
        description: asString(project.description),
        bullets: cleanStrings(project.bullets),
      };
    });
}

function normalizeVolunteers(items: unknown): Volunteer[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const vol = item as Partial<Volunteer>;
      return {
        id: asString(vol.id, `vol-${index}`),
        organization: asString(vol.organization),
        role: asString(vol.role),
        location: asString(vol.location),
        startDate: asString(vol.startDate),
        endDate: asString(vol.endDate),
        current: Boolean(vol.current),
        description: asString(vol.description),
      };
    });
}

function normalizeAwards(items: unknown): Award[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const award = item as Partial<Award>;
      return {
        id: asString(award.id, `award-${index}`),
        title: asString(award.title),
        issuer: asString(award.issuer),
        date: asString(award.date),
        description: asString(award.description),
      };
    });
}

function normalizePublications(items: unknown): Publication[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => {
      const pub = item as Partial<Publication>;
      return {
        id: asString(pub.id, `pub-${index}`),
        title: asString(pub.title),
        publisher: asString(pub.publisher),
        date: asString(pub.date),
        link: asString(pub.link),
        description: asString(pub.description),
      };
    });
}

export function sanitizeResumeData(data: ResumeData): ResumeData {
  return {
    personal: normalizePersonal(data.personal),
    experiences: normalizeExperiences(data.experiences),
    education: normalizeEducation(data.education),
    skills: cleanStrings(data.skills),
    projects: normalizeProjects(data.projects),
    languages: cleanStrings(data.languages),
    certifications: normalizeCertifications(data.certifications),
    volunteers: normalizeVolunteers(data.volunteers),
    awards: normalizeAwards(data.awards),
    publications: normalizePublications(data.publications),
  };
}

export function mergeResumeState(parsed: Partial<ResumeState>): ResumeData {
  const raw = parsed.data;
  if (!raw || typeof raw !== "object") {
    return defaultResumeData;
  }

  return sanitizeResumeData({
    personal: normalizePersonal(raw.personal),
    experiences: normalizeExperiences(raw.experiences),
    education: normalizeEducation(raw.education),
    skills: cleanStrings(raw.skills),
    projects: normalizeProjects(raw.projects),
    languages: cleanStrings(raw.languages),
    certifications: normalizeCertifications(raw.certifications),
    volunteers: normalizeVolunteers(raw.volunteers),
    awards: normalizeAwards(raw.awards),
    publications: normalizePublications(raw.publications),
  });
}
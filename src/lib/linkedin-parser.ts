import { createId } from "@/lib/resume-defaults";
import type { Education, Experience, ResumeData } from "@/types/resume";

export interface LinkedInParseResult {
  data: Partial<ResumeData>;
  warnings: string[];
  sectionsFound: string[];
}

const SECTION_HEADERS: Record<string, RegExp> = {
  about: /^(about|tentang|summary|ringkasan)$/i,
  experience: /^(experience|pengalaman kerja|pengalaman|work experience)$/i,
  education: /^(education|pendidikan)$/i,
  skills: /^(skills|keahlian|top skills|competencies)$/i,
  certifications: /^(licenses?(\s*&\s*certifications?)?|sertifikasi|certifications?)$/i,
  projects: /^(projects?|proyek)$/i,
  languages: /^(languages?|bahasa)$/i,
};

const DATE_RANGE_RE =
  /(\b(?:jan|feb|mar|apr|may|mei|jun|jul|aug|agu|sep|oct|okt|nov|dec|des)\b\.?\s*\d{4}|\d{4})\s*[-–—·•]\s*(\b(?:present|sekarang|kini|saat ini)\b|\b(?:jan|feb|mar|apr|may|mei|jun|jul|aug|agu|sep|oct|okt|nov|dec|des)\b\.?\s*\d{4}|\d{4})/i;

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}(?:[\s-]?\d{2,4})?/;
const LINKEDIN_RE = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w%-]+/i;
const WEBSITE_RE = /(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w.-]+/i;

function cleanLines(text: string): string[] {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function isSectionHeader(line: string): string | null {
  for (const [key, pattern] of Object.entries(SECTION_HEADERS)) {
    if (pattern.test(line)) return key;
  }
  return null;
}

function splitSections(lines: string[]): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let current: string | null = null;

  for (const line of lines) {
    const header = isSectionHeader(line);
    if (header) {
      current = header;
      sections.set(current, []);
      continue;
    }
    if (current) {
      sections.get(current)!.push(line);
    }
  }

  return sections;
}

function parseDateRange(line: string): { startDate: string; endDate: string; current: boolean } {
  const match = line.match(DATE_RANGE_RE);
  if (!match) {
    return { startDate: "", endDate: "", current: false };
  }

  const startDate = match[1]?.trim() ?? "";
  const endPart = match[2]?.trim() ?? "";
  const current = /present|sekarang|kini|saat ini/i.test(endPart);

  return {
    startDate,
    endDate: current ? "" : endPart,
    current,
  };
}

function isDateLine(line: string): boolean {
  return DATE_RANGE_RE.test(line) || /^\d{4}\s*[-–—]\s*(\d{4}|present|sekarang)/i.test(line);
}

function parseExperiences(lines: string[]): Experience[] {
  const experiences: Experience[] = [];
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (isDateLine(line) && current.length > 0) {
      current.push(line);
      blocks.push(current);
      current = [];
      continue;
    }
    if (current.length > 0 && isDateLine(line) === false && blocks.length > 0) {
      const last = blocks[blocks.length - 1];
      if (last && !last.some(isDateLine)) {
        current = [...last, line];
        blocks.pop();
      }
    }
    current.push(line);
  }
  if (current.length > 0) blocks.push(current);

  if (blocks.length === 0 && lines.length > 0) {
    blocks.push(lines);
  }

  for (const block of blocks) {
    const dateLineIndex = block.findIndex(isDateLine);
    const dateLine = dateLineIndex >= 0 ? block[dateLineIndex] : "";
    const meta = parseDateRange(dateLine);
    const contentLines = block.filter((_, index) => index !== dateLineIndex);

    const position = contentLines[0] ?? "";
    const company = contentLines[1] ?? contentLines[0] ?? "";
    const location = contentLines[2] && !contentLines[2].startsWith("·") ? contentLines[2] : "";
    const bullets = contentLines
      .slice(3)
      .map((line) => line.replace(/^[-•●]\s*/, ""))
      .filter((line) => line.length > 12);

    if (!position && !company) continue;

    experiences.push({
      id: createId("exp"),
      company: company || position,
      position: position || company,
      location,
      startDate: meta.startDate,
      endDate: meta.endDate,
      current: meta.current,
      bullets,
    });
  }

  return experiences;
}

function parseEducation(lines: string[]): Education[] {
  const education: Education[] = [];
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (isDateLine(line) && current.length > 0) {
      current.push(line);
      blocks.push(current);
      current = [];
      continue;
    }
    current.push(line);
  }
  if (current.length > 0) blocks.push(current);

  for (const block of blocks) {
    const dateLine = block.find(isDateLine) ?? "";
    const meta = parseDateRange(dateLine);
    const content = block.filter((line) => line !== dateLine);

    const institution = content[0] ?? "";
    const degreeLine = content[1] ?? "";
    const [degree, field] = degreeLine.split(/[,·]/).map((part) => part.trim());

    if (!institution) continue;

    education.push({
      id: createId("edu"),
      institution,
      degree: degree ?? "",
      field: field ?? "",
      startDate: meta.startDate,
      endDate: meta.endDate,
      gpa: "",
      highlights: content.slice(2).map((line) => line.replace(/^[-•●]\s*/, "")),
    });
  }

  return education;
}

function parseSkills(lines: string[]): string[] {
  const joined = lines.join(" ");
  if (joined.includes(",")) {
    return joined
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return lines
    .flatMap((line) => line.split(/[•●·|]/))
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 1 && skill.length < 60);
}

function guessHeadline(lines: string[], name: string): string {
  const idx = lines.findIndex((line) => line === name);
  if (idx >= 0 && lines[idx + 1] && !isSectionHeader(lines[idx + 1])) {
    const candidate = lines[idx + 1];
    if (!EMAIL_RE.test(candidate) && !DATE_RANGE_RE.test(candidate)) {
      return candidate;
    }
  }
  return "";
}

function guessLocation(lines: string[], name: string): string {
  const idx = lines.findIndex((line) => line === name);
  for (let i = idx + 1; i < Math.min(idx + 5, lines.length); i += 1) {
    const line = lines[i];
    if (isSectionHeader(line)) break;
    if (line.includes(",") || /indonesia|jakarta|bandung|surabaya|area/i.test(line)) {
      return line;
    }
  }
  return "";
}

export function parseLinkedInText(text: string): LinkedInParseResult {
  const warnings: string[] = [];
  const lines = cleanLines(text);

  if (lines.length < 2) {
    return {
      data: {},
      warnings: ["Teks terlalu pendek. Salin seluruh profil LinkedIn kamu."],
      sectionsFound: [],
    };
  }

  const fullText = lines.join("\n");
  const email = fullText.match(EMAIL_RE)?.[0] ?? "";
  const phone = fullText.match(PHONE_RE)?.[0] ?? "";
  const linkedin = fullText.match(LINKEDIN_RE)?.[0] ?? "";
  const websiteMatch = fullText.match(WEBSITE_RE)?.[0] ?? "";
  const website =
    websiteMatch && !/linkedin\.com/i.test(websiteMatch) ? websiteMatch : "";

  const firstSectionIndex = lines.findIndex((line) => isSectionHeader(line) !== null);
  const headerLines = firstSectionIndex > 0 ? lines.slice(0, firstSectionIndex) : lines.slice(0, 4);
  const name = headerLines[0] ?? "";
  const title = guessHeadline(lines, name);
  const location = guessLocation(lines, name);

  const sections = splitSections(lines);
  const sectionsFound = Array.from(sections.keys());

  const aboutLines = sections.get("about") ?? [];
  const summary = aboutLines.join("\n\n").trim();

  const experiences = parseExperiences(sections.get("experience") ?? []);
  const education = parseEducation(sections.get("education") ?? []);
  const skills = parseSkills(sections.get("skills") ?? []);

  if (!name) warnings.push("Nama tidak terdeteksi — isi manual jika perlu.");
  if (!summary && sectionsFound.length === 0) {
    warnings.push(
      "Section About/Experience tidak terdeteksi. Pastikan teks hasil salin dari halaman profil LinkedIn.",
    );
  }
  if (experiences.length === 0 && sections.has("experience")) {
    warnings.push("Pengalaman kerja terdeteksi tapi formatnya sulit diparse — cek manual.");
  }

  return {
    data: {
      personal: {
        fullName: name,
        title,
        email,
        phone,
        location,
        linkedin,
        website,
        summary,
      },
      experiences,
      education,
      skills,
      projects: [],
      languages: parseSkills(sections.get("languages") ?? []),
      certifications: [],
      volunteers: [],
      awards: [],
      publications: [],
    },
    warnings,
    sectionsFound,
  };
}

export function applyLinkedInToResume(
  current: ResumeData,
  parsed: Partial<ResumeData>,
  mode: "fill-empty" | "replace",
): ResumeData {
  if (mode === "replace") {
    return {
      ...current,
      personal: { ...current.personal, ...parsed.personal },
      experiences: parsed.experiences ?? current.experiences,
      education: parsed.education ?? current.education,
      skills: parsed.skills ?? current.skills,
      languages: parsed.languages ?? current.languages,
    };
  }

  const personal = { ...current.personal };
  const parsedPersonal = parsed.personal;
  if (parsedPersonal) {
    for (const key of Object.keys(personal) as (keyof typeof personal)[]) {
      if (!personal[key] && parsedPersonal[key]) {
        personal[key] = parsedPersonal[key];
      }
    }
  }

  return {
    ...current,
    personal,
    experiences:
      current.experiences.length > 0
        ? current.experiences
        : (parsed.experiences ?? []),
    education:
      current.education.length > 0 ? current.education : (parsed.education ?? []),
    skills: current.skills.length > 0 ? current.skills : (parsed.skills ?? []),
    languages:
      current.languages.length > 0 ? current.languages : (parsed.languages ?? []),
  };
}
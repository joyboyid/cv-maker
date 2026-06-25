export type Language = "id" | "en";

export type TemplateId =
  | "modern"
  | "minimal"
  | "classic"
  | "academic"
  | "creative"
  | "executive";

export type PaperSize = "a4" | "letter" | "legal" | "folio";

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  expireDate: string;
  credentialId: string;
}

export interface Volunteer {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  languages: string[];
  certifications: Certification[];
  volunteers: Volunteer[];
  awards: Award[];
  publications: Publication[];
}

export interface ResumeSettings {
  template: TemplateId;
  language: Language;
  accentColor: string;
  paperSize: PaperSize;
}

export interface ResumeState {
  data: ResumeData;
  settings: ResumeSettings;
}
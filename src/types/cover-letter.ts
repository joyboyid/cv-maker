import type { Language, PaperSize } from "@/types/resume";

export interface CoverLetterSender {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface CoverLetterRecipient {
  hiringManagerName: string;
  companyName: string;
  companyAddress: string;
  position: string;
}

export interface CoverLetterContent {
  date: string;
  greeting: string;
  opening: string;
  body: string;
  closing: string;
  signature: string;
}

export interface CoverLetterData {
  sender: CoverLetterSender;
  recipient: CoverLetterRecipient;
  content: CoverLetterContent;
}

export interface CoverLetterSettings {
  language: Language;
  paperSize: PaperSize;
}

export interface CoverLetterState {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}
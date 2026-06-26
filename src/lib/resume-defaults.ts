import { getPaperDimensions } from "@/lib/resume-layout";
import type {
  PaperSize,
  ResumeData,
  ResumeSettings,
  ResumeState,
} from "@/types/resume";

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  volunteers: [],
  awards: [],
  publications: [],
};

export const defaultSettings: ResumeSettings = {
  template: "minimal",
  language: "id",
  accentColor: "#2563eb",
  paperSize: "a4",
};

export const defaultResumeState: ResumeState = {
  data: defaultResumeData,
  settings: defaultSettings,
};

export const sampleResumeData: ResumeData = {
  personal: {
    fullName: "Ahmad Rizki Pratama",
    title: "Software Engineer",
    email: "ahmad.rizki@email.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    linkedin: "linkedin.com/in/ahmadrizki",
    website: "ahmadrizki.dev",
    summary:
      "Lulusan Teknik Informatika dengan pengalaman magang di startup teknologi. Terampil membangun aplikasi web full-stack, berkolaborasi dalam tim agile, dan menulis kode yang mudah dipelihara.",
  },
  experiences: [
    {
      id: "exp-1",
      company: "TechStartup ID",
      position: "Software Engineering Intern",
      location: "Jakarta",
      startDate: "Jun 2024",
      endDate: "Des 2024",
      current: false,
      bullets: [
        "Mengembangkan fitur dashboard menggunakan React dan TypeScript, meningkatkan engagement pengguna 18%",
        "Berpartisipasi dalam code review dan standarisasi API REST internal",
        "Menulis unit test dengan Jest sehingga coverage modul inti naik menjadi 82%",
      ],
    },
    {
      id: "exp-2",
      company: "HMIF Universitas",
      position: "Ketua Divisi IT",
      location: "Bandung",
      startDate: "Jan 2023",
      endDate: "Des 2023",
      current: false,
      bullets: [
        "Memimpin tim 8 orang untuk membangun sistem pendaftaran acara kampus",
        "Mengelola infrastruktur deployment dengan Docker dan GitHub Actions",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Universitas Indonesia",
      degree: "S1",
      field: "Teknik Informatika",
      startDate: "2020",
      endDate: "2024",
      gpa: "3.72/4.00",
      highlights: [
        "Skripsi: Sistem rekomendasi lowongan kerja berbasis machine learning",
        "Asisten Praktikum Struktur Data",
      ],
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Git",
    "Docker",
    "Problem Solving",
  ],
  projects: [
    {
      id: "proj-1",
      name: "JobTrack",
      link: "github.com/ahmadrizki/jobtrack",
      description: "Aplikasi pelacakan lamaran kerja untuk fresh graduate",
      bullets: [
        "Full-stack app dengan Next.js dan Supabase",
        "Fitur reminder interview dan analitik status lamaran",
      ],
    },
  ],
  languages: ["Bahasa Indonesia (Native)", "English (Professional)"],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Cloud Practitioner",
      issueDate: "Jun 2024",
      expireDate: "Jun 2027",
      credentialId: "AWS-CCP-123456",
    },
  ],
  volunteers: [
    {
      id: "vol-1",
      organization: "Komunitas Belajar Kode",
      role: "Mentor Volunteer",
      location: "Jakarta",
      startDate: "Jan 2023",
      endDate: "Sekarang",
      current: true,
      description:
        "Mengajar dasar web development untuk 20+ pelajar SMA gratis setiap bulan.",
    },
  ],
  awards: [
    {
      id: "award-1",
      title: "Juara 2 Hackathon Nasional",
      issuer: "Kementerian Komunikasi & Informatika",
      date: "2023",
      description: "Tim terbaik kategori edukasi teknologi.",
    },
  ],
  publications: [
    {
      id: "pub-1",
      title: "Sistem Rekomendasi Lowongan Kerja Berbasis ML",
      publisher: "Skripsi S1 — Universitas Indonesia",
      date: "2024",
      link: "",
      description:
        "Penelitian klasifikasi lowongan kerja menggunakan NLP untuk fresh graduate.",
    },
  ],
};

export function createId(prefix: string): string {
  const suffix =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${suffix}`;
}

function computeRawContentScore(data: ResumeData): number {
  let score = 0;

  score += data.personal.summary.length / 25;
  score += data.experiences.length * 12;
  score += data.experiences.reduce(
    (acc, exp) => acc + exp.bullets.join("").length / 40 + exp.bullets.length * 3,
    0,
  );
  score += data.education.length * 8;
  score += data.education.reduce(
    (acc, edu) => acc + edu.highlights.length * 4,
    0,
  );
  score += data.skills.length * 1.5;
  score += data.projects.length * 10;
  score += data.languages.length * 2;
  score += data.certifications.reduce(
    (acc, cert) =>
      acc +
      3 +
      (cert.issueDate ? 1 : 0) +
      (cert.expireDate ? 1 : 0) +
      (cert.credentialId ? 1 : 0),
    0,
  );
  score += data.volunteers.length * 6;
  score += data.awards.length * 4;
  score += data.publications.length * 6;

  return score;
}

export function estimateContentScore(
  data: ResumeData,
  paperSize: PaperSize = "a4",
): number {
  const raw = computeRawContentScore(data);
  const paper = getPaperDimensions(paperSize);
  const a4 = getPaperDimensions("a4");
  const scaled = raw * (a4.heightPx / paper.heightPx);
  return Math.min(100, Math.round(scaled));
}
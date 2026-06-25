import type { PortfolioData, PortfolioSettings, PortfolioState } from "@/types/portfolio";
import type { ResumeState } from "@/types/resume";

export const defaultPortfolioProfile: PortfolioData["profile"] = {
  fullName: "",
  tagline: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  avatarUrl: "",
  github: "",
  linkedin: "",
  website: "",
  behance: "",
};

export const defaultPortfolioData: PortfolioData = {
  profile: defaultPortfolioProfile,
  skills: [],
  projects: [],
};

export const defaultPortfolioSettings: PortfolioSettings = {
  template: "developer",
  language: "id",
  accentColor: "#2563eb",
};

export const defaultPortfolioState: PortfolioState = {
  data: defaultPortfolioData,
  settings: defaultPortfolioSettings,
};

export const samplePortfolioData: PortfolioData = {
  profile: {
    fullName: "Boim",
    tagline: "IT Support · Pecinta Keamanan Siber",
    bio: "Passion di bidang IT dan cybersecurity. Suka membangun tools bermanfaat, belajar di pwn.college, dan kadang menghabiskan waktu dengan anime. Saat ini bekerja sebagai IT Support di ISP Indonesia.",
    email: "boim@email.com",
    phone: "+62 812 0000 0000",
    location: "Indonesia",
    avatarUrl: "/boim-avatar.jpg",
    github: "github.com/boim",
    linkedin: "linkedin.com/in/boim",
    website: "",
    behance: "",
  },
  skills: [
    "Linux",
    "Networking",
    "Cybersecurity",
    "Troubleshooting",
    "Docker",
    "Python",
    "Web Development",
  ],
  projects: [
    {
      id: "proj-1",
      name: "CV Satu Halaman",
      description:
        "Tool gratis untuk membuat CV ATS-friendly satu halaman dengan export PDF dan share link.",
      link: "",
      demoLink: "/builder",
      imageUrl: "",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
      featured: true,
    },
    {
      id: "proj-2",
      name: "Homelab Monitoring",
      description:
        "Dashboard monitoring infrastruktur rumah dengan alert otomatis via Telegram bot.",
      link: "github.com/boim/homelab-monitor",
      demoLink: "",
      imageUrl: "",
      techStack: ["Python", "Grafana", "Docker"],
      featured: true,
    },
    {
      id: "proj-3",
      name: "CTF Writeups",
      description:
        "Kumpulan writeup challenge cybersecurity dari latihan pwn.college dan CTF lokal.",
      link: "github.com/boim/ctf-writeups",
      demoLink: "",
      imageUrl: "",
      techStack: ["Security", "Documentation"],
      featured: false,
    },
  ],
};

export function createPortfolioId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function importPortfolioFromResume(resume: ResumeState): PortfolioData {
  const { personal, skills, projects } = resume.data;

  return {
    profile: {
      fullName: personal.fullName,
      tagline: personal.title,
      bio: personal.summary,
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      avatarUrl: "",
      github: "",
      linkedin: personal.linkedin,
      website: personal.website,
      behance: "",
    },
    skills: [...skills],
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      link: project.link,
      demoLink: project.link,
      imageUrl: "",
      techStack: [],
      featured: false,
    })),
  };
}
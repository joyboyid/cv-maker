import type { CoverLetterData, CoverLetterSettings, CoverLetterState } from "@/types/cover-letter";
import type { Language, ResumeData } from "@/types/resume";

export const defaultCoverLetterData: CoverLetterData = {
  sender: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  recipient: {
    hiringManagerName: "",
    companyName: "",
    companyAddress: "",
    position: "",
  },
  content: {
    date: "",
    greeting: "",
    opening: "",
    body: "",
    closing: "",
    signature: "",
  },
};

export const defaultCoverLetterSettings: CoverLetterSettings = {
  template: "formal",
  language: "id",
  paperSize: "a4",
};

export const defaultCoverLetterState: CoverLetterState = {
  data: defaultCoverLetterData,
  settings: defaultCoverLetterSettings,
};

function todayLabel(lang: Language): string {
  const now = new Date();
  return now.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateCoverLetterFromCv(
  cv: ResumeData,
  lang: Language = "id",
): CoverLetterData {
  const { personal, experiences, skills, education } = cv;
  const latestExp = experiences[0];
  const topSkills = skills.slice(0, 5).join(", ");
  const degree = education[0];
  const position = personal.title || latestExp?.position || "";
  const company = "";

  const greeting =
    lang === "id"
      ? "Yth. Bapak/Ibu Hiring Manager"
      : "Dear Hiring Manager";

  const opening =
    lang === "id"
      ? `Saya ${personal.fullName || "[Nama]"}, dengan minat pada posisi ${position || "[Posisi]"} di perusahaan Anda. Melalui surat ini, saya ingin menyampaikan ketertarikan saya untuk bergabung dan memberikan kontribusi terbaik.`
      : `I am ${personal.fullName || "[Name]"}, writing to express my interest in the ${position || "[Position]"} role at your company. I am excited about the opportunity to contribute my skills and experience to your team.`;

  const experienceLine = latestExp
    ? lang === "id"
      ? `Pengalaman terbaru saya sebagai ${latestExp.position} di ${latestExp.company}${latestExp.bullets[0] ? `, di mana saya ${latestExp.bullets[0].charAt(0).toLowerCase()}${latestExp.bullets[0].slice(1)}` : ""}.`
      : `In my recent role as ${latestExp.position} at ${latestExp.company}${latestExp.bullets[0] ? `, where I ${latestExp.bullets[0].charAt(0).toLowerCase()}${latestExp.bullets[0].slice(1)}` : ""}.`
    : "";

  const educationLine = degree
    ? lang === "id"
      ? `Latar belakang pendidikan saya di ${degree.institution} (${degree.degree} ${degree.field}) memperkuat fondasi teknis yang relevan.`
      : `My educational background from ${degree.institution} (${degree.degree} in ${degree.field}) provides a strong technical foundation.`
    : "";

  const skillsLine = topSkills
    ? lang === "id"
      ? `Keahlian utama saya meliputi ${topSkills}, yang saya yakini selaras dengan kebutuhan posisi ini.`
      : `My core skills include ${topSkills}, which I believe align well with this role.`
    : personal.summary
      ? personal.summary
      : "";

  const body = [experienceLine, educationLine, skillsLine].filter(Boolean).join("\n\n");

  const closing =
    lang === "id"
      ? "Saya berharap dapat berkesempatan untuk mendiskusikan bagaimana pengalaman dan motivasi saya dapat mendukung tujuan perusahaan Anda. Terima kasih atas waktu dan pertimbangannya."
      : "I would welcome the opportunity to discuss how my background and enthusiasm can support your team's goals. Thank you for your time and consideration.";

  return {
    sender: {
      fullName: personal.fullName,
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      linkedin: personal.linkedin,
      website: personal.website,
    },
    recipient: {
      hiringManagerName: "",
      companyName: company,
      companyAddress: "",
      position: position,
    },
    content: {
      date: todayLabel(lang),
      greeting,
      opening,
      body,
      closing,
      signature: personal.fullName,
    },
  };
}

export const sampleCoverLetterData: CoverLetterData = {
  sender: {
    fullName: "Ahmad Rizki Pratama",
    email: "ahmad.rizki@email.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    linkedin: "linkedin.com/in/ahmadrizki",
    website: "ahmadrizki.dev",
  },
  recipient: {
    hiringManagerName: "Bapak/Ibu Hiring Manager",
    companyName: "PT Teknologi Nusantara",
    companyAddress: "Jakarta Selatan, DKI Jakarta",
    position: "Software Engineer",
  },
  content: {
    date: todayLabel("id"),
    greeting: "Yth. Bapak/Ibu Hiring Manager PT Teknologi Nusantara",
    opening:
      "Saya Ahmad Rizki Pratama, lulusan Teknik Informatika yang tertarik melamar posisi Software Engineer di perusahaan Anda. Saya mengikuti perkembangan PT Teknologi Nusantara dan tertarik dengan produk digital yang dibangun tim Anda.",
    body: "Pengalaman magang saya sebagai Software Engineering Intern di TechStartup ID membekali saya membangun fitur dashboard dengan React dan TypeScript, serta menulis unit test yang meningkatkan coverage modul inti. Keahlian saya meliputi TypeScript, React, Next.js, Node.js, dan PostgreSQL.\n\nSaya terbiasa bekerja dalam tim agile, berkolaborasi dalam code review, dan fokus menulis kode yang mudah dipelihara.",
    closing:
      "Saya berharap dapat berkesempatan wawancara untuk mendiskusikan kontribusi saya lebih lanjut. Terima kasih atas waktu dan pertimbangannya.",
    signature: "Ahmad Rizki Pratama",
  },
};

export function buildPdfCoverLetterFilename(fullName: string): string {
  const slug = fullName.trim().replace(/\s+/g, "-").toLowerCase() || "cover-letter";
  return `${slug}-cover-letter.pdf`;
}
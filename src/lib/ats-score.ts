import { estimateContentScore } from "@/lib/resume-defaults";
import type { Language, PaperSize, ResumeData } from "@/types/resume";

export type AtsStatus = "pass" | "warn" | "fail";

export interface AtsCheck {
  id: string;
  label: string;
  status: AtsStatus;
  message: string;
  points: number;
  maxPoints: number;
}

export interface AtsScoreResult {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  checks: AtsCheck[];
  contentFit: number;
}

const ACTION_VERBS =
  /(mengembangkan|membangun|memimpin|meningkatkan|merancang|mengelola|mengoptimalkan|developed|built|led|improved|designed|managed|implemented|created|achieved|reduced|increased)/i;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /[\d+][\d\s\-()]{7,}/;
const METRIC_RE = /(\d+%|\d+\s*(jt|juta|rb|ribu|k|m|x)|\d{2,})/i;

function gradeFromScore(score: number): AtsScoreResult["grade"] {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function check(
  id: string,
  label: string,
  status: AtsStatus,
  message: string,
  points: number,
  maxPoints: number,
): AtsCheck {
  const earned =
    status === "pass" ? maxPoints : status === "warn" ? Math.round(maxPoints * 0.5) : 0;
  return { id, label, status, message, points: earned, maxPoints };
}

export function calculateAtsScore(
  data: ResumeData,
  lang: Language,
  paperSize: PaperSize = "a4",
): AtsScoreResult {
  const isId = lang === "id";
  const checks: AtsCheck[] = [];
  const { personal } = data;

  checks.push(
    check(
      "name",
      isId ? "Nama lengkap" : "Full name",
      personal.fullName.trim().length >= 3 ? "pass" : "fail",
      personal.fullName.trim()
        ? isId
          ? "Nama terisi."
          : "Name is filled."
        : isId
          ? "Tambahkan nama lengkap."
          : "Add your full name.",
      0,
      8,
    ),
  );

  checks.push(
    check(
      "email",
      "Email",
      EMAIL_RE.test(personal.email.trim()) ? "pass" : "fail",
      EMAIL_RE.test(personal.email.trim())
        ? isId
          ? "Format email valid."
          : "Valid email format."
        : isId
          ? "Gunakan format email yang valid."
          : "Use a valid email format.",
      0,
      10,
    ),
  );

  checks.push(
    check(
      "phone",
      isId ? "Telepon" : "Phone",
      PHONE_RE.test(personal.phone) ? "pass" : "warn",
      PHONE_RE.test(personal.phone)
        ? isId
          ? "Nomor telepon terisi."
          : "Phone number provided."
        : isId
          ? "Tambahkan nomor telepon agar recruiter bisa menghubungi."
          : "Add a phone number for recruiters.",
      0,
      8,
    ),
  );

  const summaryLen = personal.summary.trim().length;
  checks.push(
    check(
      "summary",
      isId ? "Ringkasan profil" : "Professional summary",
      summaryLen >= 80 && summaryLen <= 400
        ? "pass"
        : summaryLen > 0
          ? "warn"
          : "fail",
      summaryLen === 0
        ? isId
          ? "Tambahkan ringkasan 2-3 kalimat."
          : "Add a 2-3 sentence summary."
        : summaryLen < 80
          ? isId
            ? "Ringkasan terlalu pendek — tambah keahlian & tujuan."
            : "Summary too short — add skills & goals."
          : summaryLen > 400
            ? isId
              ? "Ringkasan terlalu panjang — ringkas ke 3-4 kalimat."
              : "Summary too long — keep to 3-4 sentences."
            : isId
              ? "Panjang ringkasan ideal."
              : "Summary length is ideal.",
      0,
      10,
    ),
  );

  checks.push(
    check(
      "experience",
      isId ? "Pengalaman kerja" : "Work experience",
      data.experiences.length > 0 ? "pass" : "fail",
      data.experiences.length > 0
        ? isId
          ? `${data.experiences.length} pengalaman tercatat.`
          : `${data.experiences.length} experience entries.`
        : isId
          ? "Tambahkan minimal 1 pengalaman kerja/magang."
          : "Add at least 1 work/internship entry.",
      0,
      12,
    ),
  );

  const allBullets = data.experiences.flatMap((e) => e.bullets);
  const actionBullets = allBullets.filter((b) => ACTION_VERBS.test(b)).length;
  const metricBullets = allBullets.filter((b) => METRIC_RE.test(b)).length;

  checks.push(
    check(
      "action-verbs",
      isId ? "Bullet action-oriented" : "Action-oriented bullets",
      allBullets.length === 0
        ? "warn"
        : actionBullets >= Math.ceil(allBullets.length * 0.5)
          ? "pass"
          : "warn",
      allBullets.length === 0
        ? isId
          ? "Tambahkan poin pencapaian di pengalaman."
          : "Add achievement bullets."
        : isId
          ? `Gunakan kata kerja aktif (mis. "Mengembangkan", "Memimpin"). ${actionBullets}/${allBullets.length} bullet cocok.`
          : `Use active verbs (e.g. "Developed", "Led"). ${actionBullets}/${allBullets.length} bullets match.`,
      0,
      10,
    ),
  );

  checks.push(
    check(
      "metrics",
      isId ? "Angka & hasil" : "Metrics & results",
      metricBullets > 0 ? "pass" : "warn",
      metricBullets > 0
        ? isId
          ? "Bullet mengandung angka/hasil — bagus untuk ATS."
          : "Bullets include numbers/results — great for ATS."
        : isId
          ? "Tambahkan angka (%, jumlah, peningkatan) di bullet point."
          : "Add numbers (%, counts, improvements) to bullets.",
      0,
      8,
    ),
  );

  const longBullets = allBullets.filter((b) => b.length > 160).length;
  checks.push(
    check(
      "bullet-length",
      isId ? "Panjang bullet" : "Bullet length",
      longBullets === 0 ? "pass" : "warn",
      longBullets === 0
        ? isId
          ? "Panjang bullet ideal untuk ATS."
          : "Bullet length is ATS-friendly."
        : isId
          ? `${longBullets} bullet terlalu panjang — ringkas ke 1-2 baris.`
          : `${longBullets} bullets too long — keep to 1-2 lines.`,
      0,
      6,
    ),
  );

  checks.push(
    check(
      "education",
      isId ? "Pendidikan" : "Education",
      data.education.length > 0 ? "pass" : "warn",
      data.education.length > 0
        ? isId
          ? "Pendidikan terisi."
          : "Education section filled."
        : isId
          ? "Tambahkan riwayat pendidikan."
          : "Add education history.",
      0,
      8,
    ),
  );

  const skillCount = data.skills.length;
  checks.push(
    check(
      "skills",
      isId ? "Keahlian" : "Skills",
      skillCount >= 5 && skillCount <= 20
        ? "pass"
        : skillCount > 0
          ? "warn"
          : "fail",
      skillCount === 0
        ? isId
          ? "Tambahkan 5-15 keahlian relevan."
          : "Add 5-15 relevant skills."
        : skillCount < 5
          ? isId
            ? "Keahlian sedikit — tambah 5-15 skill."
            : "Few skills — aim for 5-15."
          : skillCount > 20
            ? isId
              ? "Terlalu banyak skill — fokus ke yang relevan."
              : "Too many skills — focus on relevant ones."
            : isId
              ? "Jumlah keahlian ideal."
              : "Skill count is ideal.",
      0,
      10,
    ),
  );

  checks.push(
    check(
      "linkedin",
      "LinkedIn",
      personal.linkedin.trim() ? "pass" : "warn",
      personal.linkedin.trim()
        ? isId
          ? "LinkedIn terisi."
          : "LinkedIn provided."
        : isId
          ? "LinkedIn membantu profil profesional (opsional)."
          : "LinkedIn helps your professional profile (optional).",
      0,
      4,
    ),
  );

  const contentFit = estimateContentScore(data, paperSize);
  checks.push(
    check(
      "one-page",
      isId ? "Muat 1 halaman" : "One-page fit",
      contentFit <= 75 ? "pass" : contentFit <= 90 ? "warn" : "fail",
      contentFit <= 75
        ? isId
          ? "Konten pas untuk CV satu halaman."
          : "Content fits one page well."
        : contentFit <= 90
          ? isId
            ? "Konten hampir kepanjangan — pertimbangkan ringkas."
            : "Content nearly too long — consider trimming."
          : isId
            ? "Konten terlalu panjang — ringkas untuk 1 halaman."
            : "Content too long — trim for one page.",
      0,
      10,
    ),
  );

  const totalEarned = checks.reduce((sum, c) => sum + c.points, 0);
  const totalMax = checks.reduce((sum, c) => sum + c.maxPoints, 0);
  const score = Math.round((totalEarned / totalMax) * 100);

  return {
    score,
    grade: gradeFromScore(score),
    checks,
    contentFit,
  };
}
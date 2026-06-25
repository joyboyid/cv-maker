import { t } from "@/lib/i18n";
import type { Certification, Language } from "@/types/resume";

export function formatCertificationDates(
  cert: Certification,
  lang: Language,
): string | null {
  const parts: string[] = [];

  if (cert.issueDate) {
    parts.push(`${t(lang, "certIssued")}: ${cert.issueDate}`);
  }

  if (cert.expireDate) {
    parts.push(`${t(lang, "certExpires")}: ${cert.expireDate}`);
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}

export function hasCertificationDetails(cert: Certification): boolean {
  return Boolean(cert.issueDate || cert.expireDate || cert.credentialId);
}
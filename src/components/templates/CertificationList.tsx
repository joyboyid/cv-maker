import {
  formatCertificationDates,
  hasCertificationDetails,
} from "@/lib/format-certification";
import { t } from "@/lib/i18n";
import type { Certification, Language } from "@/types/resume";

interface CertificationListProps {
  items: Certification[];
  lang: Language;
  variant?: "default" | "sidebar";
}

export function CertificationList({
  items,
  lang,
  variant = "default",
}: CertificationListProps) {
  const mutedClass =
    variant === "sidebar" ? "resume-muted" : "resume-muted";
  const mutedStyle =
    variant === "sidebar"
      ? { color: "rgba(255,255,255,0.85)", fontSize: 10 }
      : undefined;

  return (
    <ul
      className="resume-list"
      style={{
        listStyle: "none",
        paddingLeft: 0,
        ...(variant === "sidebar"
          ? { color: "rgba(255,255,255,0.9)" }
          : {}),
      }}
    >
      {items.map((cert) => {
        const dates = formatCertificationDates(cert, lang);

        return (
          <li key={cert.id} style={{ marginTop: variant === "sidebar" ? 6 : 4 }}>
            <p
              className={variant === "sidebar" ? undefined : "resume-bold"}
              style={
                variant === "sidebar"
                  ? { fontSize: 10, fontWeight: 600, color: "#ffffff" }
                  : undefined
              }
            >
              {cert.name}
            </p>
            {hasCertificationDetails(cert) ? (
              <>
                {dates ? (
                  <p className={mutedClass} style={mutedStyle}>
                    {dates}
                  </p>
                ) : null}
                {cert.credentialId ? (
                  <p className={mutedClass} style={mutedStyle}>
                    {t(lang, "certCredential")}: {cert.credentialId}
                  </p>
                ) : null}
              </>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
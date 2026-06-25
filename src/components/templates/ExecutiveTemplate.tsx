import { ExtraSections } from "@/components/templates/ExtraSections";
import { t } from "@/lib/i18n";
import type { ResumeData, ResumeSettings } from "@/types/resume";

export function ExecutiveTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const lang = settings.language;
  const accent = settings.accentColor;

  return (
    <div className="resume-pad">
      <header style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 14 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.title ? (
          <p style={{ marginTop: 4, fontSize: 13, fontWeight: 600, color: accent }}>{data.personal.title}</p>
        ) : null}
        <p className="resume-contact" style={{ marginTop: 8 }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin].filter(Boolean).join("  |  ")}
        </p>
      </header>

      {data.personal.summary ? (
        <section style={{ marginTop: 16 }}>
          <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "summary")}</h2>
          <p className="resume-body-sm" style={{ marginTop: 6 }}>{data.personal.summary}</p>
        </section>
      ) : null}

      {data.experiences.length > 0 ? (
        <section style={{ marginTop: 16 }}>
          <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "experiences")}</h2>
          <div style={{ marginTop: 10 }}>
            {data.experiences.map((exp) => (
              <div key={exp.id} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 72, flexShrink: 0, fontSize: 10, color: "#64748b", paddingTop: 2 }}>
                  {exp.startDate}<br />–<br />{exp.current ? t(lang, "present") : exp.endDate}
                </div>
                <div style={{ flex: 1, borderLeft: `2px solid ${accent}33`, paddingLeft: 12 }}>
                  <p className="resume-bold">{exp.position}</p>
                  <p className="resume-muted">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                  {exp.bullets.length > 0 ? <ul className="resume-list">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="resume-two-col" style={{ marginTop: 14 }}>
        {data.education.length > 0 ? (
          <section>
            <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "education")}</h2>
            <div className="resume-stack-sm" style={{ marginTop: 8 }}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="resume-bold">{edu.degree} {edu.field}</p>
                  <p className="resume-muted">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
        {data.skills.length > 0 ? (
          <section>
            <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "skills")}</h2>
            <p className="resume-body" style={{ marginTop: 8 }}>{data.skills.join(", ")}</p>
          </section>
        ) : null}
      </div>

      <ExtraSections data={data} lang={lang} accent={accent} include={["awards", "volunteers", "publications", "certifications", "languages", "projects"]} />
    </div>
  );
}
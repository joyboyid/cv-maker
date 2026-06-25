import { ExtraSections } from "@/components/templates/ExtraSections";
import { t } from "@/lib/i18n";
import type { ResumeData, ResumeSettings } from "@/types/resume";

export function AcademicTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const lang = settings.language;
  const accent = settings.accentColor;
  const contact = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean);

  return (
    <div className="resume-pad" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <header className="resume-divider" style={{ paddingBottom: 12 }}>
        <h1 className="resume-title-lg" style={{ color: accent }}>
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.title ? <p className="resume-subtitle resume-italic" style={{ marginTop: 4 }}>{data.personal.title}</p> : null}
        {contact.length > 0 ? <p className="resume-contact" style={{ marginTop: 6 }}>{contact.join(" · ")}</p> : null}
      </header>

      {data.education.length > 0 ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title resume-divider" style={{ color: accent, borderColor: accent, paddingBottom: 4 }}>
            {t(lang, "education")}
          </h2>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="resume-bold">{edu.institution}</p>
                <p className="resume-muted">{edu.degree} {edu.field} · {edu.startDate} – {edu.endDate}{edu.gpa ? ` · ${edu.gpa}` : ""}</p>
                {edu.highlights.length > 0 ? (
                  <ul className="resume-list">{edu.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.personal.summary ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "summary")}</h2>
          <p className="resume-body-sm" style={{ marginTop: 6 }}>{data.personal.summary}</p>
        </section>
      ) : null}

      <ExtraSections data={data} lang={lang} accent={accent} include={["publications"]} />

      {data.experiences.length > 0 ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "experiences")}</h2>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="resume-bold">{exp.position} — {exp.company}</p>
                <p className="resume-muted">{exp.startDate} – {exp.current ? t(lang, "present") : exp.endDate}</p>
                {exp.bullets.length > 0 ? <ul className="resume-list">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.skills.length > 0 ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "skills")}</h2>
          <p className="resume-body" style={{ marginTop: 6 }}>{data.skills.join(" · ")}</p>
        </section>
      ) : null}

      <ExtraSections data={data} lang={lang} accent={accent} include={["volunteers", "awards", "certifications", "languages", "projects"]} />
    </div>
  );
}
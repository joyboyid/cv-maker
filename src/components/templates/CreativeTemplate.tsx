import { ExtraSections } from "@/components/templates/ExtraSections";
import { t } from "@/lib/i18n";
import type { ResumeData, ResumeSettings } from "@/types/resume";

export function CreativeTemplate({ data, settings }: { data: ResumeData; settings: ResumeSettings }) {
  const lang = settings.language;
  const accent = settings.accentColor;

  return (
    <div>
      <header style={{ backgroundColor: accent, color: "#fff", padding: "28px 32px 24px" }}>
        <h1 className="resume-title-lg" style={{ color: "#fff" }}>{data.personal.fullName || "Your Name"}</h1>
        {data.personal.title ? <p style={{ marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>{data.personal.title}</p> : null}
        <p style={{ marginTop: 10, fontSize: 10, color: "rgba(255,255,255,0.85)" }}>
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website].filter(Boolean).join(" · ")}
        </p>
      </header>

      <div className="resume-pad" style={{ paddingTop: 20 }}>
        {data.personal.summary ? (
          <section>
            <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "summary")}</h2>
            <p className="resume-body-sm" style={{ marginTop: 6 }}>{data.personal.summary}</p>
          </section>
        ) : null}

        {data.skills.length > 0 ? (
          <section style={{ marginTop: 14 }}>
            <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "skills")}</h2>
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 999, backgroundColor: `${accent}18`, color: accent, fontWeight: 600 }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {data.experiences.length > 0 ? (
          <section style={{ marginTop: 14 }}>
            <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "experiences")}</h2>
            <div className="resume-stack-sm" style={{ marginTop: 8 }}>
              {data.experiences.map((exp) => (
                <div key={exp.id} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 10 }}>
                  <p className="resume-bold">{exp.position}</p>
                  <p className="resume-muted">{exp.company} · {exp.startDate} – {exp.current ? t(lang, "present") : exp.endDate}</p>
                  {exp.bullets.length > 0 ? <ul className="resume-list">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {data.education.length > 0 ? (
          <section style={{ marginTop: 14 }}>
            <h2 className="resume-section-title" style={{ color: accent }}>{t(lang, "education")}</h2>
            <div className="resume-stack-sm" style={{ marginTop: 8 }}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="resume-bold">{edu.degree} {edu.field}</p>
                  <p className="resume-muted">{edu.institution} · {edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <ExtraSections data={data} lang={lang} accent={accent} include={["projects", "volunteers", "awards", "publications", "certifications", "languages"]} />
      </div>
    </div>
  );
}
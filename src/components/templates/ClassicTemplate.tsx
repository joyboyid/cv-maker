import { ExtraSections } from "@/components/templates/ExtraSections";
import { t } from "@/lib/i18n";
import type { ResumeData, ResumeSettings } from "@/types/resume";

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export function ClassicTemplate({ data, settings }: TemplateProps) {
  const lang = settings.language;
  const accent = settings.accentColor;
  const contact = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.linkedin,
    data.personal.website,
  ].filter(Boolean);

  return (
    <div className="resume-pad" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <header className="resume-classic-header">
        <h1 className="resume-title-lg" style={{ color: accent }}>
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.title ? (
          <p className="resume-subtitle resume-italic" style={{ marginTop: 4 }}>
            {data.personal.title}
          </p>
        ) : null}
        {contact.length > 0 ? (
          <p className="resume-contact">{contact.join(" | ")}</p>
        ) : null}
        <div className="resume-classic-rule" style={{ backgroundColor: accent }} />
      </header>

      {data.personal.summary ? (
        <section style={{ marginTop: 18 }}>
          <h2
            className="resume-section-title resume-center-title resume-divider"
            style={{ color: accent, borderColor: accent, paddingBottom: 4 }}
          >
            {t(lang, "summary")}
          </h2>
          <p
            className="resume-body-sm resume-center-title"
            style={{ marginTop: 8 }}
          >
            {data.personal.summary}
          </p>
        </section>
      ) : null}

      {data.experiences.length > 0 ? (
        <section style={{ marginTop: 18 }}>
          <h2
            className="resume-section-title resume-divider"
            style={{ color: accent, borderColor: accent, paddingBottom: 4 }}
          >
            {t(lang, "experiences")}
          </h2>
          <div className="resume-stack-sm" style={{ marginTop: 10 }}>
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <p className="resume-bold">{exp.position}</p>
                  <p className="resume-muted resume-italic">
                    {exp.startDate} –{" "}
                    {exp.current ? t(lang, "present") : exp.endDate}
                  </p>
                </div>
                <p className="resume-muted">
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ""}
                </p>
                {exp.bullets.length > 0 ? (
                  <ul className="resume-list">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.education.length > 0 ? (
        <section style={{ marginTop: 18 }}>
          <h2
            className="resume-section-title resume-divider"
            style={{ color: accent, borderColor: accent, paddingBottom: 4 }}
          >
            {t(lang, "education")}
          </h2>
          <div className="resume-stack-sm" style={{ marginTop: 10 }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <p className="resume-bold">{edu.institution}</p>
                  <p className="resume-muted resume-italic">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
                <p className="resume-muted">
                  {edu.degree} {edu.field}
                  {edu.gpa ? ` · ${edu.gpa}` : ""}
                </p>
                {edu.highlights.length > 0 ? (
                  <ul className="resume-list">
                    {edu.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.skills.length > 0 || data.languages.length > 0 ? (
        <section className="resume-two-col" style={{ marginTop: 18 }}>
          {data.skills.length > 0 ? (
            <div>
              <h2
                className="resume-section-title resume-divider"
                style={{ color: accent, borderColor: accent, paddingBottom: 4 }}
              >
                {t(lang, "skills")}
              </h2>
              <p className="resume-body" style={{ marginTop: 8 }}>
                {data.skills.join(", ")}
              </p>
            </div>
          ) : null}
          {data.languages.length > 0 ? (
            <div>
              <h2
                className="resume-section-title resume-divider"
                style={{ color: accent, borderColor: accent, paddingBottom: 4 }}
              >
                {t(lang, "languages")}
              </h2>
              <ul className="resume-list" style={{ listStyle: "none", paddingLeft: 0 }}>
                {data.languages.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {data.projects.length > 0 ? (
        <section style={{ marginTop: 18 }}>
          <h2
            className="resume-section-title resume-divider"
            style={{ color: accent, borderColor: accent, paddingBottom: 4 }}
          >
            {t(lang, "projects")}
          </h2>
          <div className="resume-stack-sm" style={{ marginTop: 10 }}>
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="resume-bold">{project.name}</p>
                {project.link ? (
                  <p className="resume-muted resume-italic">{project.link}</p>
                ) : null}
                {project.description ? (
                  <p className="resume-muted">{project.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ExtraSections
        data={data}
        lang={lang}
        accent={accent}
        include={[
          "certifications",
          "volunteers",
          "awards",
          "publications",
        ]}
      />
    </div>
  );
}
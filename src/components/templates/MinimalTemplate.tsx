import { ExtraSections } from "@/components/templates/ExtraSections";
import { t } from "@/lib/i18n";
import type { ResumeData, ResumeSettings } from "@/types/resume";

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export function MinimalTemplate({ data, settings }: TemplateProps) {
  const lang = settings.language;
  const contact = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.linkedin,
    data.personal.website,
  ].filter(Boolean);

  return (
    <div className="resume-pad">
      <header className="resume-divider" style={{ paddingBottom: 14 }}>
        <h1 className="resume-title">
          {data.personal.fullName || "Your Name"}
        </h1>
        {data.personal.title ? (
          <p className="resume-subtitle" style={{ marginTop: 4 }}>
            {data.personal.title}
          </p>
        ) : null}
        {contact.length > 0 ? (
          <p className="resume-contact" style={{ marginTop: 8 }}>
            {contact.join(" · ")}
          </p>
        ) : null}
      </header>

      {data.personal.summary ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title">{t(lang, "summary")}</h2>
          <p className="resume-body-sm" style={{ marginTop: 6 }}>
            {data.personal.summary}
          </p>
        </section>
      ) : null}

      {data.experiences.length > 0 ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title">{t(lang, "experiences")}</h2>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
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
                  <p className="resume-muted">
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
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title">{t(lang, "education")}</h2>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className="resume-bold">
                  {edu.degree} {edu.field}
                </p>
                <p className="resume-muted">
                  {edu.institution} · {edu.startDate} – {edu.endDate}
                  {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
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

      {data.skills.length > 0 ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title">{t(lang, "skills")}</h2>
          <p className="resume-body" style={{ marginTop: 6 }}>
            {data.skills.join(" · ")}
          </p>
        </section>
      ) : null}

      {data.projects.length > 0 ? (
        <section style={{ marginTop: 14 }}>
          <h2 className="resume-section-title">{t(lang, "projects")}</h2>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="resume-bold">
                  {project.name}
                  {project.link ? (
                    <span className="resume-muted"> — {project.link}</span>
                  ) : null}
                </p>
                {project.description ? (
                  <p className="resume-muted">{project.description}</p>
                ) : null}
                {project.bullets.length > 0 ? (
                  <ul className="resume-list">
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ExtraSections
        data={data}
        lang={lang}
        include={[
          "languages",
          "certifications",
          "volunteers",
          "awards",
          "publications",
        ]}
      />
    </div>
  );
}
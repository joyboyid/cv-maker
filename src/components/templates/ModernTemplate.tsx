import { CertificationList } from "@/components/templates/CertificationList";
import { ExtraSections } from "@/components/templates/ExtraSections";
import { t } from "@/lib/i18n";
import type { ResumeData, ResumeSettings } from "@/types/resume";

interface TemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export function ModernTemplate({ data, settings }: TemplateProps) {
  const lang = settings.language;
  const accent = settings.accentColor;

  return (
    <div className="resume-layout-modern">
      <aside className="resume-sidebar" style={{ backgroundColor: accent }}>
        <h1 className="resume-title">{data.personal.fullName || "Your Name"}</h1>
        {data.personal.title ? (
          <p className="resume-subtitle" style={{ marginTop: 6 }}>
            {data.personal.title}
          </p>
        ) : null}

        <div className="resume-sidebar-contact">
          {data.personal.email ? <p>{data.personal.email}</p> : null}
          {data.personal.phone ? <p>{data.personal.phone}</p> : null}
          {data.personal.location ? <p>{data.personal.location}</p> : null}
          {data.personal.linkedin ? <p>{data.personal.linkedin}</p> : null}
          {data.personal.website ? <p>{data.personal.website}</p> : null}
        </div>

        {data.skills.length > 0 ? (
          <div style={{ marginTop: 24 }}>
            <h2>{t(lang, "skills")}</h2>
            <ul style={{ marginTop: 8, padding: 0, listStyle: "none" }}>
              {data.skills.map((skill, i) => (
                <li key={i} className="resume-skill-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.languages.length > 0 ? (
          <div style={{ marginTop: 20 }}>
            <h2>{t(lang, "languages")}</h2>
            <ul
              className="resume-list"
              style={{ marginTop: 8, listStyle: "none", paddingLeft: 0, color: "rgba(255,255,255,0.9)" }}
            >
              {data.languages.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {data.certifications.length > 0 ? (
          <div style={{ marginTop: 20 }}>
            <h2>{t(lang, "certifications")}</h2>
            <div style={{ marginTop: 8 }}>
              <CertificationList
                items={data.certifications}
                lang={lang}
                variant="sidebar"
              />
            </div>
          </div>
        ) : null}
      </aside>

      <main className="resume-main">
        {data.personal.summary ? (
          <section>
            <h2 className="resume-section-title" style={{ color: accent }}>
              {t(lang, "summary")}
            </h2>
            <p className="resume-body-sm" style={{ marginTop: 8 }}>
              {data.personal.summary}
            </p>
          </section>
        ) : null}

        {data.experiences.length > 0 ? (
          <section style={{ marginTop: 18 }}>
            <h2 className="resume-section-title" style={{ color: accent }}>
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
                    <div>
                      <p className="resume-bold">{exp.position}</p>
                      <p className="resume-muted">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </p>
                    </div>
                    <p className="resume-muted">
                      {exp.startDate} –{" "}
                      {exp.current ? t(lang, "present") : exp.endDate}
                    </p>
                  </div>
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
            <h2 className="resume-section-title" style={{ color: accent }}>
              {t(lang, "education")}
            </h2>
            <div className="resume-stack-sm" style={{ marginTop: 10 }}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="resume-bold">
                    {edu.degree} {edu.field}
                  </p>
                  <p className="resume-muted">
                    {edu.institution} · {edu.startDate} – {edu.endDate}
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

        {data.projects.length > 0 ? (
          <section style={{ marginTop: 18 }}>
            <h2 className="resume-section-title" style={{ color: accent }}>
              {t(lang, "projects")}
            </h2>
            <div className="resume-stack-sm" style={{ marginTop: 10 }}>
              {data.projects.map((project) => (
                <div key={project.id}>
                  <p className="resume-bold">
                    {project.name}
                    {project.link ? (
                      <span className="resume-muted"> · {project.link}</span>
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
          accent={accent}
          include={["volunteers", "awards", "publications"]}
        />
      </main>
    </div>
  );
}
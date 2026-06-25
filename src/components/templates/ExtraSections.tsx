import { CertificationList } from "@/components/templates/CertificationList";
import { t } from "@/lib/i18n";
import type { Language, ResumeData } from "@/types/resume";

interface ExtraSectionsProps {
  data: ResumeData;
  lang: Language;
  accent?: string;
  variant?: "default" | "sidebar" | "compact";
  include?: Array<
    | "volunteers"
    | "awards"
    | "publications"
    | "certifications"
    | "languages"
    | "projects"
  >;
}

function SectionHeading({
  children,
  accent,
  variant,
}: {
  children: React.ReactNode;
  accent?: string;
  variant: ExtraSectionsProps["variant"];
}) {
  if (variant === "sidebar") {
    return <h2>{children}</h2>;
  }

  return (
    <h2
      className="resume-section-title"
      style={accent ? { color: accent } : undefined}
    >
      {children}
    </h2>
  );
}

export function ExtraSections({
  data,
  lang,
  accent,
  variant = "default",
  include,
}: ExtraSectionsProps) {
  const show = (key: NonNullable<ExtraSectionsProps["include"]>[number]) =>
    !include || include.includes(key);

  const sectionStyle = { marginTop: variant === "compact" ? 12 : 14 };

  return (
    <>
      {show("languages") && data.languages.length > 0 ? (
        <section style={sectionStyle}>
          <SectionHeading accent={accent} variant={variant}>
            {t(lang, "languages")}
          </SectionHeading>
          <ul
            className="resume-list"
            style={{
              listStyle: "none",
              paddingLeft: 0,
              ...(variant === "sidebar"
                ? { color: "rgba(255,255,255,0.9)", marginTop: 8 }
                : { marginTop: 6 }),
            }}
          >
            {data.languages.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {show("certifications") && data.certifications.length > 0 ? (
        <section style={sectionStyle}>
          <SectionHeading accent={accent} variant={variant}>
            {t(lang, "certifications")}
          </SectionHeading>
          <div style={{ marginTop: variant === "sidebar" ? 8 : 6 }}>
            <CertificationList
              items={data.certifications}
              lang={lang}
              variant={variant === "sidebar" ? "sidebar" : "default"}
            />
          </div>
        </section>
      ) : null}

      {show("projects") && data.projects.length > 0 ? (
        <section style={sectionStyle}>
          <SectionHeading accent={accent} variant={variant}>
            {t(lang, "projects")}
          </SectionHeading>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
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

      {show("volunteers") && data.volunteers.length > 0 ? (
        <section style={sectionStyle}>
          <SectionHeading accent={accent} variant={variant}>
            {t(lang, "volunteers")}
          </SectionHeading>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.volunteers.map((vol) => (
              <div key={vol.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <p className="resume-bold">{vol.role}</p>
                  <p className="resume-muted">
                    {vol.startDate} –{" "}
                    {vol.current ? t(lang, "present") : vol.endDate}
                  </p>
                </div>
                <p className="resume-muted">
                  {vol.organization}
                  {vol.location ? ` · ${vol.location}` : ""}
                </p>
                {vol.description ? (
                  <p className="resume-body" style={{ marginTop: 2 }}>
                    {vol.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {show("awards") && data.awards.length > 0 ? (
        <section style={sectionStyle}>
          <SectionHeading accent={accent} variant={variant}>
            {t(lang, "awards")}
          </SectionHeading>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.awards.map((award) => (
              <div key={award.id}>
                <p className="resume-bold">{award.title}</p>
                <p className="resume-muted">
                  {award.issuer}
                  {award.date ? ` · ${award.date}` : ""}
                </p>
                {award.description ? (
                  <p className="resume-body" style={{ marginTop: 2 }}>
                    {award.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {show("publications") && data.publications.length > 0 ? (
        <section style={sectionStyle}>
          <SectionHeading accent={accent} variant={variant}>
            {t(lang, "publications")}
          </SectionHeading>
          <div className="resume-stack-sm" style={{ marginTop: 8 }}>
            {data.publications.map((pub) => (
              <div key={pub.id}>
                <p className="resume-bold">{pub.title}</p>
                <p className="resume-muted">
                  {pub.publisher}
                  {pub.date ? ` · ${pub.date}` : ""}
                  {pub.link ? ` · ${pub.link}` : ""}
                </p>
                {pub.description ? (
                  <p className="resume-body" style={{ marginTop: 2 }}>
                    {pub.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
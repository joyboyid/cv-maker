"use client";

import { useState } from "react";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { pt } from "@/lib/portfolio-i18n";
import { getInitials, normalizeExternalUrl } from "@/lib/portfolio-utils";
import type { PortfolioData, PortfolioSettings } from "@/types/portfolio";

export function PortfolioAvatar({
  name,
  avatarUrl,
  accentColor,
}: {
  name: string;
  avatarUrl: string;
  accentColor?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = avatarUrl.trim() && !failed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name || "Avatar"}
        className="portfolio-avatar"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="portfolio-avatar-fallback"
      style={accentColor ? { background: accentColor, color: "#ffffff" } : undefined}
    >
      {getInitials(name || "?")}
    </div>
  );
}

export function PortfolioLinks({
  profile,
  lang,
  inverted = false,
}: {
  profile: PortfolioData["profile"];
  lang: PortfolioSettings["language"];
  inverted?: boolean;
}) {
  const links = [
    { key: "email", label: profile.email, href: profile.email ? `mailto:${profile.email}` : "" },
    { key: "phone", label: profile.phone, href: profile.phone ? `tel:${profile.phone}` : "" },
    { key: "location", label: profile.location, href: "" },
    { key: "github", label: "GitHub", href: normalizeExternalUrl(profile.github) },
    { key: "linkedin", label: "LinkedIn", href: normalizeExternalUrl(profile.linkedin) },
    { key: "website", label: "Website", href: normalizeExternalUrl(profile.website) },
    { key: "behance", label: "Behance", href: normalizeExternalUrl(profile.behance) },
  ].filter((item) => item.label.trim());

  if (links.length === 0) return null;

  return (
    <div className="portfolio-links">
      {links.map((item) =>
        item.href ? (
          <a
            key={item.key}
            href={item.href}
            target={item.key === "email" || item.key === "phone" ? undefined : "_blank"}
            rel={item.key === "email" || item.key === "phone" ? undefined : "noopener noreferrer"}
            className="portfolio-link"
            style={
              inverted
                ? { background: "rgba(255,255,255,0.14)", color: "#ffffff" }
                : undefined
            }
          >
            {item.key === "github" ? <GitHubIcon className="h-3.5 w-3.5" /> : null}
            {item.label}
          </a>
        ) : (
          <span
            key={item.key}
            className="portfolio-link"
            style={
              inverted
                ? { background: "rgba(255,255,255,0.14)", color: "#ffffff" }
                : undefined
            }
          >
            {item.label}
          </span>
        ),
      )}
    </div>
  );
}

function ProjectImage({ name, imageUrl }: { name: string; imageUrl: string }) {
  const [failed, setFailed] = useState(false);
  const showImage = imageUrl.trim() && !failed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        className="portfolio-project-image"
        onError={() => setFailed(true)}
      />
    );
  }

  return <div className="portfolio-project-image-fallback">{name || "Project"}</div>;
}

export function PortfolioProjects({
  projects,
  lang,
  accentColor,
  dark = false,
}: {
  projects: PortfolioData["projects"];
  lang: PortfolioSettings["language"];
  accentColor: string;
  dark?: boolean;
}) {
  if (projects.length === 0) return null;

  const featured = projects.filter((project) => project.featured);
  const regular = projects.filter((project) => !project.featured);
  const sections = [
    { title: pt(lang, "featuredProjects"), items: featured },
    { title: pt(lang, "allProjects"), items: regular },
  ].filter((section) => section.items.length > 0);

  if (featured.length === 0 && regular.length > 0) {
    sections.splice(0, sections.length, { title: pt(lang, "projects"), items: projects });
  }

  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="portfolio-section">
          <h2 className="portfolio-section-title">{section.title}</h2>
          <div className="portfolio-project-grid" style={{ marginTop: 16 }}>
            {section.items.map((project) => (
              <article key={project.id} className="portfolio-project-card">
                <ProjectImage name={project.name} imageUrl={project.imageUrl} />
                <div className="portfolio-project-body">
                  <h3 className="portfolio-project-name">{project.name}</h3>
                  {project.description ? (
                    <p className="portfolio-project-desc">{project.description}</p>
                  ) : null}
                  {project.techStack.length > 0 ? (
                    <div className="portfolio-tech">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="portfolio-tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="portfolio-project-actions">
                    {project.link ? (
                      <a
                        href={normalizeExternalUrl(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-btn portfolio-btn-secondary"
                        style={dark ? undefined : undefined}
                      >
                        {pt(lang, "viewProject")}
                      </a>
                    ) : null}
                    {project.demoLink ? (
                      <a
                        href={normalizeExternalUrl(project.demoLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-btn portfolio-btn-primary"
                        style={{ backgroundColor: accentColor }}
                      >
                        {pt(lang, "viewDemo")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export function PortfolioSkills({
  skills,
  lang,
  accentColor,
  inverted = false,
}: {
  skills: string[];
  lang: PortfolioSettings["language"];
  accentColor: string;
  inverted?: boolean;
}) {
  if (skills.length === 0) return null;

  return (
    <section className="portfolio-section">
      <h2 className="portfolio-section-title">{pt(lang, "skills")}</h2>
      <div className="portfolio-skill-grid" style={{ marginTop: 16 }}>
        {skills.map((skill) => (
          <span
            key={skill}
            className="portfolio-skill"
            style={
              inverted
                ? { background: "rgba(255,255,255,0.14)", color: "#ffffff" }
                : { borderLeft: `3px solid ${accentColor}` }
            }
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
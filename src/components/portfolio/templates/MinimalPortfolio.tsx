import {
  PortfolioAvatar,
  PortfolioLinks,
  PortfolioProjects,
  PortfolioSkills,
} from "@/components/portfolio/PortfolioParts";
import { pt } from "@/lib/portfolio-i18n";
import type { PortfolioData, PortfolioSettings } from "@/types/portfolio";

interface MinimalPortfolioProps {
  data: PortfolioData;
  settings: PortfolioSettings;
}

export function MinimalPortfolio({ data, settings }: MinimalPortfolioProps) {
  const { profile, skills, projects } = data;
  const lang = settings.language;

  return (
    <div className="portfolio-doc">
      <section className="portfolio-hero" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PortfolioAvatar
            name={profile.fullName}
            avatarUrl={profile.avatarUrl}
            accentColor={settings.accentColor}
          />
        </div>
        <h1 className="portfolio-name" style={{ marginTop: 16 }}>
          {profile.fullName || "Your Name"}
        </h1>
        {profile.tagline ? (
          <p className="portfolio-tagline">{profile.tagline}</p>
        ) : null}
        <PortfolioLinks profile={profile} lang={lang} />
      </section>

      {profile.bio ? (
        <section className="portfolio-section">
          <h2 className="portfolio-section-title">{pt(lang, "about")}</h2>
          <p className="portfolio-bio" style={{ marginTop: 12 }}>
            {profile.bio}
          </p>
        </section>
      ) : null}

      <PortfolioSkills
        skills={skills}
        lang={lang}
        accentColor={settings.accentColor}
      />
      <PortfolioProjects
        projects={projects}
        lang={lang}
        accentColor={settings.accentColor}
      />
    </div>
  );
}
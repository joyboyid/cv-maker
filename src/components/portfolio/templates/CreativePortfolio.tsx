import {
  PortfolioAvatar,
  PortfolioLinks,
  PortfolioProjects,
  PortfolioSkills,
} from "@/components/portfolio/PortfolioParts";
import { pt } from "@/lib/portfolio-i18n";
import type { PortfolioData, PortfolioSettings } from "@/types/portfolio";

interface CreativePortfolioProps {
  data: PortfolioData;
  settings: PortfolioSettings;
}

export function CreativePortfolio({ data, settings }: CreativePortfolioProps) {
  const { profile, skills, projects } = data;
  const lang = settings.language;

  return (
    <div className="portfolio-doc portfolio-creative">
      <section
        className="portfolio-creative-hero"
        style={{
          background: `linear-gradient(135deg, ${settings.accentColor}, #0f172a)`,
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <PortfolioAvatar name={profile.fullName} avatarUrl={profile.avatarUrl} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <h1 className="portfolio-name">{profile.fullName || "Your Name"}</h1>
            {profile.tagline ? (
              <p className="portfolio-tagline">{profile.tagline}</p>
            ) : null}
          </div>
        </div>
        <PortfolioLinks profile={profile} lang={lang} inverted />
      </section>

      {profile.bio ? (
        <section className="portfolio-section">
          <h2
            className="portfolio-section-title"
            style={{ color: settings.accentColor }}
          >
            {pt(lang, "about")}
          </h2>
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
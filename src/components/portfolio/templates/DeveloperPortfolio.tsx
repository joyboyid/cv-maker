import {
  PortfolioAvatar,
  PortfolioLinks,
  PortfolioProjects,
  PortfolioSkills,
} from "@/components/portfolio/PortfolioParts";
import { pt } from "@/lib/portfolio-i18n";
import type { PortfolioData, PortfolioSettings } from "@/types/portfolio";

interface DeveloperPortfolioProps {
  data: PortfolioData;
  settings: PortfolioSettings;
}

export function DeveloperPortfolio({ data, settings }: DeveloperPortfolioProps) {
  const { profile, skills, projects } = data;
  const lang = settings.language;

  return (
    <div className="portfolio-doc portfolio-dev">
      <section
        className="portfolio-hero"
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "1px solid #334155",
        }}
      >
        <PortfolioAvatar
          name={profile.fullName}
          avatarUrl={profile.avatarUrl}
          accentColor={settings.accentColor}
        />
        <div style={{ flex: 1, minWidth: 220 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: settings.accentColor,
              fontWeight: 700,
            }}
          >
            {pt(lang, "builder")}
          </p>
          <h1 className="portfolio-name" style={{ marginTop: 6 }}>
            {profile.fullName || "Your Name"}
          </h1>
          {profile.tagline ? (
            <p className="portfolio-tagline">{profile.tagline}</p>
          ) : null}
          <PortfolioLinks profile={profile} lang={lang} inverted />
        </div>
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
        inverted
      />
      <PortfolioProjects
        projects={projects}
        lang={lang}
        accentColor={settings.accentColor}
        dark
      />
    </div>
  );
}
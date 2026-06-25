import { CreativePortfolio } from "@/components/portfolio/templates/CreativePortfolio";
import { DeveloperPortfolio } from "@/components/portfolio/templates/DeveloperPortfolio";
import { MinimalPortfolio } from "@/components/portfolio/templates/MinimalPortfolio";
import type { PortfolioData, PortfolioSettings } from "@/types/portfolio";

interface PortfolioRendererProps {
  data: PortfolioData;
  settings: PortfolioSettings;
}

export function PortfolioRenderer({ data, settings }: PortfolioRendererProps) {
  switch (settings.template) {
    case "creative":
      return <CreativePortfolio data={data} settings={settings} />;
    case "developer":
      return <DeveloperPortfolio data={data} settings={settings} />;
    case "minimal":
    default:
      return <MinimalPortfolio data={data} settings={settings} />;
  }
}
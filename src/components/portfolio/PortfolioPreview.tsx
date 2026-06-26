"use client";

import { forwardRef, useMemo } from "react";
import { PortfolioRenderer } from "@/components/portfolio/templates/PortfolioRenderer";
import { mergePortfolioData } from "@/lib/sanitize-portfolio";
import type { PortfolioData, PortfolioSettings } from "@/types/portfolio";
import "@/styles/portfolio-document.css";

interface PortfolioPreviewProps {
  data: PortfolioData;
  settings: PortfolioSettings;
}

export const PortfolioPreview = forwardRef<HTMLDivElement, PortfolioPreviewProps>(
  function PortfolioPreview({ data, settings }, ref) {
    const cleanData = useMemo(() => mergePortfolioData(data), [data]);

    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="shell-preview-frame">
          <div className="max-h-[80vh] overflow-y-auto">
            <div ref={ref} id="portfolio-preview">
              <PortfolioRenderer data={cleanData} settings={settings} />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
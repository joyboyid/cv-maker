"use client";

import {
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import {
  computeDynamicPageLayout,
  getPaperDimensions,
  type DynamicPageLayout,
} from "@/lib/resume-layout";
import { sanitizeResumeData } from "@/lib/sanitize-resume";
import type { ResumeData, ResumeSettings } from "@/types/resume";
import "@/styles/resume-document.css";

interface ResumePreviewProps {
  data: ResumeData;
  settings: ResumeSettings;
  onPageLayoutChange?: (layout: DynamicPageLayout) => void;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  function ResumePreview({ data, settings, onPageLayoutChange }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [displayScale, setDisplayScale] = useState(1);
    const [pageLayout, setPageLayout] = useState<DynamicPageLayout>(() =>
      computeDynamicPageLayout(0, settings.paperSize),
    );

    const paper = useMemo(
      () => getPaperDimensions(settings.paperSize),
      [settings.paperSize],
    );

    const cleanData = useMemo(() => sanitizeResumeData(data), [data]);
    const measureKey = useMemo(
      () =>
        JSON.stringify({
          data: cleanData,
          template: settings.template,
          language: settings.language,
          accentColor: settings.accentColor,
          paperSize: settings.paperSize,
        }),
      [
        cleanData,
        settings.template,
        settings.language,
        settings.accentColor,
        settings.paperSize,
      ],
    );

    useLayoutEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateDisplayScale = () => {
        const width = container.clientWidth;
        setDisplayScale(width > 0 ? width / paper.widthPx : 1);
      };

      updateDisplayScale();
      const observer = new ResizeObserver(updateDisplayScale);
      observer.observe(container);
      return () => observer.disconnect();
    }, [paper.widthPx]);

    useLayoutEffect(() => {
      const measure = measureRef.current;
      if (!measure) return;

      const updateLayout = () => {
        const naturalHeight = measure.scrollHeight;
        const layout = computeDynamicPageLayout(
          naturalHeight,
          settings.paperSize,
        );
        setPageLayout(layout);
        onPageLayoutChange?.(layout);
      };

      updateLayout();
      const observer = new ResizeObserver(updateLayout);
      observer.observe(measure);
      return () => observer.disconnect();
    }, [measureKey, settings.paperSize, onPageLayoutChange]);

    const scaledWrapperHeight = pageLayout.heightPx * displayScale;

    return (
      <div
        className="mx-auto w-full"
        style={{ maxWidth: `${pageLayout.widthMm}mm` }}
      >
        <div
          ref={containerRef}
          className="shell-preview-frame relative w-full overflow-hidden rounded-sm bg-white"
          style={{ height: scaledWrapperHeight }}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              width: pageLayout.widthPx,
              height: pageLayout.heightPx,
              transform: `scale(${displayScale})`,
              transformOrigin: "top left",
            }}
          >
            <div
              ref={ref}
              id="resume-preview"
              className="resume-doc"
              style={{
                width: pageLayout.widthPx,
                height: pageLayout.heightPx,
              }}
            >
              <div
                className="resume-doc-inner"
                style={{
                  width: pageLayout.widthPx,
                  transform:
                    pageLayout.contentScale < 1
                      ? `scale(${pageLayout.contentScale})`
                      : undefined,
                  transformOrigin: "top left",
                }}
              >
                <TemplateRenderer data={cleanData} settings={settings} />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={measureRef}
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: -10000,
            width: paper.widthPx,
            visibility: "hidden",
            pointerEvents: "none",
            height: "auto",
            overflow: "visible",
          }}
        >
          <div style={{ width: paper.widthPx }}>
            <TemplateRenderer data={cleanData} settings={settings} />
          </div>
        </div>
      </div>
    );
  },
);
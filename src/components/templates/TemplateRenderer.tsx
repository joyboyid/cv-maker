import { AcademicTemplate } from "@/components/templates/AcademicTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import type { ResumeData, ResumeSettings } from "@/types/resume";

interface TemplateRendererProps {
  data: ResumeData;
  settings: ResumeSettings;
}

export function TemplateRenderer({ data, settings }: TemplateRendererProps) {
  switch (settings.template) {
    case "minimal":
      return <MinimalTemplate data={data} settings={settings} />;
    case "classic":
      return <ClassicTemplate data={data} settings={settings} />;
    case "academic":
      return <AcademicTemplate data={data} settings={settings} />;
    case "creative":
      return <CreativeTemplate data={data} settings={settings} />;
    case "executive":
      return <ExecutiveTemplate data={data} settings={settings} />;
    case "modern":
    default:
      return <ModernTemplate data={data} settings={settings} />;
  }
}
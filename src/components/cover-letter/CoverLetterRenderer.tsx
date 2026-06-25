import { CoverLetterContent } from "@/components/cover-letter/CoverLetterContent";
import type { CoverLetterData, CoverLetterSettings } from "@/types/cover-letter";

interface CoverLetterRendererProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

export function CoverLetterRenderer({ data, settings }: CoverLetterRendererProps) {
  const className =
    settings.template === "startup"
      ? "cover-letter-doc cover-letter-startup"
      : settings.template === "academic"
        ? "cover-letter-doc cover-letter-academic"
        : "cover-letter-doc cover-letter-formal";

  return (
    <div className={className}>
      {settings.template === "startup" ? (
        <div className="cover-letter-startup-bar" />
      ) : null}
      {settings.template === "academic" ? (
        <div className="cover-letter-academic-header">
          <p>{data.sender.fullName || "Your Name"}</p>
          <span>{data.recipient.position || data.sender.email}</span>
        </div>
      ) : null}
      <CoverLetterContent data={data} language={settings.language} />
    </div>
  );
}
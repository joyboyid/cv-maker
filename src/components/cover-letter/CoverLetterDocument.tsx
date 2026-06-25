import { CoverLetterRenderer } from "@/components/cover-letter/CoverLetterRenderer";
import type { CoverLetterData, CoverLetterSettings } from "@/types/cover-letter";

interface CoverLetterDocumentProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
}

/** @deprecated use CoverLetterRenderer */
export function CoverLetterDocument({ data, settings }: CoverLetterDocumentProps) {
  return <CoverLetterRenderer data={data} settings={settings} />;
}
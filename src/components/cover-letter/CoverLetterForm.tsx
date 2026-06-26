"use client";

import { Field, inputClass, textareaClass } from "@/components/ui/Field";
import { ct } from "@/lib/cover-letter-i18n";
import { COVER_LETTER_TEMPLATE_OPTIONS } from "@/lib/cover-letter-templates";
import type { CoverLetterTemplateId } from "@/types/cover-letter";
import { PAPER_SIZE_OPTIONS } from "@/lib/resume-layout";
import type { CoverLetterData, CoverLetterSettings } from "@/types/cover-letter";

interface CoverLetterFormProps {
  data: CoverLetterData;
  settings: CoverLetterSettings;
  onDataChange: (data: CoverLetterData) => void;
  onSettingsChange: (settings: CoverLetterSettings) => void;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="shell-card">
      <h3 className="shell-title mb-4 text-sm">{title}</h3>
      {children}
    </section>
  );
}

export function CoverLetterForm({
  data,
  settings,
  onDataChange,
  onSettingsChange,
}: CoverLetterFormProps) {
  const lang = settings.language;

  const updateSender = (
    field: keyof CoverLetterData["sender"],
    value: string,
  ) => {
    onDataChange({
      ...data,
      sender: { ...data.sender, [field]: value },
    });
  };

  const updateRecipient = (
    field: keyof CoverLetterData["recipient"],
    value: string,
  ) => {
    onDataChange({
      ...data,
      recipient: { ...data.recipient, [field]: value },
    });
  };

  const updateContent = (
    field: keyof CoverLetterData["content"],
    value: string,
  ) => {
    onDataChange({
      ...data,
      content: { ...data.content, [field]: value },
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title={ct(lang, "settings")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={ct(lang, "template")}>
            <select
              className={inputClass}
              value={settings.template}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  template: e.target.value as CoverLetterTemplateId,
                })
              }
            >
              {COVER_LETTER_TEMPLATE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="shell-muted mt-1 text-[11px]">
              {
                COVER_LETTER_TEMPLATE_OPTIONS.find(
                  (option) => option.id === settings.template,
                )?.hint
              }
            </p>
          </Field>
          <Field label={ct(lang, "language")}>
            <select
              className={inputClass}
              value={settings.language}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  language: e.target.value as CoverLetterSettings["language"],
                })
              }
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label={ct(lang, "paperSize")}>
            <select
              className={inputClass}
              value={settings.paperSize}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  paperSize: e.target.value as CoverLetterSettings["paperSize"],
                })
              }
            >
              {PAPER_SIZE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {lang === "id" ? option.labelId : `${option.label} (${option.widthMm} × ${option.heightMm} mm)`}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </SectionCard>

      <SectionCard title={ct(lang, "sender")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={ct(lang, "fullName")}>
            <input
              className={inputClass}
              value={data.sender.fullName}
              onChange={(e) => updateSender("fullName", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "email")}>
            <input
              className={inputClass}
              value={data.sender.email}
              onChange={(e) => updateSender("email", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "phone")}>
            <input
              className={inputClass}
              value={data.sender.phone}
              onChange={(e) => updateSender("phone", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "location")}>
            <input
              className={inputClass}
              value={data.sender.location}
              onChange={(e) => updateSender("location", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "linkedin")}>
            <input
              className={inputClass}
              value={data.sender.linkedin}
              onChange={(e) => updateSender("linkedin", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "website")}>
            <input
              className={inputClass}
              value={data.sender.website}
              onChange={(e) => updateSender("website", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title={ct(lang, "recipient")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={ct(lang, "hiringManager")}>
            <input
              className={inputClass}
              value={data.recipient.hiringManagerName}
              onChange={(e) => updateRecipient("hiringManagerName", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "companyName")}>
            <input
              className={inputClass}
              value={data.recipient.companyName}
              onChange={(e) => updateRecipient("companyName", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "position")}>
            <input
              className={inputClass}
              value={data.recipient.position}
              onChange={(e) => updateRecipient("position", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "companyAddress")} className="sm:col-span-2">
            <input
              className={inputClass}
              value={data.recipient.companyAddress}
              onChange={(e) => updateRecipient("companyAddress", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title={ct(lang, "content")}>
        <div className="space-y-4">
          <Field label={ct(lang, "date")}>
            <input
              className={inputClass}
              value={data.content.date}
              onChange={(e) => updateContent("date", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "greeting")}>
            <input
              className={inputClass}
              value={data.content.greeting}
              onChange={(e) => updateContent("greeting", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "opening")}>
            <textarea
              className={textareaClass}
              rows={3}
              value={data.content.opening}
              onChange={(e) => updateContent("opening", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "body")}>
            <textarea
              className={textareaClass}
              rows={6}
              value={data.content.body}
              onChange={(e) => updateContent("body", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "closing")}>
            <textarea
              className={textareaClass}
              rows={3}
              value={data.content.closing}
              onChange={(e) => updateContent("closing", e.target.value)}
            />
          </Field>
          <Field label={ct(lang, "signature")}>
            <input
              className={inputClass}
              value={data.content.signature}
              onChange={(e) => updateContent("signature", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}
import type { CoverLetterData } from "@/types/cover-letter";
import type { Language } from "@/types/resume";

interface CoverLetterDocumentProps {
  data: CoverLetterData;
  language: Language;
}

function contactLine(parts: string[]): string {
  return parts.filter(Boolean).join(" · ");
}

export function CoverLetterDocument({ data, language }: CoverLetterDocumentProps) {
  const { sender, recipient, content } = data;

  const senderContact = contactLine([
    sender.email,
    sender.phone,
    sender.location,
  ]);

  const links = contactLine([sender.linkedin, sender.website]);

  const bodyParagraphs = content.body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="cover-letter-doc">
      <div className="cover-letter-sender">
        <p className="cover-letter-sender-name">
          {sender.fullName || "Your Name"}
        </p>
        {senderContact ? <p style={{ marginTop: 4 }}>{senderContact}</p> : null}
        {links ? <p style={{ marginTop: 4 }}>{links}</p> : null}
      </div>

      {content.date ? <p className="cover-letter-date">{content.date}</p> : null}

      <div className="cover-letter-recipient">
        {recipient.hiringManagerName ? (
          <p>{recipient.hiringManagerName}</p>
        ) : null}
        {recipient.companyName ? <p>{recipient.companyName}</p> : null}
        {recipient.companyAddress ? <p>{recipient.companyAddress}</p> : null}
        {recipient.position ? (
          <p style={{ marginTop: 6, fontStyle: "italic" }}>
            Re: {recipient.position}
          </p>
        ) : null}
      </div>

      {content.greeting ? (
        <p className="cover-letter-greeting">{content.greeting},</p>
      ) : null}

      {content.opening ? (
        <p className="cover-letter-paragraph">{content.opening}</p>
      ) : null}

      {bodyParagraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="cover-letter-paragraph">
          {paragraph}
        </p>
      ))}

      {content.closing ? (
        <p className="cover-letter-closing">{content.closing}</p>
      ) : null}

      <p className="cover-letter-closing" style={{ marginTop: 18 }}>
        {language === "id" ? "Hormat saya," : "Sincerely,"}
      </p>

      {content.signature ? (
        <p className="cover-letter-signature">{content.signature}</p>
      ) : (
        <p className="cover-letter-signature">{sender.fullName}</p>
      )}
    </div>
  );
}
"use client";

import { Plus, Trash2 } from "lucide-react";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";
import { createId } from "@/lib/resume-defaults";
import { t } from "@/lib/i18n";
import { PAPER_SIZE_OPTIONS } from "@/lib/resume-layout";
import { TEMPLATE_OPTIONS } from "@/lib/templates";
import type {
  Award,
  Certification,
  Education,
  Experience,
  Language,
  Project,
  Publication,
  ResumeData,
  ResumeSettings,
  TemplateId,
  Volunteer,
} from "@/types/resume";

interface ResumeFormProps {
  data: ResumeData;
  settings: ResumeSettings;
  onDataChange: (data: ResumeData) => void;
  onSettingsChange: (settings: ResumeSettings) => void;
}

function SectionCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function IconButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function ResumeForm({
  data,
  settings,
  onDataChange,
  onSettingsChange,
}: ResumeFormProps) {
  const lang = settings.language;

  const updatePersonal = (field: keyof ResumeData["personal"], value: string) => {
    onDataChange({
      ...data,
      personal: { ...data.personal, [field]: value },
    });
  };

  const updateExperience = (id: string, patch: Partial<Experience>) => {
    onDataChange({
      ...data,
      experiences: data.experiences.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const updateEducation = (id: string, patch: Partial<Education>) => {
    onDataChange({
      ...data,
      education: data.education.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const updateProject = (id: string, patch: Partial<Project>) => {
    onDataChange({
      ...data,
      projects: data.projects.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const updateStringList = (
    key: "skills" | "languages",
    index: number,
    value: string,
  ) => {
    const list = [...data[key]];
    list[index] = value;
    onDataChange({ ...data, [key]: list });
  };

  const addStringItem = (key: "skills" | "languages") => {
    onDataChange({ ...data, [key]: [...data[key], ""] });
  };

  const removeStringItem = (
    key: "skills" | "languages",
    index: number,
  ) => {
    onDataChange({
      ...data,
      [key]: data[key].filter((_, i) => i !== index),
    });
  };

  const updateCertification = (id: string, patch: Partial<Certification>) => {
    onDataChange({
      ...data,
      certifications: data.certifications.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const updateVolunteer = (id: string, patch: Partial<Volunteer>) => {
    onDataChange({
      ...data,
      volunteers: data.volunteers.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const updateAward = (id: string, patch: Partial<Award>) => {
    onDataChange({
      ...data,
      awards: data.awards.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const updatePublication = (id: string, patch: Partial<Publication>) => {
    onDataChange({
      ...data,
      publications: data.publications.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title="Pengaturan">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label={t(lang, "template")}>
            <select
              className={inputClass}
              value={settings.template}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  template: e.target.value as TemplateId,
                })
              }
            >
              {TEMPLATE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-slate-500">
              {TEMPLATE_OPTIONS.find((o) => o.id === settings.template)?.hint}
            </p>
          </Field>
          <Field label={t(lang, "paperSize")}>
            <select
              className={inputClass}
              value={settings.paperSize}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  paperSize: e.target.value as ResumeSettings["paperSize"],
                })
              }
            >
              {PAPER_SIZE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {lang === "id" ? option.labelId : `${option.label} (${option.widthMm} × ${option.heightMm} mm)`}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-slate-500">
              {t(lang, "paperAutoFit")}
            </p>
          </Field>
          <Field label={t(lang, "language")}>
            <select
              className={inputClass}
              value={settings.language}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  language: e.target.value as Language,
                })
              }
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label={t(lang, "accentColor")}>
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
              value={settings.accentColor}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  accentColor: e.target.value,
                })
              }
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title={t(lang, "personal")}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={t(lang, "fullName")}>
            <input
              className={inputClass}
              value={data.personal.fullName}
              onChange={(e) => updatePersonal("fullName", e.target.value)}
              placeholder="Ahmad Rizki"
            />
          </Field>
          <Field label={t(lang, "title")}>
            <input
              className={inputClass}
              value={data.personal.title}
              onChange={(e) => updatePersonal("title", e.target.value)}
              placeholder="Software Engineer"
            />
          </Field>
          <Field label={t(lang, "email")}>
            <input
              className={inputClass}
              value={data.personal.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
              placeholder="email@example.com"
            />
          </Field>
          <Field label={t(lang, "phone")}>
            <input
              className={inputClass}
              value={data.personal.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
              placeholder="+62 812 xxx"
            />
          </Field>
          <Field label={t(lang, "location")}>
            <input
              className={inputClass}
              value={data.personal.location}
              onChange={(e) => updatePersonal("location", e.target.value)}
              placeholder="Jakarta, Indonesia"
            />
          </Field>
          <Field label={t(lang, "linkedin")}>
            <input
              className={inputClass}
              value={data.personal.linkedin}
              onChange={(e) => updatePersonal("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
            />
          </Field>
          <Field label={t(lang, "website")} className="sm:col-span-2">
            <input
              className={inputClass}
              value={data.personal.website}
              onChange={(e) => updatePersonal("website", e.target.value)}
              placeholder="portfolio.com"
            />
          </Field>
          <Field label={t(lang, "summary")} className="sm:col-span-2">
            <textarea
              className={textareaClass}
              rows={4}
              value={data.personal.summary}
              onChange={(e) => updatePersonal("summary", e.target.value)}
              placeholder="2-3 kalimat tentang keahlian dan tujuan karier..."
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title={t(lang, "experiences")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                experiences: [
                  ...data.experiences,
                  {
                    id: createId("exp"),
                    company: "",
                    position: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    bullets: [""],
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addExperience")}
          </button>
        }
      >
        {data.experiences.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada pengalaman ditambahkan.</p>
        ) : (
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
              >
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus pengalaman"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        experiences: data.experiences.filter(
                          (item) => item.id !== exp.id,
                        ),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "position")}>
                    <input
                      className={inputClass}
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, { position: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "company")}>
                    <input
                      className={inputClass}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "location")}>
                    <input
                      className={inputClass}
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, { location: e.target.value })
                      }
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label={t(lang, "startDate")}>
                      <input
                        className={inputClass}
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            startDate: e.target.value,
                          })
                        }
                        placeholder="Jan 2024"
                      />
                    </Field>
                    <Field label={t(lang, "endDate")}>
                      <input
                        className={inputClass}
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, { endDate: e.target.value })
                        }
                        placeholder="Des 2024"
                      />
                    </Field>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-slate-600 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          current: e.target.checked,
                          endDate: e.target.checked ? "" : exp.endDate,
                        })
                      }
                    />
                    {t(lang, "current")}
                  </label>
                </div>
                <div className="mt-3 space-y-2">
                  {exp.bullets.map((bullet, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className={inputClass}
                        value={bullet}
                        onChange={(e) => {
                          const bullets = [...exp.bullets];
                          bullets[index] = e.target.value;
                          updateExperience(exp.id, { bullets });
                        }}
                        placeholder="Pencapaian atau tanggung jawab..."
                      />
                      <IconButton
                        label="Hapus poin"
                        onClick={() =>
                          updateExperience(exp.id, {
                            bullets: exp.bullets.filter((_, i) => i !== index),
                          })
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateExperience(exp.id, {
                        bullets: [...exp.bullets, ""],
                      })
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    + {t(lang, "addBullet")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title={t(lang, "education")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                education: [
                  ...data.education,
                  {
                    id: createId("edu"),
                    institution: "",
                    degree: "",
                    field: "",
                    startDate: "",
                    endDate: "",
                    gpa: "",
                    highlights: [""],
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addEducation")}
          </button>
        }
      >
        {data.education.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada pendidikan ditambahkan.</p>
        ) : (
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
              >
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus pendidikan"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        education: data.education.filter(
                          (item) => item.id !== edu.id,
                        ),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "institution")}>
                    <input
                      className={inputClass}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, {
                          institution: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "degree")}>
                    <input
                      className={inputClass}
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, { degree: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "field")}>
                    <input
                      className={inputClass}
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, { field: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "gpa")}>
                    <input
                      className={inputClass}
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(edu.id, { gpa: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "startDate")}>
                    <input
                      className={inputClass}
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, {
                          startDate: e.target.value,
                        })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "endDate")}>
                    <input
                      className={inputClass}
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { endDate: e.target.value })
                      }
                    />
                  </Field>
                </div>
                <div className="mt-3 space-y-2">
                  {edu.highlights.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className={inputClass}
                        value={item}
                        onChange={(e) => {
                          const highlights = [...edu.highlights];
                          highlights[index] = e.target.value;
                          updateEducation(edu.id, { highlights });
                        }}
                        placeholder="Prestasi atau aktivitas kampus..."
                      />
                      <IconButton
                        label="Hapus highlight"
                        onClick={() =>
                          updateEducation(edu.id, {
                            highlights: edu.highlights.filter(
                              (_, i) => i !== index,
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateEducation(edu.id, {
                        highlights: [...edu.highlights, ""],
                      })
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    + {t(lang, "addBullet")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title={t(lang, "skills")}
        action={
          <button
            type="button"
            onClick={() => addStringItem("skills")}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addSkill")}
          </button>
        }
      >
        <div className="space-y-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                className={inputClass}
                value={skill}
                onChange={(e) =>
                  updateStringList("skills", index, e.target.value)
                }
                placeholder="React, Python, Public Speaking..."
              />
              <IconButton
                label="Hapus skill"
                onClick={() => removeStringItem("skills", index)}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title={t(lang, "projects")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                projects: [
                  ...data.projects,
                  {
                    id: createId("proj"),
                    name: "",
                    link: "",
                    description: "",
                    bullets: [""],
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addProject")}
          </button>
        }
      >
        {data.projects.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada proyek ditambahkan.</p>
        ) : (
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
              >
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus proyek"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        projects: data.projects.filter(
                          (item) => item.id !== project.id,
                        ),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "projectName")}>
                    <input
                      className={inputClass}
                      value={project.name}
                      onChange={(e) =>
                        updateProject(project.id, { name: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "projectLink")}>
                    <input
                      className={inputClass}
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, { link: e.target.value })
                      }
                    />
                  </Field>
                  <Field label={t(lang, "description")} className="sm:col-span-2">
                    <textarea
                      className={textareaClass}
                      rows={2}
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, {
                          description: e.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
                <div className="mt-3 space-y-2">
                  {project.bullets.map((bullet, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        className={inputClass}
                        value={bullet}
                        onChange={(e) => {
                          const bullets = [...project.bullets];
                          bullets[index] = e.target.value;
                          updateProject(project.id, { bullets });
                        }}
                      />
                      <IconButton
                        label="Hapus poin"
                        onClick={() =>
                          updateProject(project.id, {
                            bullets: project.bullets.filter(
                              (_, i) => i !== index,
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateProject(project.id, {
                        bullets: [...project.bullets, ""],
                      })
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    + {t(lang, "addBullet")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={t(lang, "languages")}>
        <div className="space-y-2">
          {data.languages.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                className={inputClass}
                value={item}
                onChange={(e) =>
                  updateStringList("languages", index, e.target.value)
                }
                placeholder="Bahasa Indonesia (Native)"
              />
              <IconButton
                label="Hapus bahasa"
                onClick={() => removeStringItem("languages", index)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addStringItem("languages")}
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            + Tambah bahasa
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title={t(lang, "certifications")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                certifications: [
                  ...data.certifications,
                  {
                    id: createId("cert"),
                    name: "",
                    issueDate: "",
                    expireDate: "",
                    credentialId: "",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addCertification")}
          </button>
        }
      >
        {data.certifications.length === 0 ? (
          <p className="text-sm text-slate-500">
            Belum ada sertifikasi ditambahkan.
          </p>
        ) : (
          <div className="space-y-4">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
              >
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus sertifikasi"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        certifications: data.certifications.filter(
                          (item) => item.id !== cert.id,
                        ),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "certName")} className="sm:col-span-2">
                    <input
                      className={inputClass}
                      value={cert.name}
                      onChange={(e) =>
                        updateCertification(cert.id, { name: e.target.value })
                      }
                      placeholder="AWS Certified Cloud Practitioner"
                    />
                  </Field>
                  <Field label={t(lang, "certIssueDate")}>
                    <input
                      className={inputClass}
                      value={cert.issueDate}
                      onChange={(e) =>
                        updateCertification(cert.id, {
                          issueDate: e.target.value,
                        })
                      }
                      placeholder="Jun 2024"
                    />
                  </Field>
                  <Field label={t(lang, "certExpireDate")}>
                    <input
                      className={inputClass}
                      value={cert.expireDate}
                      onChange={(e) =>
                        updateCertification(cert.id, {
                          expireDate: e.target.value,
                        })
                      }
                      placeholder="Jun 2027"
                    />
                  </Field>
                  <Field label={t(lang, "certCredential")} className="sm:col-span-2">
                    <input
                      className={inputClass}
                      value={cert.credentialId}
                      onChange={(e) =>
                        updateCertification(cert.id, {
                          credentialId: e.target.value,
                        })
                      }
                      placeholder="ABC-123-XYZ"
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title={t(lang, "volunteers")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                volunteers: [
                  ...data.volunteers,
                  {
                    id: createId("vol"),
                    organization: "",
                    role: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addVolunteer")}
          </button>
        }
      >
        {data.volunteers.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada volunteer ditambahkan.</p>
        ) : (
          <div className="space-y-4">
            {data.volunteers.map((vol) => (
              <div key={vol.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus volunteer"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        volunteers: data.volunteers.filter((v) => v.id !== vol.id),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "organization")}>
                    <input className={inputClass} value={vol.organization} onChange={(e) => updateVolunteer(vol.id, { organization: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "role")}>
                    <input className={inputClass} value={vol.role} onChange={(e) => updateVolunteer(vol.id, { role: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "location")}>
                    <input className={inputClass} value={vol.location} onChange={(e) => updateVolunteer(vol.id, { location: e.target.value })} />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label={t(lang, "startDate")}>
                      <input className={inputClass} value={vol.startDate} onChange={(e) => updateVolunteer(vol.id, { startDate: e.target.value })} />
                    </Field>
                    <Field label={t(lang, "endDate")}>
                      <input className={inputClass} value={vol.endDate} disabled={vol.current} onChange={(e) => updateVolunteer(vol.id, { endDate: e.target.value })} />
                    </Field>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-slate-600 sm:col-span-2">
                    <input type="checkbox" checked={vol.current} onChange={(e) => updateVolunteer(vol.id, { current: e.target.checked, endDate: e.target.checked ? "" : vol.endDate })} />
                    {t(lang, "current")}
                  </label>
                  <Field label={t(lang, "description")} className="sm:col-span-2">
                    <textarea className={textareaClass} rows={2} value={vol.description} onChange={(e) => updateVolunteer(vol.id, { description: e.target.value })} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title={t(lang, "awards")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                awards: [
                  ...data.awards,
                  { id: createId("award"), title: "", issuer: "", date: "", description: "" },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addAward")}
          </button>
        }
      >
        {data.awards.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada penghargaan ditambahkan.</p>
        ) : (
          <div className="space-y-4">
            {data.awards.map((award) => (
              <div key={award.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus penghargaan"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        awards: data.awards.filter((a) => a.id !== award.id),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "awardTitle")} className="sm:col-span-2">
                    <input className={inputClass} value={award.title} onChange={(e) => updateAward(award.id, { title: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "issuer")}>
                    <input className={inputClass} value={award.issuer} onChange={(e) => updateAward(award.id, { issuer: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "awardDate")}>
                    <input className={inputClass} value={award.date} onChange={(e) => updateAward(award.id, { date: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "description")} className="sm:col-span-2">
                    <textarea className={textareaClass} rows={2} value={award.description} onChange={(e) => updateAward(award.id, { description: e.target.value })} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title={t(lang, "publications")}
        action={
          <button
            type="button"
            onClick={() =>
              onDataChange({
                ...data,
                publications: [
                  ...data.publications,
                  { id: createId("pub"), title: "", publisher: "", date: "", link: "", description: "" },
                ],
              })
            }
            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Plus className="h-3.5 w-3.5" />
            {t(lang, "addPublication")}
          </button>
        }
      >
        {data.publications.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada publikasi ditambahkan.</p>
        ) : (
          <div className="space-y-4">
            {data.publications.map((pub) => (
              <div key={pub.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                <div className="mb-3 flex justify-end">
                  <IconButton
                    label="Hapus publikasi"
                    onClick={() =>
                      onDataChange({
                        ...data,
                        publications: data.publications.filter((p) => p.id !== pub.id),
                      })
                    }
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t(lang, "pubTitle")} className="sm:col-span-2">
                    <input className={inputClass} value={pub.title} onChange={(e) => updatePublication(pub.id, { title: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "publisher")}>
                    <input className={inputClass} value={pub.publisher} onChange={(e) => updatePublication(pub.id, { publisher: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "pubDate")}>
                    <input className={inputClass} value={pub.date} onChange={(e) => updatePublication(pub.id, { date: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "pubLink")} className="sm:col-span-2">
                    <input className={inputClass} value={pub.link} onChange={(e) => updatePublication(pub.id, { link: e.target.value })} />
                  </Field>
                  <Field label={t(lang, "description")} className="sm:col-span-2">
                    <textarea className={textareaClass} rows={2} value={pub.description} onChange={(e) => updatePublication(pub.id, { description: e.target.value })} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
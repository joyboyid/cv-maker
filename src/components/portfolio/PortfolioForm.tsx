"use client";

import { Plus, Trash2 } from "lucide-react";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";
import { createPortfolioId } from "@/lib/portfolio-defaults";
import { pt } from "@/lib/portfolio-i18n";
import { PORTFOLIO_TEMPLATE_OPTIONS } from "@/lib/portfolio-templates";
import type {
  PortfolioData,
  PortfolioProject,
  PortfolioSettings,
  PortfolioTemplateId,
} from "@/types/portfolio";

interface PortfolioFormProps {
  data: PortfolioData;
  settings: PortfolioSettings;
  onDataChange: (data: PortfolioData) => void;
  onSettingsChange: (settings: PortfolioSettings) => void;
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
    <section className="shell-card">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="shell-title text-sm">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function IconButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="shell-muted rounded-md p-1.5 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function PortfolioForm({
  data,
  settings,
  onDataChange,
  onSettingsChange,
}: PortfolioFormProps) {
  const lang = settings.language;

  const updateProfile = (
    field: keyof PortfolioData["profile"],
    value: string,
  ) => {
    onDataChange({
      ...data,
      profile: { ...data.profile, [field]: value },
    });
  };

  const updateProject = (
    id: string,
    field: keyof PortfolioProject,
    value: string | boolean | string[],
  ) => {
    onDataChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    });
  };

  const addSkill = () => {
    onDataChange({ ...data, skills: [...data.skills, ""] });
  };

  const updateSkill = (index: number, value: string) => {
    const skills = [...data.skills];
    skills[index] = value;
    onDataChange({ ...data, skills });
  };

  const removeSkill = (index: number) => {
    onDataChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    onDataChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: createPortfolioId("proj"),
          name: "",
          description: "",
          link: "",
          demoLink: "",
          imageUrl: "",
          techStack: [],
          featured: false,
        },
      ],
    });
  };

  const removeProject = (id: string) => {
    onDataChange({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title={pt(lang, "settings")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={pt(lang, "template")}>
            <select
              className={inputClass}
              value={settings.template}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  template: e.target.value as PortfolioTemplateId,
                })
              }
            >
              {PORTFOLIO_TEMPLATE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] shell-muted">
              {
                PORTFOLIO_TEMPLATE_OPTIONS.find((o) => o.id === settings.template)
                  ?.hint
              }
            </p>
          </Field>
          <Field label={pt(lang, "language")}>
            <select
              className={inputClass}
              value={settings.language}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  language: e.target.value as PortfolioSettings["language"],
                })
              }
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label={pt(lang, "accentColor")} className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    accentColor: e.target.value,
                  })
                }
                className="shell-input h-10 w-14 cursor-pointer p-0"
              />
              <input
                className={inputClass}
                value={settings.accentColor}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    accentColor: e.target.value,
                  })
                }
              />
            </div>
          </Field>
        </div>
      </SectionCard>

      <SectionCard title={pt(lang, "profile")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={pt(lang, "fullName")}>
            <input
              className={inputClass}
              value={data.profile.fullName}
              onChange={(e) => updateProfile("fullName", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "tagline")}>
            <input
              className={inputClass}
              value={data.profile.tagline}
              onChange={(e) => updateProfile("tagline", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "email")}>
            <input
              className={inputClass}
              value={data.profile.email}
              onChange={(e) => updateProfile("email", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "phone")}>
            <input
              className={inputClass}
              value={data.profile.phone}
              onChange={(e) => updateProfile("phone", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "location")}>
            <input
              className={inputClass}
              value={data.profile.location}
              onChange={(e) => updateProfile("location", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "avatarUrl")}>
            <input
              className={inputClass}
              value={data.profile.avatarUrl}
              onChange={(e) => updateProfile("avatarUrl", e.target.value)}
              placeholder="https://..."
            />
          </Field>
          <Field label={pt(lang, "github")}>
            <input
              className={inputClass}
              value={data.profile.github}
              onChange={(e) => updateProfile("github", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "linkedin")}>
            <input
              className={inputClass}
              value={data.profile.linkedin}
              onChange={(e) => updateProfile("linkedin", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "website")}>
            <input
              className={inputClass}
              value={data.profile.website}
              onChange={(e) => updateProfile("website", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "behance")}>
            <input
              className={inputClass}
              value={data.profile.behance}
              onChange={(e) => updateProfile("behance", e.target.value)}
            />
          </Field>
          <Field label={pt(lang, "bio")} className="sm:col-span-2">
            <textarea
              className={textareaClass}
              rows={4}
              value={data.profile.bio}
              onChange={(e) => updateProfile("bio", e.target.value)}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title={pt(lang, "skills")}
        action={
          <button
            type="button"
            onClick={addSkill}
            className="shell-btn-secondary gap-1 px-2.5 py-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            {pt(lang, "addSkill")}
          </button>
        }
      >
        <div className="space-y-2">
          {data.skills.length === 0 ? (
            <p className="text-sm shell-muted">Belum ada keahlian.</p>
          ) : null}
          {data.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className={inputClass}
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
              />
              <IconButton
                onClick={() => removeSkill(index)}
                label="Hapus keahlian"
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title={pt(lang, "projects")}
        action={
          <button
            type="button"
            onClick={addProject}
            className="shell-btn-secondary gap-1 px-2.5 py-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            {pt(lang, "addProject")}
          </button>
        }
      >
        <div className="space-y-4">
          {data.projects.length === 0 ? (
            <p className="text-sm shell-muted">Belum ada proyek.</p>
          ) : null}
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="shell-subcard p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium shell-muted">
                  {project.name || "Proyek baru"}
                </span>
                <IconButton
                  onClick={() => removeProject(project.id)}
                  label="Hapus proyek"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={pt(lang, "projectName")}>
                  <input
                    className={inputClass}
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, "name", e.target.value)
                    }
                  />
                </Field>
                <Field label={pt(lang, "projectImage")}>
                  <input
                    className={inputClass}
                    value={project.imageUrl}
                    onChange={(e) =>
                      updateProject(project.id, "imageUrl", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </Field>
                <Field label={pt(lang, "projectDesc")} className="sm:col-span-2">
                  <textarea
                    className={textareaClass}
                    rows={3}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, "description", e.target.value)
                    }
                  />
                </Field>
                <Field label={pt(lang, "projectLink")}>
                  <input
                    className={inputClass}
                    value={project.link}
                    onChange={(e) =>
                      updateProject(project.id, "link", e.target.value)
                    }
                  />
                </Field>
                <Field label={pt(lang, "projectDemo")}>
                  <input
                    className={inputClass}
                    value={project.demoLink}
                    onChange={(e) =>
                      updateProject(project.id, "demoLink", e.target.value)
                    }
                  />
                </Field>
                <Field label={pt(lang, "techStack")} className="sm:col-span-2">
                  <input
                    className={inputClass}
                    value={project.techStack.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        project.id,
                        "techStack",
                        e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      )
                    }
                    placeholder="React, TypeScript, Node.js"
                  />
                </Field>
                <label className="shell-body flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) =>
                      updateProject(project.id, "featured", e.target.checked)
                    }
                    className="rounded border-slate-300"
                  />
                  {pt(lang, "featured")}
                </label>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
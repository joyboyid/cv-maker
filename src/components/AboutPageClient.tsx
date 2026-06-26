"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clapperboard,
  FileText,
  Shield,
  Sparkles,
  Tv,
} from "lucide-react";
import { useSiteLocale } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAboutInterests, getAboutParagraphs } from "@/lib/site-i18n";

const interestIcons = [Shield, Tv, Clapperboard];

export function AboutPageClient() {
  const { locale, t } = useSiteLocale();
  const interests = getAboutInterests(locale);
  const paragraphs = getAboutParagraphs(locale);

  return (
    <div className="shell-page-gradient">
      <SiteHeader layout="compact" />

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="shell-card-lg overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-slate-800 px-8 py-10 text-white sm:px-12">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-white/30 shadow-xl">
                <Image
                  src="/boim-avatar.jpg"
                  alt={t("about_avatar_alt")}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-100">
                  {t("about_maker_label")}
                </p>
                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Boim</h1>
                <p className="mt-2 text-blue-100">{t("about_role")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-8 py-10 sm:px-12">
            <div className="flex items-center gap-2 text-blue-600">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">{t("about_greeting")}</span>
            </div>

            <div className="shell-body space-y-4 text-base leading-relaxed">
              <p>{paragraphs[0]}</p>
              <p>
                {locale === "en" ? (
                  <>
                    I sometimes spend time watching dramas, films, and anime. In
                    between, I also study on{" "}
                    <a
                      href="https://pwn.college"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-700"
                    >
                      pwn.college
                    </a>{" "}
                    — a fun place to sharpen cybersecurity skills.
                  </>
                ) : (
                  <>
                    Kadang aku menghabiskan waktu dengan menonton drama, film,
                    dan anime. Di sela-sela itu, aku juga kadang menyendiri
                    belajar di{" "}
                    <a
                      href="https://pwn.college"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-700"
                    >
                      pwn.college
                    </a>{" "}
                    — tempat yang seru buat asah skill keamanan siber.
                  </>
                )}
              </p>
              <p>{paragraphs[2]}</p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {interests.map((item, index) => {
            const Icon = interestIcons[index] ?? Shield;
            return (
              <article key={item.title} className="shell-card-lg p-5">
                <Icon className="h-6 w-6 text-blue-600" />
                <h2 className="shell-title mt-3">{item.title}</h2>
                <p className="shell-muted mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-10 rounded-3xl border border-blue-100 bg-blue-50/50 p-8 text-center dark:border-blue-900 dark:bg-blue-950/30 sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="shell-heading mt-4 text-xl">{t("about_cta_title")}</h2>
          <p className="shell-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed">
            {t("about_cta_desc")}
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            {t("about_cta_button")}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
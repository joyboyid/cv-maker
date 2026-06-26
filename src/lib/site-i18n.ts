import type { SiteLocale } from "@/lib/site-locale";

export const siteMessages = {
  id: {
    site_name: "CV Satu Halaman",
    nav_home: "Beranda",
    nav_guides: "Panduan",
    nav_about: "Tentang",
    nav_donations: "Donasi",
    nav_contact: "Contact",
    nav_build_cv: "Buat CV",
    footer_tagline: "100% gratis untuk siapa saja · Tanpa daftar · Data tersimpan di browser",
    footer_build_cv: "Buat CV",
    footer_build_portfolio: "Buat Portofolio",
    footer_cover_letter: "Cover Letter",
    footer_guides: "Panduan",
    footer_about: "Tentang Boim",
    footer_donations: "Donasi",
    footer_contact: "Contact",
    tools_label: "Tools",
    tools_pick: "Pilih tool",
    tool_cv_label: "CV Satu Halaman",
    tool_cv_short: "CV",
    tool_cv_desc: "Resume ATS-friendly, skor ATS, export PDF",
    tool_portfolio_label: "Portofolio",
    tool_portfolio_short: "Portofolio",
    tool_portfolio_desc: "Halaman proyek & skill, share link",
    tool_cover_label: "Cover Letter",
    tool_cover_short: "Cover Letter",
    tool_cover_desc: "Surat lamaran, generate dari CV",
    common_loading: "Memuat...",
    common_preview: "Preview",
    common_start_now: "Mulai sekarang",
    common_read_guide: "Baca panduan",
    common_new: "Baru",
    common_open_guides: "Buka panduan",
    common_copy: "Salin",
    common_copied: "Tersalin",
    common_chat: "Chat",
    common_open: "Buka",
    share_cv_label: "CV Bersama",
    share_portfolio_label: "Portofolio Bersama",
    share_cover_label: "Cover Letter Bersama",
    share_create_cv: "Buat CV sendiri",
    share_create_portfolio: "Buat portofolio",
    share_create_cover: "Buat cover letter",
    share_readonly_cv: "Tampilan read-only · Dibuat dengan CV Satu Halaman",
    share_not_found_cv: "CV tidak ditemukan",
    share_not_found_portfolio: "Portofolio tidak ditemukan",
    share_not_found_cover: "Cover letter tidak ditemukan",
    share_not_found_cv_desc:
      "Link tidak valid atau sudah rusak. Minta pengirim untuk membagikan link baru dari builder.",
    share_not_found_portfolio_desc:
      "Link tidak valid atau sudah rusak. Minta pengirim untuk membagikan link baru dari builder portofolio.",
    share_not_found_cover_desc:
      "Link tidak valid atau sudah rusak. Minta pengirim untuk membagikan link baru dari builder cover letter.",
    share_loading_cv: "Memuat CV...",
    share_loading_portfolio: "Memuat portofolio...",
    share_loading_cover: "Memuat cover letter...",
    builder_preview_footer_cv: "100% gratis · Tanpa watermark pada PDF",
    builder_preview_footer_share: "100% gratis · Bagikan link read-only · Data di browser",
    builder_export_saving: "Menyimpan...",
    builder_portfolio_layout: "Template {template} · Web layout",
    guides_hub_title: "Panduan CV & Lamaran Kerja",
    guides_hub_desc:
      "Kumpulan artikel praktis untuk pelamar kerja Indonesia — dari CV ATS-friendly sampai cover letter dan portofolio. Gratis, tanpa daftar.",
    guides_practice_title: "Sudah baca? Langsung praktik",
    guides_practice_desc:
      "Terapkan tips di atas langsung di builder — template modern, skor ATS, export PDF, dan multi-draft gratis.",
    guides_category_cv: "CV & Resume",
    guides_category_lamaran: "Lamaran Kerja",
    guides_category_portofolio: "Portofolio",
    guides_category_umum: "Umum",
    guides_id_notice:
      "Artikel panduan saat ini tersedia dalam Bahasa Indonesia.",
    guides_faq_title: "Pertanyaan umum",
    guides_read_also: "Baca juga",
    guides_back: "Panduan",
    guides_updated: "Diperbarui",
    guides_tip_label: "Tips:",
    home_badge: "100% Gratis · Tanpa daftar · Data di browser",
    home_hero_title: "Buat CV profesional",
    home_hero_highlight: "satu halaman",
    home_hero_suffix: "dalam 5 menit",
    home_hero_desc:
      "Tool pembuatan resume untuk pelamar kerja di Indonesia. Format ATS-friendly, preview langsung, export PDF — gratis untuk semua orang.",
    home_cta_cv: "Buat CV Sekarang",
    home_cta_portfolio: "Buat Portofolio",
    home_cover_title: "Cover Letter Generator",
    home_cover_desc:
      "Buat surat lamaran profesional dalam hitungan menit. Generate otomatis dari CV, import LinkedIn, export PDF, dan bagikan link.",
    home_cover_cta: "Buat Cover Letter",
    home_portfolio_title: "Generator Portofolio",
    home_portfolio_desc:
      "Tampilkan proyek, skill, dan profil kamu dalam halaman web profesional. 3 template, share link, import dari CV — gratis tanpa daftar.",
    home_portfolio_cta: "Coba Portofolio",
    home_how_title: "Cara pakai",
    home_guides_badge: "Panduan gratis",
    home_guides_title: "Tips CV & lamaran kerja",
    home_guides_desc:
      "Pelajari cara buat CV ATS-friendly, CV fresh graduate, cover letter, dan portofolio — lalu langsung praktik di builder.",
    home_free_title: "Gratis untuk semua orang",
    home_free_desc:
      "Tidak ada langganan, tidak ada batasan fitur, tidak ada watermark. Siapa pun bisa membuat dan mengunduh CV tanpa biaya.",
    home_cta_final_title: "Siap kirim lamaran?",
    home_cta_final_desc:
      "Data CV disimpan otomatis di browser kamu. Privasi terjaga — tidak perlu upload ke server.",
    home_template_prefix: "Template",
    about_avatar_alt: "Boim — pembuat CV Satu Halaman",
    about_maker_label: "Tentang pembuat",
    about_role: "IT Support · Pecinta IT & keamanan",
    about_greeting: "Halo, kenalan yuk!",
    about_cta_title: "CV Satu Halaman",
    about_cta_desc:
      "Tool ini kubuat supaya siapa pun bisa bikin CV profesional satu halaman dengan mudah — gratis, tanpa daftar, dan data tetap di browser kamu.",
    about_cta_button: "Coba buat CV sekarang",
    contact_title: "Contact Me",
    contact_note_title: "Respon mungkin tidak instan",
    contact_telegram: "Chat di Telegram",
    donations_title: "Donasi",
    donations_note_title: "Catatan penting",
    donations_free_title: "Tetap gratis untuk semua",
    donations_cta_cv: "Buat CV gratis",
  },
  en: {
    site_name: "One-Page CV",
    nav_home: "Home",
    nav_guides: "Guides",
    nav_about: "About",
    nav_donations: "Donate",
    nav_contact: "Contact",
    nav_build_cv: "Build CV",
    footer_tagline: "100% free for everyone · No sign-up · Data stored in your browser",
    footer_build_cv: "Build CV",
    footer_build_portfolio: "Build Portfolio",
    footer_cover_letter: "Cover Letter",
    footer_guides: "Guides",
    footer_about: "About Boim",
    footer_donations: "Donate",
    footer_contact: "Contact",
    tools_label: "Tools",
    tools_pick: "Choose a tool",
    tool_cv_label: "One-Page CV",
    tool_cv_short: "CV",
    tool_cv_desc: "ATS-friendly resume, ATS score, PDF export",
    tool_portfolio_label: "Portfolio",
    tool_portfolio_short: "Portfolio",
    tool_portfolio_desc: "Project & skills page with share link",
    tool_cover_label: "Cover Letter",
    tool_cover_short: "Cover Letter",
    tool_cover_desc: "Application letter, generate from CV",
    common_loading: "Loading...",
    common_preview: "Preview",
    common_start_now: "Start now",
    common_read_guide: "Read guide",
    common_new: "New",
    common_open_guides: "Open guides",
    common_copy: "Copy",
    common_copied: "Copied",
    common_chat: "Chat",
    common_open: "Open",
    share_cv_label: "Shared CV",
    share_portfolio_label: "Shared Portfolio",
    share_cover_label: "Shared Cover Letter",
    share_create_cv: "Build your own CV",
    share_create_portfolio: "Build portfolio",
    share_create_cover: "Build cover letter",
    share_readonly_cv: "Read-only view · Made with One-Page CV",
    share_not_found_cv: "CV not found",
    share_not_found_portfolio: "Portfolio not found",
    share_not_found_cover: "Cover letter not found",
    share_not_found_cv_desc:
      "Invalid or broken link. Ask the sender to share a new link from the builder.",
    share_not_found_portfolio_desc:
      "Invalid or broken link. Ask the sender to share a new link from the portfolio builder.",
    share_not_found_cover_desc:
      "Invalid or broken link. Ask the sender to share a new link from the cover letter builder.",
    share_loading_cv: "Loading CV...",
    share_loading_portfolio: "Loading portfolio...",
    share_loading_cover: "Loading cover letter...",
    builder_preview_footer_cv: "100% free · No watermark on PDF",
    builder_preview_footer_share: "100% free · Share read-only link · Data in browser",
    builder_export_saving: "Saving...",
    builder_portfolio_layout: "Template {template} · Web layout",
    guides_hub_title: "CV & Job Application Guides",
    guides_hub_desc:
      "Practical articles for job seekers — from ATS-friendly CVs to cover letters and portfolios. Free, no sign-up.",
    guides_practice_title: "Read enough? Put it into practice",
    guides_practice_desc:
      "Apply the tips directly in the builder — modern templates, ATS score, PDF export, and multi-draft support.",
    guides_category_cv: "CV & Resume",
    guides_category_lamaran: "Job Applications",
    guides_category_portofolio: "Portfolio",
    guides_category_umum: "General",
    guides_id_notice: "Guide articles are currently available in Indonesian.",
    guides_faq_title: "Frequently asked questions",
    guides_read_also: "Read also",
    guides_back: "Guides",
    guides_updated: "Updated",
    guides_tip_label: "Tip:",
    home_badge: "100% Free · No sign-up · Data in browser",
    home_hero_title: "Build a professional",
    home_hero_highlight: "one-page CV",
    home_hero_suffix: "in 5 minutes",
    home_hero_desc:
      "Resume builder for job seekers. ATS-friendly format, live preview, PDF export — free for everyone.",
    home_cta_cv: "Build CV Now",
    home_cta_portfolio: "Build Portfolio",
    home_cover_title: "Cover Letter Generator",
    home_cover_desc:
      "Write a professional cover letter in minutes. Generate from your CV, import LinkedIn, export PDF, and share a link.",
    home_cover_cta: "Build Cover Letter",
    home_portfolio_title: "Portfolio Generator",
    home_portfolio_desc:
      "Showcase projects, skills, and your profile on a professional page. 3 templates, share link, import from CV — free.",
    home_portfolio_cta: "Try Portfolio",
    home_how_title: "How it works",
    home_guides_badge: "Free guides",
    home_guides_title: "CV & job application tips",
    home_guides_desc:
      "Learn how to write an ATS-friendly CV, fresh graduate CV, cover letter, and portfolio — then practice in the builder.",
    home_free_title: "Free for everyone",
    home_free_desc:
      "No subscription, no feature limits, no watermark. Anyone can create and download a CV at no cost.",
    home_cta_final_title: "Ready to apply?",
    home_cta_final_desc:
      "CV data is saved automatically in your browser. Your privacy is protected — no server upload required.",
    home_template_prefix: "Template",
    about_avatar_alt: "Boim — creator of One-Page CV",
    about_maker_label: "About the creator",
    about_role: "IT Support · IT & security enthusiast",
    about_greeting: "Hi, nice to meet you!",
    about_cta_title: "One-Page CV",
    about_cta_desc:
      "I built this tool so anyone can create a professional one-page CV easily — free, no sign-up, data stays in your browser.",
    about_cta_button: "Try building a CV",
    contact_title: "Contact Me",
    contact_note_title: "Response may not be instant",
    contact_telegram: "Chat on Telegram",
    donations_title: "Donate",
    donations_note_title: "Important notes",
    donations_free_title: "Still free for everyone",
    donations_cta_cv: "Build CV for free",
  },
} as const;

export type SiteMessageKey = keyof (typeof siteMessages)["id"];

export function st(locale: SiteLocale, key: SiteMessageKey): string {
  return siteMessages[locale][key] ?? siteMessages.id[key];
}

export function getGuideCategoryLabel(
  locale: SiteLocale,
  category: "cv" | "lamaran" | "portofolio" | "umum",
): string {
  const map = {
    cv: "guides_category_cv",
    lamaran: "guides_category_lamaran",
    portofolio: "guides_category_portofolio",
    umum: "guides_category_umum",
  } as const;
  return st(locale, map[category]);
}

export function getHomeFeatures(locale: SiteLocale) {
  if (locale === "en") {
    return [
      {
        title: "One page, focused",
        description: "Built for one-pager CVs — concise and straight to the point.",
      },
      {
        title: "ATS-friendly",
        description: "Clean layout, standard fonts, no elements that break recruiter parsing.",
      },
      {
        title: "Indonesian & English",
        description: "Section labels and export in ID or EN — for local and remote applications.",
      },
      {
        title: "Instant PDF export",
        description: "Fill the form, preview live, download PDF without creating an account.",
      },
    ];
  }
  return [
    {
      title: "Satu halaman, fokus",
      description: "Dirancang untuk CV one-pager — tidak kepanjangan, langsung ke inti.",
    },
    {
      title: "ATS-friendly",
      description:
        "Layout bersih, font standar, tanpa elemen yang mengganggu parsing recruiter tools.",
    },
    {
      title: "Bahasa Indonesia & Inggris",
      description:
        "Label section dan export bisa ID atau EN — cocok untuk lamaran lokal maupun remote.",
    },
    {
      title: "Export PDF instan",
      description: "Isi form, lihat preview langsung, unduh PDF tanpa perlu daftar akun.",
    },
  ];
}

export function getHomeBenefits(locale: SiteLocale): string[] {
  if (locale === "en") {
    return [
      "No cost — use as much as you want",
      "No watermark on PDF files",
      "CV data stays in your browser, not uploaded to a server",
      "Great for fresh graduates, internships, and professionals",
    ];
  }
  return [
    "Tanpa biaya — dipakai sebanyak yang kamu mau",
    "Tanpa watermark pada file PDF",
    "Data CV tetap di browser kamu, tidak diupload ke server",
    "Cocok untuk fresh graduate, magang, dan profesional",
  ];
}

export function getHomeSteps(locale: SiteLocale): string[] {
  if (locale === "en") {
    return [
      "Fill in profile, experience, education, and skills",
      "Choose Modern, Minimal, or Classic template",
      "Check one-page score & adjust content length",
      "Download PDF and send your application",
    ];
  }
  return [
    "Isi profil, pengalaman, pendidikan, dan keahlian",
    "Pilih template Modern, Minimal, atau Classic",
    "Cek skor satu halaman & sesuaikan panjang konten",
    "Unduh PDF dan kirim lamaran",
  ];
}

export function getHomeTemplates(locale: SiteLocale) {
  if (locale === "en") {
    return [
      { name: "Modern", color: "from-blue-600 to-blue-800", desc: "Colored sidebar — tech & creative.", gradient: true },
      { name: "Minimal", color: "bg-slate-100", desc: "Clean & neutral — all industries.", gradient: false },
      { name: "Classic", color: "bg-amber-50", desc: "Formal serif — corporate & government.", gradient: false },
      { name: "Academic", color: "from-slate-700 to-slate-900", desc: "Research, publications, education.", gradient: true },
      { name: "Creative", color: "from-fuchsia-500 to-orange-500", desc: "Bold & colorful — design & media.", gradient: true },
      { name: "Executive", color: "from-slate-800 to-slate-600", desc: "Timeline — management & leadership.", gradient: true },
    ];
  }
  return [
    { name: "Modern", color: "from-blue-600 to-blue-800", desc: "Sidebar berwarna — tech & kreatif.", gradient: true },
    { name: "Minimal", color: "bg-slate-100", desc: "Bersih & netral — semua industri.", gradient: false },
    { name: "Classic", color: "bg-amber-50", desc: "Formal serif — korporat & pemerintah.", gradient: false },
    { name: "Academic", color: "from-slate-700 to-slate-900", desc: "Fokus riset, publikasi, pendidikan.", gradient: true },
    { name: "Creative", color: "from-fuchsia-500 to-orange-500", desc: "Bold & colorful — desain & media.", gradient: true },
    { name: "Executive", color: "from-slate-800 to-slate-600", desc: "Timeline — manajemen & leadership.", gradient: true },
  ];
}

export function getAboutInterests(locale: SiteLocale) {
  if (locale === "en") {
    return [
      {
        title: "Cybersecurity",
        description: "Enjoy exploring cybersecurity — sometimes practicing on pwn.college.",
      },
      {
        title: "Drama, film & anime",
        description: "Favorite way to spend free time watching dramas, films, and anime.",
      },
      {
        title: "IT & infrastructure",
        description: "Passionate about IT, from daily support to technical work behind the scenes.",
      },
    ];
  }
  return [
    {
      title: "Keamanan siber",
      description: "Suka eksplorasi dunia cybersecurity — kadang latihan di pwn.college.",
    },
    {
      title: "Drama, film & anime",
      description: "Hobi ngisi waktu luang dengan nonton drama, film, dan anime favorit.",
    },
    {
      title: "IT & infrastruktur",
      description: "Passion di bidang IT, dari support harian sampai hal-hal teknis di balik layar.",
    },
  ];
}

export function getAboutParagraphs(locale: SiteLocale): string[] {
  if (locale === "en") {
    return [
      "I'm Boim — I love IT and I'm especially into security. Technology and cybersecurity have always fascinated me, from day-to-day troubleshooting to exploring what runs behind the systems.",
      "I sometimes spend time watching dramas, films, and anime. In between, I also study on pwn.college — a fun place to sharpen cybersecurity skills.",
      "By the way, I currently work as IT Support at an ISP in Indonesia. Thanks for visiting and using this tool!",
    ];
  }
  return [
    "Aku adalah Boim, orang yang sangat suka bidang IT dan sangat menyukai tentang keamanan. Dunia teknologi dan cybersecurity selalu menarik buatku — dari troubleshooting sehari-hari sampai eksplorasi hal-hal di balik sistem.",
    "Kadang aku menghabiskan waktu dengan menonton drama, film, dan anime. Di sela-sela itu, aku juga kadang menyendiri belajar di pwn.college — tempat yang seru buat asah skill keamanan siber.",
    "Btw, aku sekarang kerja sebagai IT Support di salah satu ISP di Indonesia, hihihi. Terima kasih sudah mampir dan pakai tool ini!",
  ];
}

export function getContactIntro(locale: SiteLocale): string {
  if (locale === "en") {
    return "Questions, feature ideas, bug reports, or just want to talk about IT? Reach me on Telegram — I usually reply when I'm not busy watching anime.";
  }
  return "Ada pertanyaan, saran fitur, laporan bug, atau mau ngobrol soal IT? Hubungi aku lewat Telegram — biasanya membalas kalau lagi tidak sibuk nonton anime, hihihi.";
}

export function getContactNote(locale: SiteLocale): string {
  if (locale === "en") {
    return "I handle everything myself, so replies might take a while when I'm working or sleeping. But I do read every message!";
  }
  return "Aku handle sendiri, jadi balasan bisa agak lama kalau lagi kerja atau tidur. Tapi pesan kamu pasti kubaca!";
}

export function getDonationsIntro(locale: SiteLocale): string {
  if (locale === "en") {
    return "One-Page CV stays 100% free for everyone. If this tool helped you, voluntary donations are appreciated for server costs and future development. Thank you!";
  }
  return "CV Satu Halaman tetap 100% gratis untuk semua orang. Kalau tool ini membantu kamu, donasi sukarela sangat dihargai buat biaya server dan pengembangan fitur ke depan. Terima kasih!";
}

export function getDonationsNotes(locale: SiteLocale): string[] {
  if (locale === "en") {
    return [
      "For crypto, make sure the network and asset match the destination wallet.",
      "Send only to addresses on this page — donations cannot be reversed.",
      "No special perks; this is purely voluntary support. Thank you!",
    ];
  }
  return [
    "Untuk crypto, pastikan jaringan & aset yang dikirim sesuai dengan wallet tujuan.",
    "Kirim hanya ke alamat di halaman ini — donasi tidak bisa dibatalkan.",
    "Tidak ada imbalan khusus; ini murni dukungan sukarela. Makasih ya!",
  ];
}

export function getDonationsFreeNote(locale: SiteLocale): string {
  if (locale === "en") {
    return "Donations do not change feature access. Anyone can still create and download CVs without limits.";
  }
  return "Donasi tidak mengubah akses fitur. Siapa pun tetap bisa buat dan unduh CV tanpa batas.";
}
export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoArticleBlock {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "tip";
  text?: string;
  items?: string[];
}

export interface SeoArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: "cv" | "lamaran" | "portofolio" | "umum";
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  blocks: SeoArticleBlock[];
  faq: SeoFaqItem[];
  relatedSlugs: string[];
  cta: {
    label: string;
    href: string;
    description: string;
  };
}

export const seoArticles: SeoArticle[] = [
  {
    slug: "cv-ats-friendly",
    title: "Cara Membuat CV ATS-Friendly yang Lolos Sistem Rekrutmen",
    description:
      "Panduan lengkap CV ATS-friendly untuk pelamar kerja Indonesia: format, kata kunci, kesalahan umum, dan cara cek skor sebelum kirim lamaran.",
    keywords: [
      "cv ats friendly",
      "ats resume",
      "cv lolos ats",
      "format cv ats",
      "applicant tracking system",
    ],
    category: "cv",
    readTime: "7 menit",
    publishedAt: "2026-01-15",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Banyak perusahaan — terutama korporat, startup scale-up, dan lowongan remote — memakai Applicant Tracking System (ATS) untuk menyaring CV sebelum sampai ke HR. CV yang bagus secara visual belum tentu terbaca mesin. Artikel ini menjelaskan cara menulis CV yang bisa diparsing sistem dan tetap enak dibaca manusia.",
      },
      {
        type: "h2",
        text: "Apa itu ATS dan kenapa penting?",
      },
      {
        type: "p",
        text: "ATS adalah software yang mengumpulkan, menyimpan, dan menilai lamaran kerja. Sistem ini mengekstrak teks dari CV kamu, mencocokkan kata kunci dengan job description, lalu memberi ranking ke kandidat. Kalau CV kamu berformat rumit atau kehilangan informasi penting, skor bisa turun meski pengalamanmu relevan.",
      },
      {
        type: "h2",
        text: "Prinsip dasar CV ATS-friendly",
      },
      {
        type: "ul",
        items: [
          "Gunakan struktur section jelas: Profil, Pengalaman, Pendidikan, Keahlian.",
          "Hindari tabel kompleks, text box, grafik, atau ikon yang menggantikan teks.",
          "Pakai font standar (sans-serif) dan ukuran 10–12 pt saat export PDF.",
          "Cantumkan kata kunci dari job description secara natural di pengalaman & skill.",
          "Sertakan kontak lengkap: nama, email, telepon, kota, LinkedIn (opsional).",
          "Tulis tanggal kerja konsisten, misalnya Jan 2023 – Des 2024.",
        ],
      },
      {
        type: "h2",
        text: "Kata kunci: cara pakai tanpa terlihat dipaksakan",
      },
      {
        type: "p",
        text: "Baca job description 2–3 kali. Tandai skill wajib (hard skill), tools, dan kata kerja. Masukkan ke bullet point pengalaman, bukan cuma di section skill. Contoh: kalau JD menyebut \"SQL\" dan \"dashboard\", tulis: \"Membangun dashboard penjualan harian dengan SQL dan Google Sheets untuk tim operasional.\"",
      },
      {
        type: "tip",
        text: "Di CV Satu Halaman, gunakan panel Skor ATS untuk cek kelengkapan kontak, action verb, dan kepadatan konten sebelum export PDF.",
      },
      {
        type: "h2",
        text: "Kesalahan yang sering bikin CV gagal parsing",
      },
      {
        type: "ol",
        items: [
          "Header/footer PDF yang memotong nama atau kontak di halaman berikutnya.",
          "Mengganti heading section dengan ikon atau singkatan tidak umum.",
          "Hanya menulis \"MS Office\" tanpa detail (Excel: pivot table, VLOOKUP, dll.).",
          "Link portfolio ditulis sebagai teks panjang tanpa format URL yang jelas.",
          "File gambar (JPG/PNG) dikirim sebagai CV — ATS tidak bisa membaca isinya.",
        ],
      },
      {
        type: "h2",
        text: "Checklist sebelum kirim lamaran",
      },
      {
        type: "ul",
        items: [
          "Nama file profesional: NamaLengkap-CV-Posisi.pdf",
          "PDF hasil export, bukan screenshot atau foto",
          "Isi disesuaikan 70–80% dengan job description target",
          "Tidak ada typo di email dan nomor telepon",
          "Panjang tetap fokus — idealnya satu halaman untuk early career",
        ],
      },
    ],
    faq: [
      {
        question: "Apakah CV berwarna dan bergambar pasti ditolak ATS?",
        answer:
          "Tidak selalu. Banyak ATS modern bisa membaca PDF modern. Risiko naik kalau layout terlalu kompleks atau teks ada di dalam gambar. Untuk lamaran formal, template bersih lebih aman.",
      },
      {
        question: "Haruskah CV dalam bahasa Inggris untuk ATS?",
        answer:
          "Sesuaikan dengan job description. Lowongan berbahasa Indonesia cukup CV Indonesia. Lowongan global/remote biasanya Inggris. Konsisten dalam satu dokumen.",
      },
      {
        question: "Berapa skor ATS yang aman?",
        answer:
          "Tidak ada angka universal — setiap perusahaan beda. Gunakan skor sebagai panduan perbaikan, bukan jaminan lolos. Fokus ke relevansi skill dan kejelasan format.",
      },
    ],
    relatedSlugs: ["cv-satu-halaman", "cv-fresh-graduate", "lamaran-kerja-online"],
    cta: {
      label: "Buat CV ATS-friendly sekarang",
      href: "/builder",
      description: "Template bersih, skor ATS, export PDF gratis — tanpa daftar.",
    },
  },
  {
    slug: "cv-fresh-graduate",
    title: "CV Fresh Graduate: Contoh Struktur & Tips Tanpa Pengalaman Kerja",
    description:
      "Panduan membuat CV fresh graduate untuk lulusan SMA/SMK/D3/S1: apa yang ditulis, urutan section, dan cara menonjolkan proyek kuliah atau organisasi.",
    keywords: [
      "cv fresh graduate",
      "cv lulusan baru",
      "cv tanpa pengalaman",
      "cv mahasiswa",
      "contoh cv fresh graduate",
    ],
    category: "cv",
    readTime: "6 menit",
    publishedAt: "2026-02-01",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Fresh graduate sering bingung: pengalaman kerja minim, tapi lowongan minta 1–2 tahun. Solusinya bukan mengarang pengalaman, melainkan menulis ulang aktivitas yang relevan — magang, proyek kuliah, organisasi, freelance, kompetisi — dengan bahasa profesional.",
      },
      {
        type: "h2",
        text: "Struktur CV fresh graduate yang disarankan",
      },
      {
        type: "ol",
        items: [
          "Profil singkat (2–3 kalimat): siapa kamu, jurusan, keahlian utama, tujuan karier.",
          "Pendidikan: IPK (jika bagus), prestasi, mata kuliah relevan.",
          "Pengalaman: magang, part-time, volunteer, proyek kampus — urut terbaru dulu.",
          "Proyek / portofolio: link GitHub, desain, atau hasil kerja praktis.",
          "Keahlian: pisahkan hard skill dan soft skill.",
          "Sertifikasi & aktivitas (opsional): course online, kompetisi, seminar.",
        ],
      },
      {
        type: "h2",
        text: "Cara menulis bullet point tanpa pengalaman \"resmi\"",
      },
      {
        type: "p",
        text: "Gunakan formula: Kegiatan + Tindakan + Hasil. Contoh untuk organisasi kampus: \"Mengkoordinasi tim 8 orang dalam acara open house fakultas; meningkatkan jumlah pengunjung 30% dibanding tahun sebelumnya.\" Angka kecil pun boleh asal jujur.",
      },
      {
        type: "h2",
        text: "Apa yang tidak perlu ditulis",
      },
      {
        type: "ul",
        items: [
          "Alamat lengkap rumah (cukup kota/kabupaten).",
          "Hobi generik tanpa kaitan ke pekerjaan (kecuali sangat relevan).",
          "Referensi lengkap di CV — cukup \"tersedia atas permintaan\".",
          "Foto (kecuali diminta perusahaan/industri tertentu).",
          "Gaji ekspektasi di CV awal.",
        ],
      },
      {
        type: "tip",
        text: "Kalau punya proyek atau portofolio, buat halaman portofolio singkat lalu cantumkan link di CV. Recruiter fresh grad sering klik link untuk lihat bukti kerja.",
      },
      {
        type: "h2",
        text: "Template mana yang cocok?",
      },
      {
        type: "p",
        text: "Untuk lamaran korporat dan BUMN: template Minimal atau Classic. Untuk startup/tech: Modern atau Academic (jika banyak proyek riset). Tetap satu halaman agar recruiter scan cepat.",
      },
    ],
    faq: [
      {
        question: "Fresh graduate wajib pakai CV satu halaman?",
        answer:
          "Sangat disarankan. Recruiter menghabiskan hitungan detik untuk screening awal. Satu halaman memaksa kamu menulis yang paling relevan saja.",
      },
      {
        question: "IPK rendah harus ditulis?",
        answer:
          "Jika di atas syarat minimum lowongan, tulis. Jika jauh di bawah, fokuskan ke proyek, skill, dan sertifikasi. Jangan bohong angka IPK.",
      },
      {
        question: "Boleh pakai CV yang sama untuk semua lamaran?",
        answer:
          "Boleh sebagai draft awal, tapi sesuaikan profil dan skill dengan setiap job description. 10 menit penyesuaian bisa meningkatkan relevansi.",
      },
    ],
    relatedSlugs: ["cv-magang", "cv-ats-friendly", "cover-letter-indonesia"],
    cta: {
      label: "Buat CV fresh graduate",
      href: "/builder",
      description: "Isi form, pilih template, unduh PDF — gratis tanpa daftar.",
    },
  },
  {
    slug: "cv-magang",
    title: "CV untuk Magang: Format, Isi, dan Tips Lolos Seleksi",
    description:
      "Cara membuat CV magang untuk mahasiswa dan pelajar SMA/SMK. Fokus pada motivasi, jadwal, skill dasar, dan aktivitas yang menunjukkan inisiatif.",
    keywords: [
      "cv magang",
      "contoh cv magang",
      "lamaran magang",
      "cv mahasiswa magang",
      "cv internship",
    ],
    category: "cv",
    readTime: "5 menit",
    publishedAt: "2026-02-10",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Lamaran magang berbeda dengan lamaran kerja penuh waktu. Perusahaan mencari potensi, kemauan belajar, dan ketersediaan waktu — bukan deretan pengalaman senior. CV magang yang baik jelas, jujur, dan menunjukkan kamu sudah siap membantu tim.",
      },
      {
        type: "h2",
        text: "Informasi wajib di CV magang",
      },
      {
        type: "ul",
        items: [
          "Status pendidikan: semester, jurusan, perkiraan lulus.",
          "Periode magang yang diinginkan (min. 3 bulan, remote/onsite).",
          "Ketersediaan hari/jam (misalnya Senin–Jumat, 09.00–17.00).",
          "Skill dasar yang relevan dengan divisi target.",
          "Kontak aktif (email + WhatsApp/Telegram jika umum di industri tersebut).",
        ],
      },
      {
        type: "h2",
        text: "Section yang menonjolkan diri tanpa pengalaman panjang",
      },
      {
        type: "p",
        text: "Prioritaskan: proyek kuliah/SMK, lomba, sertifikat online gratis (Coursera, Dicoding, dll.), organisasi, atau kontribusi open source. Satu proyek yang dijelaskan dengan baik lebih kuat daripada lima baris kosong.",
      },
      {
        type: "h2",
        text: "Profil singkat yang menarik perhatian",
      },
      {
        type: "p",
        text: "Contoh: \"Mahasiswa semester 6 Teknik Informatika dengan minat backend development. Terbiasa Python dan Git dari proyek kelas. Mencari magang 3–6 bulan untuk belajar API production dan kolaborasi tim agile.\"",
      },
      {
        type: "tip",
        text: "Sertakan link portofolio atau GitHub jika melamar divisi teknis, desain, atau marketing digital. Pastikan link aktif dan ada minimal satu sample work.",
      },
      {
        type: "h2",
        text: "Kesalahan umum lamaran magang",
      },
      {
        type: "ul",
        items: [
          "CV terlalu panjang — magang cukup satu halaman.",
          "Tidak menyebut periode magang — HR harus menebak.",
          "Mengirim CV generik tanpa menyebut divisi/role target.",
          "Salah nama perusahaan di cover letter (copy-paste tidak dicek).",
        ],
      },
    ],
    faq: [
      {
        question: "Magang perlu cover letter?",
        answer:
          "Sangat disarankan, terutama untuk perusahaan yang ramai pelamar. Jelaskan motivasi, apa yang ingin dipelajari, dan kontribusi yang bisa diberikan.",
      },
      {
        question: "CV magang pakai bahasa Indonesia atau Inggris?",
        answer:
          "Ikuti bahasa job posting. Multinasional dan tech startup sering Inggris; perusahaan lokal biasanya Indonesia.",
      },
    ],
    relatedSlugs: ["cv-fresh-graduate", "cover-letter-indonesia", "cv-satu-halaman"],
    cta: {
      label: "Buat CV magang gratis",
      href: "/builder",
      description: "Template satu halaman, preview langsung, siap kirim hari ini.",
    },
  },
  {
    slug: "cv-satu-halaman",
    title: "Kenapa CV Satu Halaman Lebih Efektif untuk Pelamar Kerja",
    description:
      "Alasan recruiter lebih suka CV one-pager, kapan boleh dua halaman, dan cara memadatkan pengalaman tanpa kehilangan dampak.",
    keywords: [
      "cv satu halaman",
      "one page resume",
      "cv singkat",
      "panjang cv ideal",
      "resume satu halaman",
    ],
    category: "cv",
    readTime: "4 menit",
    publishedAt: "2026-02-20",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "CV satu halaman bukan sekadar tren desain — itu strategi komunikasi. Recruiter yang meninjau puluhan hingga ratusan lamaran per hari butuh jawaban cepat: siapa kamu, apa yang bisa kamu lakukan, dan bukti relevansinya.",
      },
      {
        type: "h2",
        text: "Keuntungan CV satu halaman",
      },
      {
        type: "ul",
        items: [
          "Meningkatkan kemungkinan seluruh CV dibaca, bukan hanya paragraf pertama.",
          "Memaksa prioritisasi — hanya pengalaman paling relevan yang masuk.",
          "Lebih mudah dibaca di mobile saat HR cek lamaran di perjalanan.",
          "Export PDF lebih ringan dan rapi untuk ATS.",
        ],
      },
      {
        type: "h2",
        text: "Kapan CV dua halaman masih masuk akal?",
      },
      {
        type: "p",
        text: "Kandidat senior (10+ tahun) dengan banyak proyek lintas industri, akademisi dengan publikasi panjang, atau konsultan yang memang perlu daftar klien detail. Untuk fresh graduate hingga 5 tahun pengalaman, satu halaman hampir selalu lebih kuat.",
      },
      {
        type: "h2",
        text: "Cara memadatkan tanpa kehilangan kualitas",
      },
      {
        type: "ol",
        items: [
          "Maksimal 3–5 bullet per posisi pengalaman terbaru; posisi lama bisa 1–2.",
          "Gabungkan skill mirip: \"Figma, Adobe XD\" bukan satu per baris.",
          "Hapus pekerjaan >10 tahun yang tidak relevan dengan role target.",
          "Profil cukup 2–3 kalimat, bukan paragraf panjang.",
          "Gunakan angka untuk menunjukkan dampak: waktu, persen, volume.",
        ],
      },
      {
        type: "tip",
        text: "CV Satu Halaman punya indikator panjang kertas dinamis — kalau konten mulai penuh, itu sinyal untuk memangkas, bukan menambah halaman.",
      },
    ],
    faq: [
      {
        question: "Font kecil supaya muat satu halaman — boleh?",
        answer:
          "Hindari di bawah 10 pt. Lebih baik kurangi teks daripada susah dibaca. Recruiter tidak akan zoom CV yang tidak nyaman di mata.",
      },
      {
        question: "Margin tipis supaya muat — aman untuk ATS?",
        answer:
          "Margin standar (sekitar 15–20 mm) lebih aman. Margin ekstrem kadang terpotong saat parsing atau print.",
      },
    ],
    relatedSlugs: ["cv-ats-friendly", "cv-fresh-graduate", "faq"],
    cta: {
      label: "Coba builder CV satu halaman",
      href: "/builder",
      description: "Dirancang khusus untuk one-pager — gratis, tanpa watermark.",
    },
  },
  {
    slug: "cover-letter-indonesia",
    title: "Cara Menulis Cover Letter Profesional (Bahasa Indonesia & Inggris)",
    description:
      "Struktur surat lamaran yang benar, contoh pembukaan, kesalahan umum, dan kapan cover letter wajib dikirim bersama CV.",
    keywords: [
      "cover letter",
      "surat lamaran kerja",
      "contoh cover letter",
      "cara tulis surat lamaran",
      "application letter",
    ],
    category: "lamaran",
    readTime: "6 menit",
    publishedAt: "2026-03-01",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Cover letter (surat lamaran) menjelaskan motivasi dan relevansi kamu dengan posisi — sesuatu yang tidak selalu terbaca dari CV saja. Surat yang baik singkat, spesifik ke perusahaan, dan tidak mengulang CV baris per baris.",
      },
      {
        type: "h2",
        text: "Struktur cover letter standar",
      },
      {
        type: "ol",
        items: [
          "Header: data pengirim, tanggal, data penerima (jika diketahui).",
          "Salam formal: \"Dengan hormat,\" atau \"Dear Hiring Manager,\".",
          "Paragraf 1: posisi yang dilamar + dari mana tahu lowongan + hook singkat.",
          "Paragraf 2: bukti relevansi — 1–2 pencapaian terbaik yang match JD.",
          "Paragraf 3: motivasi ke perusahaan + siap interview + penutup sopan.",
          "Tanda tangan/nama lengkap.",
        ],
      },
      {
        type: "h2",
        text: "Contoh kalimat pembuka yang kuat",
      },
      {
        type: "p",
        text: "\"Saya tertarik melamar posisi Junior Data Analyst di [Perusahaan], sebagaimana diumumkan di LinkedIn. Latar belakang statistik dan pengalaman proyek analisis penjualan e-commerce selama magang membuat saya yakin bisa berkontribusi pada tim growth.\"",
      },
      {
        type: "h2",
        text: "Kesalahan yang sering terjadi",
      },
      {
        type: "ul",
        items: [
          "Template generik tanpa nama perusahaan atau posisi.",
          "Terlalu panjang (lebih dari satu halaman A4).",
          "Mengulang seluruh isi CV dengan format paragraf.",
          "Nada terlalu santai atau terlalu kaku berlebihan.",
          "Salah eja nama perusahaan atau nama recruiter.",
        ],
      },
      {
        type: "tip",
        text: "Di CV Satu Halaman, kamu bisa generate draft cover letter dari data CV yang sudah diisi, lalu edit paragraf motivasi supaya spesifik ke tiap lowongan.",
      },
    ],
    faq: [
      {
        question: "Cover letter wajib untuk semua lamaran?",
        answer:
          "Tidak selalu. Portal karir besar kadang tidak punya field upload surat. Kirim cover letter saat ada opsi upload, email langsung ke HR, atau lamaran ke perusahaan impian.",
      },
      {
        question: "Bahasa Indonesia atau Inggris?",
        answer:
          "Samakan dengan job posting dan budaya perusahaan. Jika ragu, Inggris untuk multinasional; Indonesia untuk perusahaan lokal.",
      },
    ],
    relatedSlugs: ["lamaran-kerja-online", "cv-ats-friendly", "cv-fresh-graduate"],
    cta: {
      label: "Buat cover letter",
      href: "/cover-letter/builder",
      description: "Generate dari CV, export PDF, bagikan link — gratis.",
    },
  },
  {
    slug: "lamaran-kerja-online",
    title: "Tips Lamar Kerja Online: Portal, Email, dan Follow-up yang Benar",
    description:
      "Panduan melamar kerja lewat Jobstreet, LinkedIn, email, dan website perusahaan — file apa yang disiapkan dan etika follow-up setelah kirim lamaran.",
    keywords: [
      "lamar kerja online",
      "cara melamar kerja",
      "tips lamaran kerja",
      "kirim cv lewat email",
      "lamaran kerja indonesia",
    ],
    category: "lamaran",
    readTime: "6 menit",
    publishedAt: "2026-03-15",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Melamar online terlihat mudah — klik apply, upload file, selesai. Tapi persaingan tinggi dan kesalahan kecil (format file, subject email, profil tidak konsisten) bisa membuat lamaran terlewat. Berikut alur yang rapi dari persiapan sampai follow-up.",
      },
      {
        type: "h2",
        text: "Persiapan sebelum melamar",
      },
      {
        type: "ul",
        items: [
          "CV PDF terbaru, nama file jelas: Nama-Role.pdf",
          "Cover letter versi singkat (PDF atau paste di form)",
          "Portofolio/link GitHub/LinkedIn sudah diperbarui",
          "Screenshot atau catatan job description untuk penyesuaian CV",
          "Akun email profesional (hindari nickname tidak serius)",
        ],
      },
      {
        type: "h2",
        text: "Melamar lewat portal karir",
      },
      {
        type: "p",
        text: "Isi form sampai 100% jika memungkinkan — banyak sistem memberi prioritas profil lengkap. Jawab pertanyaan screening jujur. Upload CV meski portal punya form manual; CV tetap jadi referensi HR.",
      },
      {
        type: "h2",
        text: "Melamar lewat email",
      },
      {
        type: "ol",
        items: [
          "Subject jelas: \"Lamaran [Posisi] — [Nama Lengkap]\"",
          "Body email singkat (3–5 kalimat) + lampiran PDF",
          "Jangan kirim CV dalam format Word kecuali diminta",
          "Maksimal 2 lampiran: CV + cover letter (gabung jika perlu)",
          "Cek typo nama perusahaan sebelum klik send",
        ],
      },
      {
        type: "h2",
        text: "Follow-up: kapan dan bagaimana",
      },
      {
        type: "p",
        text: "Tunggu 5–7 hari kerja jika tidak ada kabar. Kirim satu email follow-up sopan — ingatkan posisi, tanggal kirim, dan minat tetap. Hindari spam harian atau DM berlebihan di LinkedIn.",
      },
      {
        type: "tip",
        text: "Simpan link share CV/portofolio dari builder untuk lamaran yang minta \"link tambahan\" — recruiter bisa buka tanpa download.",
      },
    ],
    faq: [
      {
        question: "Boleh melamar banyak posisi di perusahaan yang sama?",
        answer:
          "Boleh jika skill relevan untuk semua. Sesuaikan CV dan cover letter per posisi. Jangan kirim file identik ke 5 role berbeda tanpa penyesuaian.",
      },
      {
        question: "LinkedIn Easy Apply cukup tanpa CV?",
        answer:
          "Kadang cukup untuk screening awal, tapi siapkan CV PDF untuk tahap berikutnya. Profil LinkedIn harus konsisten dengan CV.",
      },
    ],
    relatedSlugs: ["cover-letter-indonesia", "cv-ats-friendly", "faq"],
    cta: {
      label: "Siapkan CV & portofolio",
      href: "/builder",
      description: "Buat CV, portofolio, dan cover letter dalam satu ekosistem gratis.",
    },
  },
  {
    slug: "portofolio-profil",
    title: "Portofolio Online untuk Pelamar Kerja: Apa yang Perlu Ditampilkan",
    description:
      "Panduan membuat portofolio profesional untuk developer, desainer, dan role kreatif — section wajib, contoh proyek, dan cara link ke CV.",
    keywords: [
      "portofolio online",
      "portfolio maker",
      "portofolio kerja",
      "portofolio fresh graduate",
      "link portofolio cv",
    ],
    category: "portofolio",
    readTime: "5 menit",
    publishedAt: "2026-04-01",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Untuk role berbasis hasil kerja — coding, desain, konten, marketing — portofolio sering lebih meyakinkan daripada daftar skill panjang. Portofolio yang baik fokus pada 3–6 proyek terbaik dengan konteks masalah, peran kamu, dan hasil.",
      },
      {
        type: "h2",
        text: "Section wajib portofolio profesional",
      },
      {
        type: "ul",
        items: [
          "Profil singkat + foto/avatar profesional (opsional)",
          "Daftar skill dikelompokkan (tools, bahasa, domain)",
          "Proyek unggulan: judul, deskripsi, tech stack, link demo/repo",
          "Kontak + LinkedIn/GitHub/email",
          "Bahasa Indonesia atau Inggris — konsisten",
        ],
      },
      {
        type: "h2",
        text: "Cara menulis deskripsi proyek",
      },
      {
        type: "p",
        text: "Gunakan format: Masalah → Solusi → Peran kamu → Hasil. Contoh: \"Toko UMKM kesulitan tracking stok manual. Saya buat aplikasi web inventori dengan React dan Firebase. Mengurangi waktu input harian dari 2 jam menjadi 30 menit (uji 2 minggu).\"",
      },
      {
        type: "h2",
        text: "Hubungkan portofolio dengan CV",
      },
      {
        type: "p",
        text: "Cantumkan satu baris link portofolio di header CV. Di portofolio, sebut posisi yang kamu incar. Impor data dari CV ke portofolio menghemat waktu dan menjaga konsistensi nama, skill, dan kontak.",
      },
      {
        type: "tip",
        text: "CV Satu Halaman punya generator portofolio dengan 3 template dan share link read-only — cocok untuk lampiran lamaran atau bio LinkedIn.",
      },
    ],
    faq: [
      {
        question: "Portofolio wajib untuk semua profesi?",
        answer:
          "Tidak. Paling penting untuk tech, desain, kreatif, dan role berbasis project. Untuk admin, ops, atau support, CV kuat + sertifikasi sering sudah cukup.",
      },
      {
        question: "Boleh pakai project kuliah di portofolio?",
        answer:
          "Ya, terutama fresh graduate. Jelaskan scope, stack, dan apa yang kamu pelajari. Jujur tentang team project vs solo.",
      },
    ],
    relatedSlugs: ["cv-fresh-graduate", "lamaran-kerja-online", "cv-magang"],
    cta: {
      label: "Buat portofolio gratis",
      href: "/portfolio/builder",
      description: "3 template, import dari CV, share link & export PDF.",
    },
  },
  {
    slug: "faq",
    title: "FAQ — Pertanyaan Umum tentang CV Satu Halaman",
    description:
      "Jawaban pertanyaan sering diajukan: gratis atau tidak, privasi data, export PDF, template, ATS, multi-draft, dan cara pakai tool.",
    keywords: [
      "faq cv online",
      "cv gratis",
      "buat cv tanpa daftar",
      "cv maker indonesia",
    ],
    category: "umum",
    readTime: "5 menit",
    publishedAt: "2026-01-01",
    updatedAt: "2026-06-26",
    blocks: [
      {
        type: "p",
        text: "Kumpulan pertanyaan yang sering masuk lewat chat dan feedback pengguna. Kalau jawabanmu tidak ada di sini, hubungi kami lewat halaman Contact.",
      },
      {
        type: "h2",
        text: "Tentang layanan",
      },
    ],
    faq: [
      {
        question: "Apakah CV Satu Halaman benar-benar gratis?",
        answer:
          "Ya. Semua fitur builder CV, portofolio, dan cover letter gratis tanpa langganan, tanpa watermark pada PDF, dan tanpa batas jumlah download.",
      },
      {
        question: "Perlu daftar akun atau login?",
        answer:
          "Tidak. Data disimpan di browser kamu (localStorage). Buka dari perangkat lain = data tidak ikut, kecuali kamu export/share manual.",
      },
      {
        question: "Apakah data CV diupload ke server?",
        answer:
          "Tidak untuk penyimpanan utama. Data tetap di perangkat kamu. Fitur share link meng-encode data di URL — tidak disimpan di database kami.",
      },
      {
        question: "Berapa template CV yang tersedia?",
        answer:
          "Enam: Modern, Minimal, Classic, Academic, Creative, dan Executive. Default direkomendasikan Minimal untuk ATS.",
      },
      {
        question: "Bisa export PDF?",
        answer:
          "Ya, satu klik dari builder. Pastikan preview sudah termuat sebelum export.",
      },
      {
        question: "Apa itu skor ATS di builder?",
        answer:
          "Penilaian otomatis berdasarkan kelengkapan kontak, struktur, action verb, metrik, dan kepadatan konten. Panduan perbaikan, bukan jaminan lolos seleksi.",
      },
      {
        question: "Bisa simpan beberapa draft CV?",
        answer:
          "Ya, fitur multi-draft untuk CV, portofolio, dan cover letter. Ganti nama, duplikat, atau hapus draft dari panel Draft tersimpan.",
      },
      {
        question: "Bisa import dari LinkedIn?",
        answer:
          "Ya, lewat copy-paste teks profil LinkedIn ke panel import. Parser mengisi form otomatis; hasil tergantung kelengkapan teks yang disalin.",
      },
      {
        question: "Bahasa Indonesia dan Inggris didukung?",
        answer:
          "Ya, label section dan export bisa ID atau EN — berguna untuk lamaran lokal maupun remote.",
      },
      {
        question: "Bisa dipakai offline?",
        answer:
          "Setelah pertama kali dibuka (dan terinstall sebagai PWA di production), beberapa halaman bisa diakses offline. Penyimpanan tetap lokal di browser.",
      },
      {
        question: "Bagaimana cara dukung pengembangan?",
        answer:
          "Tool tetap gratis. Kalau membantu, donasi sukarela tersedia di halaman Donasi — tidak mengubah akses fitur.",
      },
    ],
    relatedSlugs: ["cv-ats-friendly", "cv-satu-halaman", "lamaran-kerja-online"],
    cta: {
      label: "Mulai buat CV",
      href: "/builder",
      description: "Gratis, tanpa daftar, langsung di browser.",
    },
  },
];

export const seoArticleMap = Object.fromEntries(
  seoArticles.map((article) => [article.slug, article]),
) as Record<string, SeoArticle>;

export function getSeoArticle(slug: string): SeoArticle | undefined {
  return seoArticleMap[slug];
}

export const seoCategoryLabels: Record<SeoArticle["category"], string> = {
  cv: "CV & Resume",
  lamaran: "Lamaran Kerja",
  portofolio: "Portofolio",
  umum: "Umum",
};
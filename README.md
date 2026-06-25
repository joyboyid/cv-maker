# CV Satu Halaman

**Gratis · Open Source · Tanpa daftar**

Tool pembuatan CV dan resume satu halaman untuk pelamar kerja Indonesia. ATS-friendly, preview langsung, export PDF, data tersimpan lokal di browser.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)

## Fitur

- 3 template: Modern, Minimal, Classic
- Export PDF satu klik
- Bahasa Indonesia & Inggris
- Auto-save di `localStorage` (tanpa server)
- Skor panjang konten untuk one-pager
- **100% gratis** — tanpa paywall, tanpa watermark, tanpa langganan

## Mulai cepat

```bash
git clone https://github.com/YOUR_USERNAME/cv-satu-halaman.git
cd cv-satu-halaman
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Konfigurasi (opsional)

Salin `.env.example` ke `.env.local` dan isi URL repo GitHub kamu:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_GITHUB_URL=https://github.com/username/cv-satu-halaman
```

## Deploy

Deploy gratis ke [Vercel](https://vercel.com), [Netlify](https://netlify.com), atau hosting static/Node.js lainnya:

```bash
npm run build
npm run start
```

## Open Source

Proyek ini dilisensikan di bawah **MIT License** — kamu bebas:

- Memakai untuk keperluan pribadi atau komersial
- Memodifikasi dan mendistribusikan ulang
- Menghosting versi sendiri

Lihat [LICENSE](./LICENSE) untuk detail lengkap.

Ingin berkontribusi? Baca [CONTRIBUTING.md](./CONTRIBUTING.md).

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) untuk export PDF

## Privasi

Data CV **tidak dikirim ke server**. Semua penyimpanan terjadi di browser pengguna.

---

Dibuat untuk pelamar kerja Indonesia. Kontribusi dipersilakan.
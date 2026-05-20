<p align="center">
  <img src="docs/assets/banner.png" alt="Dapur Yatim Banner" width="100%" />
</p>

<h1 align="center">🍽️ LKSA Dapur Yatim — Platform Donasi & Transparansi</h1>

<p align="center">
  Platform web modern untuk mendukung transparansi donasi, kegiatan, dan laporan keuangan <br/>
  Lembaga Kesejahteraan Sosial Anak (LKSA) Dapur Yatim.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/PostgreSQL-16.x-336791?style=flat-square&logo=postgresql" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

---

## 📌 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Alur Pengguna](#-alur-pengguna)
- [Prasyarat](#-prasyarat)
- [Instalasi & Setup](#-instalasi--setup)
- [Environment Variables](#-environment-variables)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Tentang Proyek

**LKSA Dapur Yatim** adalah lembaga sosial yang berfokus pada pemenuhan kebutuhan anak yatim dan dhuafa. Platform ini dibangun untuk menjawab kebutuhan nyata: **kurangnya transparansi pengelolaan donasi** pada lembaga sosial yang menyebabkan penurunan kepercayaan calon donatur.

Platform ini dirancang dengan pendekatan **Soft Minimalist Modern** — mengutamakan kepercayaan, keterbukaan, dan kemudahan akses informasi bagi calon donatur, baik melalui perangkat desktop maupun mobile.

> ⚠️ **Disclaimer:** Repositori ini merupakan template pengembangan. Data yang ditampilkan bersifat placeholder dan perlu digantikan dengan data nyata sebelum deployment produksi.

---

## ✨ Fitur Utama

| Fitur | Deskripsi | Status |
|-------|-----------|--------|
| 🏠 Beranda | Hero section, statistik dampak, program unggulan | ✅ |
| 📖 Tentang Kami | Profil lembaga, visi misi, tim pengurus | ✅ |
| 📅 Kegiatan | Galeri kegiatan, dokumentasi program | ✅ |
| 💳 Donasi | Form donasi, pilihan metode pembayaran | ✅ |
| 📊 Transparansi | Laporan keuangan, progress fundraising | ✅ |
| 📞 Kontak | Form kontak, lokasi, media sosial | ✅ |
| 🔐 Admin Panel | Manajemen konten, laporan donasi | 🔄 |
| 📧 Email Notifikasi | Konfirmasi donasi otomatis via email | 🔄 |

---

## 🛠️ Tech Stack

### Frontend
| Teknologi | Versi | Kegunaan |
|-----------|-------|---------|
| [React](https://react.dev/) | 18.x | UI Library |
| [Vite](https://vitejs.dev/) | 5.x | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first CSS Framework |
| [React Router DOM](https://reactrouter.com/) | 6.x | Client-side Routing |
| [Axios](https://axios-http.com/) | 1.x | HTTP Client |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Form Management |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animasi & Transisi |

### Backend
| Teknologi | Versi | Kegunaan |
|-----------|-------|---------|
| [Node.js](https://nodejs.org/) | 20.x LTS | Runtime Environment |
| [Express.js](https://expressjs.com/) | 4.x | Web Framework |
| [Knex.js](https://knexjs.org/) | 3.x | Query Builder & Migrations |
| [JWT](https://jwt.io/) | — | Autentikasi Token |
| [Bcrypt](https://www.npmjs.com/package/bcryptjs) | — | Password Hashing |
| [Nodemailer](https://nodemailer.com/) | — | Email Notifications |
| [Multer](https://github.com/expressjs/multer) | — | Upload File/Gambar |
| [Joi](https://joi.dev/) | — | Validasi Input |

### Database
| Teknologi | Versi | Kegunaan |
|-----------|-------|---------|
| [PostgreSQL](https://www.postgresql.org/) | 16.x | Relational Database |

### DevOps & Tools
| Teknologi | Kegunaan |
|-----------|---------|
| [Docker](https://www.docker.com/) | Containerization |
| [GitHub Actions](https://github.com/features/actions) | CI/CD Pipeline |
| [ESLint + Prettier](https://eslint.org/) | Code Quality |

---

## 📁 Struktur Proyek

```
dapur-yatim/
├── 📁 frontend/                    # React + Vite Application
│   ├── 📁 public/
│   │   └── favicon.ico
│   ├── 📁 src/
│   │   ├── 📁 assets/              # Gambar, ikon, font statis
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── 📁 components/          # Reusable UI Components
│   │   │   ├── 📁 common/          # Tombol, Badge, Modal, dll
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── ProgressBar.jsx
│   │   │   ├── 📁 layout/          # Navbar, Footer, Layout Wrapper
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── PageLayout.jsx
│   │   │   ├── 📁 pages/           # Komponen spesifik per halaman
│   │   │   │   ├── home/
│   │   │   │   ├── about/
│   │   │   │   ├── activities/
│   │   │   │   ├── donation/
│   │   │   │   ├── transparency/
│   │   │   │   └── contact/
│   │   │   └── 📁 ui/              # Komponen Shadcn-style (Input, Select)
│   │   ├── 📁 hooks/               # Custom React Hooks
│   │   │   ├── useApi.js
│   │   │   └── useDonation.js
│   │   ├── 📁 lib/                 # Utilities, helpers, axios config
│   │   │   ├── api.js
│   │   │   └── utils.js
│   │   ├── 📁 pages/               # Route-level Page Components
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ActivitiesPage.jsx
│   │   │   ├── DonationPage.jsx
│   │   │   ├── TransparencyPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── 📁 styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── .eslintrc.cjs
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── 📁 backend/                     # Node.js + Express API
│   ├── 📁 src/
│   │   ├── 📁 config/              # Konfigurasi DB, environment
│   │   │   ├── database.js
│   │   │   └── env.js
│   │   ├── 📁 controllers/         # Business Logic Handler
│   │   │   ├── donationController.js
│   │   │   ├── activityController.js
│   │   │   ├── reportController.js
│   │   │   └── contactController.js
│   │   ├── 📁 middleware/          # Auth, error handler, validator
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validateRequest.js
│   │   ├── 📁 models/              # Database Query Abstraction
│   │   │   ├── Donation.js
│   │   │   ├── Activity.js
│   │   │   └── Report.js
│   │   ├── 📁 routes/              # API Route Definitions
│   │   │   ├── index.js
│   │   │   ├── donationRoutes.js
│   │   │   ├── activityRoutes.js
│   │   │   ├── reportRoutes.js
│   │   │   └── contactRoutes.js
│   │   ├── 📁 services/            # External service integrations
│   │   │   ├── emailService.js
│   │   │   └── paymentService.js
│   │   ├── 📁 utils/               # Helper functions
│   │   │   └── formatCurrency.js
│   │   └── app.js                  # Express app entry point
│   ├── 📁 tests/
│   │   └── donation.test.js
│   ├── .env.example
│   ├── knexfile.js
│   └── package.json
│
├── 📁 database/                    # Database Scripts
│   ├── 📁 migrations/              # Knex migration files
│   │   ├── 001_create_donations.js
│   │   ├── 002_create_activities.js
│   │   └── 003_create_reports.js
│   ├── 📁 seeds/                   # Data awal / dummy data
│   │   └── 01_seed_activities.js
│   └── schema.sql                  # Raw SQL schema reference
│
├── 📁 docs/                        # Dokumentasi Proyek
│   ├── API.md                      # API endpoint docs
│   ├── DATABASE.md                 # Penjelasan schema DB
│   └── DEPLOYMENT.md               # Panduan deployment
│
├── 📁 .github/                     # GitHub Config
│   ├── 📁 workflows/
│   │   └── ci.yml                  # GitHub Actions CI/CD
│   └── 📁 ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── .gitignore
├── docker-compose.yml
└── README.md                       # ← File ini
```

---

## 🔄 Alur Pengguna (User Flow)

Berikut alur navigasi utama bagi calon donatur:

```
┌─────────────────────────────────────────────────────┐
│                  CALON DONATUR                      │
└─────────────────────────────────────────────────────┘
         │
         ▼
    ┌─────────┐
    │  HOME   │ → Hero Section, Statistik Dampak, Program Unggulan
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │  ABOUT  │ → Profil Lembaga, Visi Misi, Legalitas, Tim
    └────┬────┘
         │
         ▼
    ┌────────────┐
    │ ACTIVITIES │ → Dokumentasi Kegiatan, Galeri, Timeline Program
    └─────┬──────┘
          │
          ▼
    ┌──────────┐
    │ DONATION │ → Pilih Nominal, Metode Pembayaran, Konfirmasi
    └─────┬────┘
          │
          ▼
    ┌────────────────┐
    │ TRANSPARENCY   │ → Laporan Keuangan, Progress Fundraising,
    │                │   Bukti Transfer, Distribusi Dana
    └─────┬──────────┘
          │
          ▼
    ┌─────────┐
    │ CONTACT │ → Form Kontak, WhatsApp, Lokasi, Sosial Media
    └─────────┘
```

---

## ✅ Prasyarat

Pastikan perangkat Anda telah terinstall:

- **Node.js** v20.x LTS ([Download](https://nodejs.org/))
- **npm** v10.x atau **yarn** v1.x
- **PostgreSQL** v16.x ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Instalasi & Setup

### 1. Clone Repositori

```bash
git clone https://github.com/username/dapur-yatim.git
cd dapur-yatim
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit file .env sesuai konfigurasi lokal Anda
npm install
```

### 3. Setup Database

```bash
# Buat database PostgreSQL
psql -U postgres -c "CREATE DATABASE dapur_yatim_db;"

# Jalankan migrasi
npm run db:migrate

# (Opsional) Isi data dummy
npm run db:seed
```

### 4. Setup Frontend

```bash
cd ../frontend
cp .env.example .env
# Edit VITE_API_URL sesuai URL backend lokal Anda
npm install
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Application
NODE_ENV=development
PORT=3001
APP_URL=http://localhost:3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dapur_yatim_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=LKSA Dapur Yatim
```

---

## ▶️ Menjalankan Aplikasi

### Mode Development

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### Menggunakan Docker Compose

```bash
docker-compose up --build
```

Aplikasi akan tersedia di:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/v1/health

---

## 📡 API Documentation

Dokumentasi endpoint lengkap tersedia di [`docs/API.md`](docs/API.md).

### Ringkasan Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/v1/health` | Health check |
| `GET` | `/api/v1/activities` | Daftar kegiatan |
| `GET` | `/api/v1/activities/:id` | Detail kegiatan |
| `POST` | `/api/v1/donations` | Submit donasi baru |
| `GET` | `/api/v1/donations/stats` | Statistik donasi publik |
| `GET` | `/api/v1/reports` | Laporan keuangan publik |
| `POST` | `/api/v1/contact` | Kirim pesan kontak |

---

## 🗄️ Database Schema

Lihat [`docs/DATABASE.md`](docs/DATABASE.md) untuk detail lengkap.

### Tabel Utama

```
donations       → Data donatur dan transaksi
activities      → Program dan kegiatan lembaga
reports         → Laporan keuangan bulanan
contacts        → Pesan masuk dari formulir kontak
admins          → Akun pengelola sistem (internal)
```

---

## 🤝 Contributing

Kontribusi sangat terbuka! Silakan ikuti langkah berikut:

1. Fork repositori ini
2. Buat branch fitur baru: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah fitur X"`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat Pull Request ke branch `develop`

Panduan commit mengikuti [Conventional Commits](https://www.conventionalcommits.org/).

---

## 📄 License

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  Dibuat dengan ❤️ untuk mendukung transparansi dan kepercayaan lembaga sosial Indonesia.
</p>

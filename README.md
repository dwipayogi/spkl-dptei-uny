# SPKL DPTEI - Sistem Pengukuran Kelayakan Laboratorium

<div align="center">
  <img src="./public/logo-uny.png" alt="Logo UNY" width="120" height="120">
  
  **Sistem Pengukuran Kelayakan Laboratorium Berdasarkan ISO/IEC 17025:2017**  
  **Departemen Pendidikan Teknik Elektronika dan Informatika - UNY**
</div>

## 📋 Deskripsi Proyek

SPKL DPTEI adalah aplikasi web berbasis Next.js yang dirancang untuk mengukur dan mengevaluasi kelayakan laboratorium berdasarkan standar ISO/IEC 17025:2017. Sistem ini membantu Departemen Pendidikan Teknik Elektronika dan Informatika UNY dalam mengelola compliance dan kualitas laboratorium secara digital dan terintegrasi.

## ✨ Fitur Utama

### 🔐 **Manajemen Pengguna**

- Sistem autentikasi (login/register) dengan JWT
- Manajemen sesi pengguna yang aman
- Role-based access control

### 🏭 **Manajemen Laboratorium**

- Pendaftaran dan pengelolaan data laboratorium
- Monitoring persentase compliance
- Tracking tanggal inspeksi terakhir
- Dashboard visual untuk status laboratorium

### 📝 **Sistem Asesmen**

- Periode asesmen yang dapat dikonfigurasi
- Formulir asesmen berbasis standar ISO/IEC 17025:2017
- Penyimpanan jawaban dalam format JSON
- Upload dokumen pendukung untuk setiap asesmen
- Sistem penilaian otomatis

### 📊 **Dashboard & Laporan**

- Statistik real-time laboratorium
- Grafik compliance berdasarkan kategori
- Bar chart perbandingan antar laboratorium
- Status compliance dengan indikator visual

### 📄 **Manajemen Dokumen**

- Upload dan kategorisasi dokumen
- Penyimpanan file menggunakan Vercel Blob
- Metadata dokumen lengkap (ukuran, tipe, tanggal upload)
- Sistem pencarian dan filter dokumen

### 📈 **Visualisasi Data**

- Chart compliance kategori menggunakan Recharts
- Dashboard interaktif dengan filter
- Export laporan (dalam pengembangan)

## 🛠️ Teknologi yang Digunakan

### Frontend & Framework

- **Next.js 15.5.6** - React framework dengan App Router (optimized for security and performance)
- **React 19** - Library UI utama
- **TypeScript 5** - Type-safe JavaScript dengan strict mode
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components & Styling

- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **Class Variance Authority** - Utility untuk variant styling
- **Tailwind Merge & clsx** - Class name utilities

### Backend & Database

- **Neon Database** - PostgreSQL serverless database
- **Vercel Blob** - File storage solution
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing

### Data Visualization

- **Recharts** - Charts dan grafik
- **React Day Picker** - Date picker component
- **date-fns** - Date manipulation utilities

## ⚡ Optimisasi Performa

Proyek ini telah dioptimalkan untuk performa dan keamanan yang maksimal:

### 🔒 Keamanan
- **Next.js 15.5.6** - Versi terbaru dengan patch keamanan
- **Zero vulnerabilities** - Semua kerentanan keamanan telah diperbaiki
- **JWT token security** - Autentikasi yang aman dengan token expiration

### 🚀 Performa
- **Standalone output** - Build optimized untuk deployment
- **Image optimization** - Logo dan gambar dikompres hingga 83.6% lebih kecil
- **Font optimization** - Preload dan fallback untuk loading cepat
- **AVIF & WebP support** - Format gambar modern untuk ukuran file lebih kecil
- **Package imports optimization** - Tree-shaking untuk bundle size lebih kecil
- **Compression enabled** - Gzip compression untuk response yang lebih cepat

### 📦 Build Configuration
- **TypeScript strict mode** - Type safety yang maksimal
- **Console removal in production** - Build size lebih kecil
- **ETag generation** - Browser caching yang efisien
- **Incremental compilation** - Build time yang lebih cepat

### 🛠️ Development Tools
```bash
npm run dev          # Development dengan Turbopack
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # Code quality check
npm run optimize:images  # Optimize image assets
npm run analyze      # Bundle size analysis
```


## 🏗️ Struktur Proyek

```
spkl-dptei/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── assessment-files/     # File management API
│   │   └── upload-document/      # Document upload API
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   └── register/            # Register page
│   ├── dashboard/               # Main dashboard
│   │   ├── asesmen/            # Assessment module
│   │   ├── dokumen/            # Document management
│   │   ├── laboratorium/       # Laboratory management
│   │   └── components/         # Dashboard components
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                  # Reusable components
│   ├── ui/                     # UI component library
│   ├── loginForm.tsx           # Login form component
│   ├── registerForm.tsx        # Register form component
│   └── datePicker.tsx          # Date picker component
├── contexts/                   # React contexts
│   ├── auth-context.tsx        # Authentication context
│   └── sidebar-context.tsx     # Sidebar state context
├── db/                        # Database related files
│   ├── db.ts                  # Database configuration
│   └── migration.sql          # Database schema migration
├── lib/                       # Utility libraries
│   ├── auth.ts               # Authentication utilities
│   ├── blob-config.ts        # File storage configuration
│   └── utils.ts              # General utilities
└── public/                   # Static assets
    └── logo-uny.png          # UNY logo
```

## 📊 Database Schema

Sistem menggunakan PostgreSQL dengan schema sebagai berikut:

- **User** - Data pengguna dan autentikasi
- **Laboratory** - Informasi laboratorium dan status compliance
- **Assessment** - Master pertanyaan asesmen
- **AssessmentPeriod** - Periode asesmen yang dapat dikonfigurasi
- **AssessmentAnswer** - Jawaban asesmen dengan dukungan file
- **Document** - Manajemen dokumen dengan metadata lengkap

## 🚀 Setup & Installation

### Prerequisites
- Node.js 20 atau lebih baru
- PostgreSQL database (Neon Database recommended)
- Vercel Blob storage account (untuk file uploads)

### Installation Steps

1. **Clone repository**
```bash
git clone https://github.com/dwipayogi/spkl-dptei-uny.git
cd spkl-dptei-uny
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file dengan credentials Anda:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_random_secret
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

4. **Run database migration**
```bash
# Import db/migration.sql ke PostgreSQL database Anda
```

5. **Run development server**
```bash
npm run dev
```

Akses aplikasi di `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 🎯 Penggunaan

### 1. **Registrasi & Login**

- Akses `/auth/register` untuk membuat akun baru
- Login melalui `/auth/login` dengan kredensial yang telah dibuat

### 2. **Manajemen Laboratorium**

- Tambah laboratorium baru di menu "Laboratorium"
- Monitor status compliance dan tanggal inspeksi
- Update data laboratorium sesuai kebutuhan

### 3. **Pelaksanaan Asesmen**

- Buat periode asesmen baru di menu "Asesmen"
- Isi formulir asesmen berdasarkan standar ISO/IEC 17025:2017
- Upload dokumen pendukung untuk setiap jawaban
- Review dan submit asesmen

### 4. **Monitoring Dashboard**

- Pantau statistik compliance secara real-time
- Analisis grafik performa per kategori
- Bandingkan performa antar laboratorium

## 📄 Lisensi

Proyek ini dikembangkan untuk kepentingan pendidikan dan penelitian di lingkungan Universitas Negeri Yogyakarta.

<div align="center">
  <strong>SPKL DPTEI - ISO/IEC 17025:2017 Laboratory Compliance System</strong><br>
  <em>Mendukung Standar Laboratorium Berkualitas Internasional</em>
</div>

# Sistem Upload Dokumen

## Fitur Upload Dokumen ke Vercel Blob dan PostgreSQL

### Struktur File yang Dibuat/Dimodifikasi:

1. **`app/dashboard/dokumen/actions.ts`** - Server actions untuk CRUD dokumen
2. **`app/dashboard/dokumen/components/DocumentUploadForm.tsx`** - Form upload dokumen
3. **`app/dashboard/dokumen/components/DocumentDeleteDialog.tsx`** - Dialog konfirmasi hapus dokumen
4. **`app/dashboard/dokumen/upload/page.tsx`** - Halaman upload dokumen
5. **`app/dashboard/dokumen/page.tsx`** - Halaman daftar dokumen (updated)
6. **`app/api/upload-document/route.ts`** - API route untuk upload dokumen ke Vercel Blob + PostgreSQL
7. **`lib/blob-config.ts`** - Konfigurasi dan helper functions (updated)
8. **`db/migration.sql`** - Database schema (updated)

### Fitur:

2. **Upload Dokumen**

   - Form upload dengan progress bar
   - Upload file ke Vercel Blob storage via API route `/api/upload-document`
   - Simpan metadata ke PostgreSQL database
   - Validasi ukuran file (max 10MB) di client dan server
   - Validasi tipe file di client dan server
   - Kategori dokumen yang tersedia: Panduan, Template, Checklist, SOP, Laporan, Manual, Form, Sertifikat, Kebijakan, Prosedur
   - Format file yang didukung: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, JPG, JPEG, PNG

3. **Daftar Dokumen**

   - Tampilkan semua dokumen yang telah diupload
   - Filter berdasarkan kategori dengan color coding
   - Informasi detail: judul, deskripsi, kategori, jenis file, ukuran, pengunggah, tanggal upload

4. **Aksi Dokumen**
   - Lihat dokumen (buka di tab baru)
   - Unduh dokumen
   - Hapus dokumen (dengan konfirmasi)

### API Endpoints:

- **POST `/api/upload-document`** - Upload dokumen ke Vercel Blob dan simpan metadata ke database
  - Body: FormData dengan fields: title, description, category, file
  - Response: JSON dengan document metadata
  - Validasi: ukuran file (max 10MB), tipe file

### Database Schema:

```sql
CREATE TABLE "Document" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "description" VARCHAR,
  "category" VARCHAR NOT NULL,
  "url" VARCHAR NOT NULL,
  "filename" VARCHAR NOT NULL,
  "fileType" VARCHAR NOT NULL,
  "fileSize" INTEGER NOT NULL,
  "uploadedBy" VARCHAR NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL
);
```

### Penggunaan:

1. Akses halaman dokumen: `/dashboard/dokumen`
2. Klik tombol "Unggah Dokumen" untuk upload file baru
3. Isi form upload dengan judul, deskripsi (opsional), kategori, dan pilih file
4. File akan diupload ke Vercel Blob dan metadata disimpan ke database
5. Kembali ke halaman daftar dokumen untuk melihat file yang telah diupload

### Teknologi:

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Radix UI
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL (Neon)
- **File Storage**: Vercel Blob
- **Validasi**: Client-side dan server-side validation
- **UI Components**: shadcn/ui components

### Environment Variables Required:

```env
# Database
POSTGRES_URL=your_postgres_connection_string

# Vercel Blob (automatically set in Vercel)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

Sistem ini mengikuti pola arsitektur yang sama dengan fitur laboratorium yang sudah ada, sehingga konsisten dengan struktur aplikasi secara keseluruhan.

import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Buat Laboratorium Tidak Ditemukan"
      message="Mohon maaf, halaman pembuatan laboratorium yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Daftar Laboratorium"
      backLinkHref="/dashboard/laboratorium"
    />
  );
}

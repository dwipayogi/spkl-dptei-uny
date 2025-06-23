import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Dashboard Tidak Ditemukan"
      message="Mohon maaf, halaman dashboard yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Dashboard"
      backLinkHref="/dashboard"
    />
  );
}

import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Halaman Tidak Ditemukan"
      message="Mohon maaf, halaman yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Beranda"
      backLinkHref="/"
    />
  );
}

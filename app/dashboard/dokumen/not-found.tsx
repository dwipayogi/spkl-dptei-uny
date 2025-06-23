import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Dokumen Tidak Ditemukan"
      message="Mohon maaf, dokumen yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Daftar Dokumen"
      backLinkHref="/dashboard/dokumen"
    />
  );
}

import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Dokumen Asesmen Tidak Ditemukan"
      message="Mohon maaf, dokumen asesmen yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Halaman Asesmen"
      backLinkHref="/dashboard/asesmen"
    />
  );
}

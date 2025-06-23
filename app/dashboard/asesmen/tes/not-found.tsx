import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Tes Asesmen Tidak Ditemukan"
      message="Mohon maaf, halaman tes asesmen yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Halaman Asesmen"
      backLinkHref="/dashboard/asesmen"
    />
  );
}

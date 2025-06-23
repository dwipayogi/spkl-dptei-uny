import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Asesmen Tidak Ditemukan"
      message="Mohon maaf, asesmen yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Daftar Asesmen"
      backLinkHref="/dashboard/asesmen"
    />
  );
}

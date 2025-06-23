import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Detail Asesmen Tidak Ditemukan"
      message="Mohon maaf, detail asesmen yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Daftar Asesmen"
      backLinkHref="/dashboard/asesmen/view"
    />
  );
}

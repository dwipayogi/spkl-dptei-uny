import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Detail Laboratorium Tidak Ditemukan"
      message="Mohon maaf, detail laboratorium yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Daftar Laboratorium"
      backLinkHref="/dashboard/laboratorium"
    />
  );
}

import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Edit Laboratorium Tidak Ditemukan"
      message="Mohon maaf, laboratorium yang ingin Anda edit tidak ditemukan."
      backLinkText="Kembali ke Daftar Laboratorium"
      backLinkHref="/dashboard/laboratorium"
    />
  );
}

import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Halaman Registrasi Tidak Ditemukan"
      message="Mohon maaf, halaman registrasi yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Halaman Registrasi"
      backLinkHref="/auth/register"
    />
  );
}

import { NotFoundPage } from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Halaman Login Tidak Ditemukan"
      message="Mohon maaf, halaman login yang Anda cari tidak ditemukan."
      backLinkText="Kembali ke Halaman Login"
      backLinkHref="/auth/login"
    />
  );
}

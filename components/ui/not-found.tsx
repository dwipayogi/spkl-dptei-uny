import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NotFoundProps {
  title?: string;
  message?: string;
  backLinkText?: string;
  backLinkHref?: string;
}

export function NotFoundPage({
  title = "Halaman Tidak Ditemukan",
  message = "Mohon maaf, halaman yang Anda cari tidak ditemukan.",
  backLinkText = "Kembali ke Dashboard",
  backLinkHref = "/dashboard",
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500 mb-6">{message}</p>
      <Button asChild>
        <Link href={backLinkHref}>{backLinkText}</Link>
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-2xl font-bold mb-2">Laboratorium Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-6">
        Mohon maaf, laboratorium yang Anda cari tidak ditemukan.
      </p>
      <Button asChild>
        <Link href="/dashboard/laboratorium">
          Kembali ke Daftar Laboratorium
        </Link>
      </Button>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between sticky top-0 z-10 p-4">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo-uny.png"
            alt="Logo UNY"
            width={80}
            height={80}
            priority
          />
          <p className="text-xl font-bold">
            SPKL ISO/IEC 17025:2017 <br />
            Departemen Pendidikan Teknik Elektronika dan Informatika
          </p>
        </div>

        <ul className="flex space-x-8 font-semibold">
          <li>
            <Link href="#" className="hover:underline">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Instrumen
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Statistik
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Kontak
            </Link>
          </li>
        </ul>
      </nav>

      <main className="flex items-center justify-between h-[90vh]">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Selamat Datang di Sistem Pengukuran Kelayakan Laboratorium
            Berdasarkan ISO/IEC 17025:2017 di DPTEI
          </h1>
          <Link href="/auth/login" className="hover:underline">
            <Button>Masuk</Button>
          </Link>
        </div>

        <Image
          src="/logo-uny.png"
          alt="Logo UNY"
          width={500}
          height={500}
          priority
        />
      </main>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center justify-between sticky top-0 z-10 p-4 bg-white border-b">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo-uny.png"
            alt="Logo UNY"
            width={80}
            height={80}
            className="h-12 w-12 lg:w-16 lg:h-16"
            priority
          />
          <p className="text-sm lg:text-xl font-bold">
            SPKL ISO/IEC 17025:2017 <br />
            Departemen Pendidikan Teknik Elektronika dan Informatika
          </p>
        </div>

        <ul className="space-x-8 font-semibold hidden lg:flex">
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

      <main className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between h-[90vh]">
        <Image
          src="/logo-uny.png"
          alt="Logo UNY"
          width={500}
          height={500}
          priority
        />
        <div className="flex flex-col items-center justify-center lg:items-start text-center lg:text-left lg:pl-16">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-bold mb-4">
            Selamat Datang di Sistem Pengukuran Kelayakan Laboratorium
            Berdasarkan ISO/IEC 17025:2017 di DPTEI
          </h1>
          <Link href="/auth/login" className="hover:underline">
            <Button className="bg-blue-600 hover:bg-blue-700">Masuk</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

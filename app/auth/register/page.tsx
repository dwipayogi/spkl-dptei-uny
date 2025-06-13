import Image from "next/image";
import Link from "next/link";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/logo-uny.png"
        alt="Logo UNY"
        width={100}
        height={100}
        priority
      />
      <Card className="mt-4 w-xl">
        <h2 className="text-2xl font-bold text-center">Daftar Akun</h2>
        <p className="text-gray-600 text-center">
          Masukkan email & kata sandi untuk mendaftar
        </p>
        <form className="mt-4">
          <label htmlFor="name" className="block mb-2 font-semibold">
            Nama Lengkap
          </label>
          <Input type="text" id="name" placeholder="Nama Lengkap" className="mb-4" />

          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <Input type="email" id="email" placeholder="Email" className="mb-4" />

          <label htmlFor="password" className="block mb-2 font-semibold">
            Kata Sandi
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Kata Sandi"
            className="mb-4"
          />
          <Button type="submit" className="w-full">Daftar</Button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Sudah punya akun? <Link href="/auth/login" className="font-semibold text-blue-500">Masuk</Link>
        </p>
      </Card>
    </main>
  );
}

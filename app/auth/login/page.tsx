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
        <h2 className="text-2xl font-bold text-center">Selamat Datang</h2>
        <p className="text-gray-600 text-center">
          Masukkan email & kata sandi untuk login
        </p>
        <form className="mt-4">

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <Input type="email" id="email" placeholder="Email" className="mb-4" />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-semibold">
              Kata Sandi
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Kata Sandi"
              className="mb-4"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="font-semibold text-blue-500">
            Daftar
          </Link>
        </p>
      </Card>
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Selamat Datang</CardTitle>
        <CardDescription>
          Masukkan email & kata sandi untuk login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@test.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="underline underline-offset-4 text-blue-600 hover:text-blue-700">
                Daftar
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

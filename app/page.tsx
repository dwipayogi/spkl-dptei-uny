import Image from "next/image";
import Link from "next/link";
import { BarChart3, FileText, Phone, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Homepage() {
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

      <main>
        <section className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between h-[90vh]">
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
        </section>

              {/* Instrumen Section */}
      <section id="instrumen" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Instrumen Penilaian</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sistem kami menggunakan instrumen penilaian yang sesuai dengan standar ISO/IEC 17025:2017 
              untuk memastikan kelayakan laboratorium yang optimal
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="text-blue-600" size={24} />
                  <span>Dokumen Kelayakan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pengelolaan dan validasi dokumen-dokumen yang diperlukan untuk 
                  memenuhi standar ISO/IEC 17025:2017
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="text-green-600" size={24} />
                  <span>Asesmen Berkala</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Evaluasi rutin terhadap kinerja dan kepatuhan laboratorium 
                  terhadap standar yang ditetapkan
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="text-purple-600" size={24} />
                  <span>Laporan Komprehensif</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Generasi laporan detail tentang status kelayakan dan 
                  rekomendasi perbaikan laboratorium
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistik Section */}
      <section id="statistik" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Statistik & Analisis</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dapatkan wawasan mendalam tentang kinerja laboratorium melalui 
              visualisasi data yang komprehensif dan mudah dipahami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-blue-600">25+</CardTitle>
                <CardDescription>Kriteria Penilaian</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-green-600">15+</CardTitle>
                <CardDescription>Laboratorium Terdaftar</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-purple-600">500+</CardTitle>
                <CardDescription>Dokumen Terkelola</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-orange-600">95%</CardTitle>
                <CardDescription>Tingkat Kepatuhan</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Interaktif</CardTitle>
                <CardDescription>
                  Visualisasi real-time status kelayakan laboratorium
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Kelengkapan Dokumen</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Laporan Trend</CardTitle>
                <CardDescription>
                  Analisis perkembangan kinerja laboratorium dari waktu ke waktu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Peningkatan Bulan Ini</span>
                    <span className="font-semibold text-blue-600">+8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Butuh bantuan atau memiliki pertanyaan? Tim kami siap membantu Anda 
              dalam mengimplementasikan sistem kelayakan laboratorium
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Phone className="text-blue-600" size={24} />
                  <span>Telepon</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">(0274) 586168</p>
                <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <FileText className="text-green-600" size={24} />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">dptei@uny.ac.id</p>
                <p className="text-gray-600">Respon dalam 24 jam</p>
              </CardContent>
            </Card>

            <Card className="text-center md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Home className="text-purple-600" size={24} />
                  <span>Alamat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">DPTEI FT UNY</p>
                <p className="text-gray-600">
                  Karangmalang, Caturtunggal,<br />
                  Depok, Sleman, DIY 55281
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}

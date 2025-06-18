import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FiEye, FiUpload } from "react-icons/fi";
import { DatePicker } from "@/components/datePicker";

export default function InstrumenPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
            Asesmen
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Lakukan asesmen berstandar ISO/IEC 17025:2017
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Tambah Asesmen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Asesmen</DialogTitle>
              <DialogDescription>
                Tambahkan periode asesmen baru untuk laboratorium.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <DatePicker
                title="Tanggal Mulai"
              />
              <DatePicker
                title="Tanggal Selesai"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Instrumen List */}
      <div>
          <Accordion type="single" collapsible className="border px-6 rounded-lg">
            <AccordionItem value="item-1">
              <AccordionTrigger>Periode Pengisian Lab 1</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableCaption>
                    Daftar laboratorium yang perlu diisi instrumen asesmen periode Juni - Desember
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama Lab</TableHead>
                      <TableHead className="text-center">Tingkat Kesesuaian</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Lab Artificial Intelligence</TableCell>
                      <TableCell className="text-center">90%</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline">
                          <FiEye />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Lab Jaringan</TableCell>
                      <TableCell className="text-center">85%</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline">
                          <FiEye />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Lab Multimedia</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">
                        <Link href="/dashboard/asesmen/tes">
                          <Button>
                            <FiUpload />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Periode Pengisian Lab 2</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableCaption>
                    Daftar laboratorium yang perlu diisi instrumen asesmen periode Juni - Desember
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama Lab</TableHead>
                      <TableHead className="text-center">Tingkat Kesesuaian</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Lab Artificial Intelligence</TableCell>
                      <TableCell className="text-center">90%</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline">
                          <FiEye />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Lab Jaringan</TableCell>
                      <TableCell className="text-center">85%</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline">
                          <FiEye />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Lab Multimedia</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">
                        <Link href="/dashboard/asesmen/tes">
                          <Button>
                            <FiUpload />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
  );
}

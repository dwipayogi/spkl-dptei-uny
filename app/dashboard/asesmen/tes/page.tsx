"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialData = [
  // Format: [kode, pertanyaan]
  [
    "4.1",
    "Apakah laboratorium bebas dari tekanan komersial, finansial, atau lainnya yang dapat mempengaruhi hasil?",
  ],
  [
    "4.2",
    "Apakah ada kebijakan yang menjamin ketidakberpihakan dalam kegiatan laboratorium?",
  ],
  [
    "4.3",
    "Apakah personel memahami dan menandatangani pernyataan kerahasiaan?",
  ],
  [
    "4.4",
    "Apakah laboratorium mengelola informasi pelanggan secara aman dan rahasia?",
  ],
  [
    "5.1",
    "Apakah struktur organisasi laboratorium terdokumentasi dengan jelas?",
  ],
  [
    "5.2",
    "Apakah peran dan tanggung jawab setiap personel dijelaskan dalam uraian jabatan?",
  ],
  [
    "5.3",
    "Apakah ada personel yang memiliki kewenangan teknis untuk pengambilan keputusan terkait hasil uji/kalibrasi?",
  ],
  ["5.4", "Apakah terdapat prosedur pengelolaan konflik kepentingan?"],
  [
    "6.1",
    "Apakah laboratorium memiliki personel yang kompeten untuk melakukan pengujian/kalibrasi?",
  ],
  ["6.2", "Apakah kompetensi personel dievaluasi dan dicatat secara berkala?"],
  [
    "6.3",
    "Apakah fasilitas laboratorium mendukung pelaksanaan pengujian yang andal?",
  ],
  ["6.4", "Apakah peralatan diuji secara rutin dan dikalibrasi sesuai jadwal?"],
  ["6.5", "Apakah terdapat catatan kalibrasi dan pemeliharaan alat?"],
  ["7.1", "Apakah metode uji/kalibrasi terdokumentasi dan divalidasi?"],
  ["7.2", "Apakah laboratorium melakukan verifikasi metode sebelum digunakan?"],
  [
    "7.3",
    "Apakah data hasil uji dapat ditelusuri ke standar nasional atau internasional?",
  ],
  [
    "7.4",
    "Apakah ketidakpastian pengukuran dihitung dan dilaporkan bila relevan?",
  ],
  ["7.5", "Apakah pengendalian mutu internal dilakukan?"],
  [
    "7.6",
    "Apakah hasil uji dilaporkan dengan jelas dan mencakup semua informasi penting?",
  ],
  [
    "7.7",
    "Apakah prosedur untuk penanganan hasil tidak valid atau keluhan pelanggan tersedia?",
  ],
  [
    "8.1",
    "Apakah laboratorium memiliki kebijakan mutu dan tujuan mutu yang terdokumentasi?",
  ],
  ["8.2", "Apakah dilakukan audit internal secara berkala?"],
  ["8.3", "Apakah dilakukan tinjauan manajemen secara rutin?"],
  [
    "8.4",
    "Apakah ketidaksesuaian didokumentasikan dan dilakukan tindakan korektif?",
  ],
  ["8.5", "Apakah risiko dan peluang telah diidentifikasi dan dikelola?"],
];

export default function ISOAssessmentTable() {
  const [responses, setResponses] = useState(
    initialData.map(([kode, pertanyaan]) => ({
      kode,
      pertanyaan,
      jawaban: "",
      catatan: "",
      file: "",
    }))
  );

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...responses];
    updated[index][field] = value;
    setResponses(updated);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Asesmen Mandiri ISO/IEC 17025:2017
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Kode</TableHead>
              <TableHead>Pertanyaan</TableHead>
              <TableHead className="w-32">Jawaban</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.kode}</TableCell>
                <TableCell>{row.pertanyaan}</TableCell>
                <TableCell>
                  <RadioGroup
                    defaultValue={row.jawaban}
                    onValueChange={(value) =>
                      handleChange(index, "jawaban", value)
                    }
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ya" id={`ya-${index}`} />
                      <Label htmlFor={`ya-${index}`}>Ya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Sebagian"
                        id={`sebagian-${index}`}
                      />
                      <Label htmlFor={`sebagian-${index}`}>Sebagian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Tidak" id={`tidak-${index}`} />
                      <Label htmlFor={`tidak-${index}`}>Tidak</Label>
                    </div>
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Catatan Asesmen</h3>
        <Textarea
          placeholder="Tambahkan catatan untuk asesmen ini..."
          className="min-h-[80px]"
        />
        <div className="mt-4">
          <h4 className="text-md font-semibold">Dokumen Pendukung</h4>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              onChange={(e) =>
                handleChange(0, "file", e.target.files?.[0]?.name || "")
              }
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">Upload File</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">Reset</Button>

        <AlertDialog>
          <AlertDialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-semibold">
            Submit
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Ini akan mengirimkan
                asesmen Anda untuk ditinjau. Pastikan semua informasi sudah benar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batalkan</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Lanjutkan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

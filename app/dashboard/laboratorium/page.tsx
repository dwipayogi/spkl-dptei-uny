"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export default function LaboratoriumPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    personInCharge: "",
    compliance: "",
    status: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically call an API to save the data
    setIsDialogOpen(false);
    // Reset form
    setFormData({
      name: "",
      personInCharge: "",
      compliance: "",
      status: "",
    });
  };
  const laboratories = [
    {
      id: 1,
      name: "Lab Pemrograman dan Sistem Informasi",
      personInCharge: "Dr. Budi Santoso",
      status: "Tersertifikasi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "15 Jan 2025",
      instrumentation: 90,
    },
    {
      id: 2,
      name: "Lab Multimedia",
      personInCharge: "Dr. Rina Wijaya",
      status: "Dalam Proses",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastInspection: "20 Des 2024",
      instrumentation: 65,
    },
    {
      id: 3,
      name: "Lab Jaringan Komputer",
      personInCharge: "Prof. Ahmad Sulaiman",
      status: "Tersertifikasi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "10 Jan 2025",
      instrumentation: 67,
    },
    {
      id: 4,
      name: "Lab Artificial Intelligence",
      personInCharge: "Dr. Dewi Kartika",
      status: "Perlu Evaluasi",
      statusColor: "bg-red-100 text-red-800",
      lastInspection: "05 Nov 2024",
      instrumentation: 76,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Laboratorium</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan monitor status laboratorium
          </p>
        </div>{" "}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Tambah Lab
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Laboratorium Baru</DialogTitle>
              <DialogDescription>
                Tambahkan laboratorium baru ke dalam sistem
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Laboratorium</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama laboratorium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personInCharge">Penanggung Jawab</Label>
                  <Input
                    id="personInCharge"
                    name="personInCharge"
                    value={formData.personInCharge}
                    onChange={handleChange}
                    placeholder="Nama penanggung jawab"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </form>{" "}
          </DialogContent>
        </Dialog>
      </div>

      {/* Laboratory List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Nama Laboratorium
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Penanggung Jawab
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Tingkat Kepatuhan
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Asesmen Terakhir
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {laboratories.map((lab) => (
                <tr
                  key={lab.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{lab.name}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {lab.personInCharge}
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-center">
                    {lab.instrumentation}%
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge
                      className={`px-3 py-1 rounded-full text-sm font-medium ${lab.statusColor}`}
                    >
                      {lab.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-center">
                    {lab.lastInspection}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Detail"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

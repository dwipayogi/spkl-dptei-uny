"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createLaboratory } from "../actions";
import { useRouter } from "next/navigation";

export default function AddLaboratoryDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !person) {
      setError("Nama laboratorium dan penanggung jawab harus diisi");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await createLaboratory({
        name,
        person,
        percentage: 0,
        lastInspection: new Date().toISOString().split("T")[0],
      });

      if (result.success) {
        setIsOpen(false);
        // Reset form
        setName("");
        setPerson("");
        // Refresh the page to show the new laboratory
        router.refresh();
      } else {
        setError(result.error || "Gagal menambahkan laboratorium");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Tambah Laboratorium
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Laboratorium</DialogTitle>
          <DialogDescription>
            Tambahkan laboratorium baru ke dalam sistem.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Laboratorium</Label>
            <Input
              id="name"
              placeholder="Masukkan nama laboratorium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="person">Penanggung Jawab</Label>
            <Input
              id="person"
              placeholder="Masukkan nama penanggung jawab"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

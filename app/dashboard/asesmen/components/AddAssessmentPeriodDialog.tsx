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
import { DatePicker } from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createAssessmentPeriod } from "../actions";
import { useRouter } from "next/navigation";

export default function AddAssessmentPeriodDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !startDate || !endDate) {
      setError("Semua field harus diisi");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await createAssessmentPeriod({
        title,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      if (result.success) {
        setIsOpen(false);
        // Reset form
        setTitle("");
        setStartDate(undefined);
        setEndDate(undefined);
        // Refresh the page to show the new period
        router.refresh();
      } else {
        setError(result.error || "Gagal menambahkan periode asesmen");
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
          <div className="space-y-2">
            <Label htmlFor="title">Judul Periode</Label>
            <Input
              id="title"
              placeholder="Contoh: Periode Januari-Juni 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DatePicker
            title="Tanggal Mulai"
            date={startDate}
            onSelect={setStartDate}
          />
          <DatePicker
            title="Tanggal Selesai"
            date={endDate}
            onSelect={setEndDate}
          />
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

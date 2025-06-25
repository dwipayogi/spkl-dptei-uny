"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { updateLaboratory, Laboratory } from "../actions";
import { useRouter } from "next/navigation";

interface EditLaboratoryDialogProps {
  laboratory: Laboratory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function EditLaboratoryDialog({
  laboratory,
  open,
  onOpenChange,
  onSuccess,
}: EditLaboratoryDialogProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [error, setError] = useState("");

  // Reset form when dialog opens/closes or laboratory changes
  useEffect(() => {
    if (laboratory && open) {
      setName(laboratory.name);
      setPerson(laboratory.person);
      setError("");
    } else if (!open) {
      // Reset form when dialog closes
      setName("");
      setPerson("");
      setError("");
    }
  }, [laboratory, open]);

  const handleSubmit = async () => {
    if (!laboratory) return;

    if (!name || !person) {
      setError("Nama laboratorium dan penanggung jawab harus diisi");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await updateLaboratory(laboratory.id, {
        name,
        person,
        percentage: laboratory.percentage,
      });

      if (result.success) {
        onOpenChange(false);
        onSuccess();
        // Refresh the page to show the updated laboratory
        router.refresh();
      } else {
        setError(result.error || "Gagal mengupdate laboratorium");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Laboratorium</DialogTitle>
          <DialogDescription>
            Edit informasi laboratorium dalam sistem.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nama Laboratorium</Label>
            <Input
              id="edit-name"
              placeholder="Masukkan nama laboratorium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-person">Penanggung Jawab</Label>
            <Input
              id="edit-person"
              placeholder="Masukkan nama penanggung jawab"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Batal
          </Button>
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

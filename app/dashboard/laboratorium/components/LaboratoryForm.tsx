"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Laboratory,
  LaboratoryFormData,
  createLaboratory,
  updateLaboratory,
} from "../actions";

interface LaboratoryFormProps {
  laboratory?: Laboratory;
  isEditing?: boolean;
}

export default function LaboratoryForm({
  laboratory,
  isEditing = false,
}: LaboratoryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LaboratoryFormData>({
    name: "",
    person: "",
    percentage: 0,
    lastInspection: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (laboratory) {
      setFormData({
        name: laboratory.name,
        person: laboratory.person,
        percentage: laboratory.percentage,
        // Convert date to YYYY-MM-DD for input[type="date"]
        lastInspection: laboratory.lastInspection
          ? new Date(laboratory.lastInspection).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [laboratory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing && laboratory) {
        const result = await updateLaboratory(laboratory.id, formData);

        if (result.success) {
          router.push("/dashboard/laboratorium");
          router.refresh();
        } else {
          setError(result.error || "Terjadi kesalahan saat menyimpan data");
        }
      } else {
        const result = await createLaboratory(formData);

        if (result.success) {
          router.push("/dashboard/laboratorium");
          router.refresh();
        } else {
          setError(result.error || "Terjadi kesalahan saat membuat data");
        }
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memproses form");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit" : "Tambah"} Laboratorium</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 p-3 rounded-md text-red-800 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nama Laboratorium</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Masukkan nama laboratorium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="person">Penanggung Jawab</Label>
            <Input
              id="person"
              name="person"
              value={formData.person}
              onChange={handleChange}
              required
              placeholder="Masukkan nama penanggung jawab"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/laboratorium")}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting
              ? "Menyimpan..."
              : isEditing
              ? "Simpan"
              : "Simpan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

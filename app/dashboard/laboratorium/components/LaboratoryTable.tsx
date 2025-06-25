"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import LaboratoryDeleteDialog from "./LaboratoryDeleteDialog";
import EditLaboratoryDialog from "./EditLaboratoryDialog";
import { useRouter } from "next/navigation";
import { Laboratory } from "../actions";

type MappedLaboratory = {
  id: number;
  name: string;
  personInCharge: string;
  status: string;
  statusColor: string;
  lastInspection: string;
  instrumentation: number;
};

interface LaboratoryTableProps {
  laboratories: MappedLaboratory[];
  allLaboratories: Laboratory[]; // Add this to access original lab data
}

export default function LaboratoryTable({
  laboratories,
  allLaboratories,
}: LaboratoryTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedLab(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (id: number) => {
    setSelectedLab(id);
    setEditDialogOpen(true);
  };

  const handleDeleteSuccess = () => {
    router.refresh();
  };

  const handleEditSuccess = () => {
    router.refresh();
  };

  const handleViewClick = (id: number) => {
    router.push(`/dashboard/laboratorium/view/${id}`);
  };

  // Get the laboratory data for editing
  const selectedLaboratory = selectedLab
    ? allLaboratories.find((lab) => lab.id === selectedLab) || null
    : null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Laboratorium</TableHead>
            <TableHead>Penanggung Jawab</TableHead>
            <TableHead className="text-center">Tingkat Kesesuaian</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Inspeksi Terakhir</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laboratories.map((lab) => (
            <TableRow key={lab.id}>
              <TableCell>{lab.name}</TableCell>
              <TableCell>{lab.personInCharge}</TableCell>
              <TableCell className="text-center">
                {lab.instrumentation}%
              </TableCell>
              <TableCell className="text-center">
                <Badge className={lab.statusColor}>{lab.status}</Badge>
              </TableCell>
              <TableCell className="text-center">
                {lab.lastInspection}
              </TableCell>
              <TableCell className="text-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-600"
                  onClick={() => handleViewClick(lab.id)}
                >
                  <FiEye />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600"
                  onClick={() => handleEditClick(lab.id)}
                >
                  <FiEdit />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-500 hover:bg-red-100 hover:text-red-600"
                  onClick={() => handleDeleteClick(lab.id)}
                >
                  <FiTrash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>{" "}
      <LaboratoryDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        labId={selectedLab}
        onSuccess={handleDeleteSuccess}
      />
      <EditLaboratoryDialog
        laboratory={selectedLaboratory}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function LaboratoriumPage() {
  const laboratories = [
    {
      id: 1,
      name: "Lab Pemrograman dan Sistem Informasi",
      personInCharge: "Dr. Budi Santoso",
      status: "Memenuhi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "15 Jan 2025",
      instrumentation: 90,
    },
    {
      id: 2,
      name: "Lab Multimedia",
      personInCharge: "Dr. Rina Wijaya",
      status: "Tidak Memenuhi",
      statusColor: "bg-red-100 text-red-800",
      lastInspection: "20 Des 2024",
      instrumentation: 65,
    },
    {
      id: 3,
      name: "Lab Jaringan Komputer",
      personInCharge: "Prof. Ahmad Sulaiman",
      status: "Memenuhi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "10 Jan 2025",
      instrumentation: 85,
    },
    {
      id: 4,
      name: "Lab Artificial Intelligence",
      personInCharge: "Dr. Dewi Kartika",
      status: "Tidak Memenuhi",
      statusColor: "bg-red-100 text-red-800",
      lastInspection: "05 Nov 2024",
      instrumentation: 76,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Laboratorium</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan monitor status laboratorium
          </p>
        </div>
      </div>

      {/* Laboratory List */}
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Laboratorium</TableHead>
                <TableHead>Penanggung Jawab</TableHead>
                <TableHead className="text-center">
                  Tingkat Kesesuaian
                </TableHead>
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
                  <TableCell className="text-center">{lab.instrumentation}%</TableCell>
                  <TableCell className="text-center">
                    <Badge className={lab.statusColor}>{lab.status}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{lab.lastInspection}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button variant="outline" size="sm">
                      <FiEdit />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FiEye />
                    </Button>
                    <Button variant="outline" size="sm" color="red">
                      <FiTrash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

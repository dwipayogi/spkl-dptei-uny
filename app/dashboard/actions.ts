"use server";

import sql from "@/db/db";

export interface DashboardStats {
  totalLaboratories: number;
  totalDocuments: number;
  averageCompliance: number;
  complianceCounts: {
    high: number; // > 90%
    medium: number; // 70-90%
    low: number; // < 70%
  };
}

export interface LabComplianceData {
  name: string;
  percentage: number;
  status: "compliant" | "non-compliant";
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Count total laboratories
    const labResult = await sql`SELECT COUNT(*) as count FROM "Laboratory"`;
    const totalLaboratories = parseInt(labResult[0].count);

    // Count total documents
    const docResult = await sql`SELECT COUNT(*) as count FROM "Document"`;
    const totalDocuments = parseInt(docResult[0].count);

    // Get all laboratories with their compliance percentage
    const labs = await sql`SELECT "percentage" FROM "Laboratory"`;

    // Calculate average compliance
    let totalPercentage = 0;
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    for (const lab of labs) {
      const percentage = lab.percentage;
      totalPercentage += percentage;

      // Categorize based on percentage
      if (percentage > 90) {
        highCount++;
      } else if (percentage >= 70 && percentage <= 90) {
        mediumCount++;
      } else {
        lowCount++;
      }
    }

    const averageCompliance =
      totalLaboratories > 0
        ? Math.round(totalPercentage / totalLaboratories)
        : 0;

    return {
      totalLaboratories,
      totalDocuments,
      averageCompliance,
      complianceCounts: {
        high: highCount,
        medium: mediumCount,
        low: lowCount,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    return {
      totalLaboratories: 0,
      totalDocuments: 0,
      averageCompliance: 0,
      complianceCounts: {
        high: 0,
        medium: 0,
        low: 0,
      },
    };
  }
}

export async function getLabComplianceData(threshold: number = 80): Promise<{
  compliant: LabComplianceData[];
  nonCompliant: LabComplianceData[];
}> {
  try {
    // Get all labs with their names and compliance percentages
    const labs =
      await sql`SELECT "id", "name", "percentage" FROM "Laboratory" ORDER BY "percentage" DESC`;

    const compliant: LabComplianceData[] = [];
    const nonCompliant: LabComplianceData[] = [];

    for (const lab of labs) {
      const labData: LabComplianceData = {
        name: lab.name,
        percentage: lab.percentage,
        status: lab.percentage >= threshold ? "compliant" : "non-compliant",
      };

      if (labData.status === "compliant") {
        compliant.push(labData);
      } else {
        nonCompliant.push(labData);
      }
    }

    return { compliant, nonCompliant };
  } catch (error) {
    console.error("Error fetching lab compliance data:", error);
    return { compliant: [], nonCompliant: [] };
  }
}

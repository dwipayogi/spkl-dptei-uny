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
    // Use a single query with aggregations for better performance
    const result = await sql`
      SELECT 
        (SELECT COUNT(*) FROM "Laboratory") as total_labs,
        (SELECT COUNT(*) FROM "Document") as total_docs,
        COALESCE(AVG("percentage"), 0) as avg_compliance,
        COUNT(CASE WHEN "percentage" > 90 THEN 1 END) as high_count,
        COUNT(CASE WHEN "percentage" >= 70 AND "percentage" <= 90 THEN 1 END) as medium_count,
        COUNT(CASE WHEN "percentage" < 70 THEN 1 END) as low_count
      FROM "Laboratory"
    `;

    const stats = result[0];
    
    return {
      totalLaboratories: parseInt(stats.total_labs),
      totalDocuments: parseInt(stats.total_docs),
      averageCompliance: Math.round(parseFloat(stats.avg_compliance)),
      complianceCounts: {
        high: parseInt(stats.high_count),
        medium: parseInt(stats.medium_count),
        low: parseInt(stats.low_count),
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
      await sql`SELECT "name", "percentage" FROM "Laboratory" ORDER BY "percentage" DESC`;

    const compliant: LabComplianceData[] = [];
    const nonCompliant: LabComplianceData[] = [];

    for (const lab of labs) {
      const isCompliant = lab.percentage >= threshold;
      const labData: LabComplianceData = {
        name: lab.name,
        percentage: lab.percentage,
        status: isCompliant ? "compliant" : "non-compliant",
      };

      if (isCompliant) {
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

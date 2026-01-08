import { Accordion } from "@/components/ui/accordion";
import { getAssessmentPeriods } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import AssessmentPeriodItem from "./components/AssessmentPeriodItem";
import AddAssessmentPeriodDialog from "./components/AddAssessmentPeriodDialog";

export default async function AsesmenPage() {
  // Get assessment periods from database
  const periods = await getAssessmentPeriods();

  // Handle no data case
  const hasData = periods.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
            Asesmen
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Lakukan asesmen berstandar ISO/IEC 17025:2017
          </p>
        </div>
        <AddAssessmentPeriodDialog />
      </div>

      {/* Assessment Period List */}
      <div>
        {!hasData ? (
          <Card>
            <CardContent className="flex justify-center items-center p-10">
              <p className="text-gray-500">
                Tidak ada periode asesmen yang tersedia
              </p>
            </CardContent>
          </Card>
        ) : (
          <Accordion
            type="single"
            collapsible
            className="border px-6 rounded-lg"
          >
            {periods.map((period) => (
              <AssessmentPeriodItem
                key={period.id}
                period={period}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}

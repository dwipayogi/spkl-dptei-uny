import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ViewLaboratoryLoading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md" />
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-64 bg-gray-200 animate-pulse rounded-md" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md mb-2" />
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
              </div>
            ))}
          </div>
        </CardContent>
        <div className="p-6 flex justify-end space-x-2">
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md" />
        </div>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";

export default function EditLaboratoryLoading() {
  return (
    <div>
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-6" />

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-10 bg-gray-200 animate-pulse rounded-md" />

            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-10 bg-gray-200 animate-pulse rounded-md" />

            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-10 bg-gray-200 animate-pulse rounded-md" />

            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-md" />
            <div className="h-10 bg-gray-200 animate-pulse rounded-md" />

            <div className="flex justify-end space-x-2">
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md" />
              <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

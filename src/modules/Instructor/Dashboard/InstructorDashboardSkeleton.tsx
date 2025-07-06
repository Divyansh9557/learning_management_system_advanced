import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


const InstructorDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-6 w-64 mb-2 bg-gray-700" />
            <Skeleton className="h-4 w-80 bg-gray-800" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md bg-blue-700" />
        </div>

        {/* Metrics Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-3">
                <Skeleton className="w-24 h-4 bg-gray-700" />
                <Skeleton className="w-16 h-6 bg-gray-600" />
                <Skeleton className="w-32 h-3 bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="w-10 h-10 rounded-lg bg-gray-700" />
                  <Skeleton className="w-16 h-4 rounded bg-gray-700" />
                </div>
                <Skeleton className="h-5 w-3/4 bg-gray-600" />
                <Skeleton className="h-4 w-full bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="w-24 h-6 rounded bg-gray-700" />
                  <Skeleton className="w-24 h-6 rounded bg-gray-700" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardSkeleton;

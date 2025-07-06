import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PublishPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Page Title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-2/5 bg-gray-400" />
          <Skeleton className="h-4 w-3/5 bg-gray-400" />
        </div>

        {/* Course Preview Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40 bg-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              {/* Title + Description */}
              <Skeleton className="h-6 w-2/3 bg-gray-400" />
              <Skeleton className="h-4 w-full bg-gray-400" />
              <Skeleton className="h-4 w-5/6 bg-gray-400" />

              {/* Icons Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="text-center p-3 bg-gray-700 rounded space-y-2">
                    <Skeleton className="h-6 w-6 mx-auto rounded-full bg-gray-400" />
                    <Skeleton className="h-3 w-3/4 mx-auto bg-gray-400" />
                  </div>
                ))}
              </div>

              {/* Course Includes */}
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <Skeleton className="h-4 w-1/4 bg-gray-400" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-3/4 bg-gray-400" />
                ))}
              </div>
            </div>

            {/* Publish Checklist */}
            <div className="bg-gray-800 p-4 rounded space-y-3">
              <Skeleton className="h-4 w-1/4 bg-gray-400" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
                  <Skeleton className="h-4 w-3/4 bg-gray-400" />
                </div>
              ))}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded bg-gray-400" />
              <Skeleton className="h-4 w-3/4 bg-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <Skeleton className="h-10 w-32 rounded bg-gray-400" />
          <Skeleton className="h-10 w-40 rounded bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default PublishPageSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

const StudentDashboardSkeleton = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-1/3 bg-gray-500" />
        <Skeleton className="h-4 w-1/2 bg-gray-500" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-800 rounded-xl space-y-2">
            <Skeleton className="h-4 w-1/3 bg-gray-500" />
            <Skeleton className="h-6 w-1/2 bg-gray-500" />
            <Skeleton className="h-3 w-1/4 bg-gray-500" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Skeleton className="h-6 w-1/3 bg-gray-500 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-xl space-y-3">
                <Skeleton className="h-40 w-full bg-gray-500 rounded-lg" />
                <Skeleton className="h-5 w-3/4 bg-gray-500" />
                <Skeleton className="h-4 w-1/2 bg-gray-500" />
                <Skeleton className="h-3 w-1/4 bg-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity + Quick Actions */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-1/3 bg-gray-500" />
          <div className="bg-gray-800 rounded-xl p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex space-x-3">
                <Skeleton className="h-2 w-2 rounded-full bg-gray-500 mt-2" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-gray-500" />
                  <Skeleton className="h-3 w-1/3 bg-gray-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <Skeleton className="h-6 w-1/3 bg-gray-500 mb-4" />
            <Skeleton className="h-12 w-full bg-gray-500 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardSkeleton;

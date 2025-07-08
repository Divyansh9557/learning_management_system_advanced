

import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-3">
      <Skeleton className="w-full h-40 rounded-md" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export default CourseCardSkeleton;

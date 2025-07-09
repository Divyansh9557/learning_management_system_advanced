import { Skeleton } from "@/components/ui/skeleton";

const CourseCreateSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/3 bg-gray-500" />
          <Skeleton className="h-4 w-1/2 bg-gray-500" />
        </div>

        {/* Form Skeleton */}
        <div className="bg-[#111112] border border-gray-800 rounded-lg p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-500" />
            <Skeleton className="h-10 w-full bg-gray-500 rounded-md" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-500" />
            <Skeleton className="h-10 w-full bg-gray-500 rounded-md" />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-500" />
            <Skeleton className="h-10 w-full bg-gray-500 rounded-md" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-500" />
            <Skeleton className="h-10 w-full bg-gray-500 rounded-md" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-500" />
            <Skeleton className="h-32 w-full bg-gray-500 rounded-md" />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 bg-gray-500" />
            <Skeleton className="h-10 w-full bg-gray-500 rounded-md" />
            <Skeleton className="h-[180px] w-[300px] bg-gray-500 rounded border border-gray-600 mt-2" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <Skeleton className="h-10 w-40 bg-gray-500 rounded-md" />
            <Skeleton className="h-10 w-40 bg-gray-500 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreateSkeleton;

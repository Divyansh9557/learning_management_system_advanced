'use client';

import { Skeleton } from "@/components/ui/skeleton";

const QuizTakerSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-[#030303] overflow-x-hidden">
      <div className="z-10 container max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" /> {/* Title */}
            <Skeleton className="h-4 w-32" /> {/* Progress */}
          </div>
          <Skeleton className="h-8 w-20" /> {/* Timer */}
        </div>

        {/* Question Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-3/4" /> {/* Question Text */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded-full" /> {/* Option bubble */}
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Skeleton className="h-10 w-24 rounded-md" /> {/* Prev Button */}
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-24 rounded-md" /> {/* Next */}
            <Skeleton className="h-10 w-24 rounded-md" /> {/* Submit */}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default QuizTakerSkeleton;

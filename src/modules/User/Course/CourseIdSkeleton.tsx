"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CourseContentSkeleton() {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 space-y-6">
      {/* Tabs Skeleton */}
      <div className="flex items-center space-x-6">
        {["Content", "Assignments", "Discussions", "Certificate"].map((_, i) => (
          <Skeleton key={i} className="h-6 w-24 rounded-full bg-gray-700" />
        ))}
      </div>

      {/* Title */}
      <Skeleton className="h-6 w-40 rounded bg-gray-700" />
      <Skeleton className="h-4 w-3/4 rounded bg-gray-700" />

      {/* Lesson Items */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-4"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-56 rounded bg-gray-700" />
              <Skeleton className="h-3 w-32 rounded bg-gray-700" />
            </div>
            <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

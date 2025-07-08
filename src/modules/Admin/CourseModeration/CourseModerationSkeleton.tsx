'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function CourseModerationSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Skeleton className="h-6 w-52 bg-gray-400" />
        <Skeleton className="h-4 w-72 bg-gray-400" />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm"
          >
            <CardHeader className="pb-2">
              <CardTitle>
                <Skeleton className="h-4 w-24 bg-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-6 w-16 bg-gray-400" />
              <Skeleton className="h-3 w-32 bg-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            disabled
            className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40"
            placeholder="Search courses..."
          />
        </div>
        <Skeleton className="h-10 w-36 rounded-md bg-gray-400" />
        <Skeleton className="h-10 w-24 rounded-md bg-gray-400" />
      </div>

      {/* Table Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-full rounded-md bg-gray-400" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 items-center gap-4 p-4 bg-white/5 rounded-lg"
          >
            <Skeleton className="h-4 w-48 bg-gray-400 col-span-1" />
            <Skeleton className="h-4 w-40 bg-gray-400 col-span-1" />
            <Skeleton className="h-6 w-24 bg-gray-400 col-span-1" />
            <Skeleton className="h-4 w-24 bg-gray-400 col-span-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

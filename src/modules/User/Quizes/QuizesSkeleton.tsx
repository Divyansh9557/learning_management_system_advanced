'use client'

import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Users } from "lucide-react"

const StatCardSkeleton = () => (
  <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="w-12 h-12 rounded-lg" />
    </div>
  </div>
)

const QuizCardSkeleton = () => (
  <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 space-y-4">
    <div className="flex items-start justify-between">
      <div className="space-y-2 w-full">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="w-6 h-6 rounded-full" />
    </div>

    <div className="flex items-center justify-between text-sm text-gray-400">
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-600" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-12" />
    </div>

    <div className="flex items-center justify-between">
      <Skeleton className="px-3 py-1 rounded-full h-6 w-16" />
      <div className="flex items-center space-x-2">
        <Users className="w-3 h-3 text-gray-600" />
        <Skeleton className="h-4 w-8" />
      </div>
    </div>

    <Skeleton className="w-full h-10 rounded-lg" />
  </div>
)

const QuizzesSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <QuizCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuizzesSkeleton

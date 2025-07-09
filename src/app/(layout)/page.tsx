import { Skeleton } from "@/components/ui/skeleton";
import HomePage from "@/modules/Homepage/ui/HomePage"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"


const page = () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.course.homePage.queryOptions()
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<HeroSectionSkeleton/>}>
        <HomePage />
      </Suspense>
    </HydrationBoundary>
  );
}

export default page



export const HeroSectionSkeleton = () => {
  return (
    <section className="bg-gray-500 min-h-[400px] flex items-center justify-center px-6 py-16 sm:px-10 md:px-20">
      <div className="max-w-5xl w-full space-y-6 text-center">
        {/* Badge */}
        <div className="flex justify-center">
          <Skeleton className="h-6 w-28 rounded-full bg-gray-400" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/5 mx-auto rounded bg-gray-400" />
          <Skeleton className="h-10 w-2/5 mx-auto rounded bg-gray-400" />
        </div>

        {/* Subtitle */}
        <Skeleton className="h-4 w-4/5 mx-auto rounded bg-gray-400" />
        <Skeleton className="h-4 w-3/5 mx-auto rounded bg-gray-400" />
      </div>
    </section>
  );
};


import { HeroSectionSkeleton } from "@/modules/Homepage/ui/HeroSectionSkeleton";
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





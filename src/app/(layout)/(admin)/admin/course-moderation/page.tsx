import { auth } from "@/lib/auth";
import CourseModeration from "@/modules/Admin/CourseModeration/CourseModeration"
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CourseModerationSkeleton } from "../../../../../modules/Admin/CourseModeration/CourseModerationSkeleton";
import { CourseModerationHeader } from "@/modules/Admin/CourseModeration/CourseModerationHeader";
import { loadSearchParams } from "@/hooks/loadSearchParams";
import { SearchParams } from "nuqs";

type PageProps = {
  searchParams: Promise<SearchParams>
}

const page = async({searchParams}:PageProps) => {
  const { page, search } = await loadSearchParams(searchParams)
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin"].some((item)=> item===session?.roles[0].role );
    
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }
    

      const queryClient = getQueryClient()
      void queryClient.prefetchQuery(
        trpc.admin.getManyCourse.queryOptions({page,search})
      )


  return (<>
    <CourseModerationHeader/>
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<CourseModerationSkeleton/>} >
      
    <CourseModeration/>
    </Suspense>
    </HydrationBoundary>
  </>
  )
}

export default page
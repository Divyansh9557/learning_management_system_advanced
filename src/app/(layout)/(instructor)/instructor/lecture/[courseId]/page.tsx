
import { auth } from "@/lib/auth";
import LecturePage from "@/modules/Instructor/Lecture/LecturePage"
import { LectureSkeleton } from "@/modules/Instructor/Lecture/LecturePageSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";


interface Props {
  params:Promise<{courseId:string}>
}


const page = async({params}:Props) => {
  const {courseId} = await params
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin", "instructor"].some((item)=> item===session?.roles[0].role );
    
     
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
      trpc.lecture.get.queryOptions({courseId})
    )

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<LectureSkeleton/>} >
     <LecturePage courseId={courseId} />

      </Suspense>
    </HydrationBoundary>
  )
}

export default page
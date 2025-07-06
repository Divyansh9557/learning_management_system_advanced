import { auth } from "@/lib/auth";
import CreateLectureSkeleton from "@/modules/Instructor/Lecture/CreateLectureSkeleton";

import { EditLecture } from "@/modules/Instructor/Lecture/EditLecture";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props{
 
  params:Promise<{lectureId:string}>
}

const page = async({params}:Props) => {
  const {lectureId} = await params
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin", "instructor"].some((item)=> item===session?.roles[0].role );
    
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }

      const queryClient = getQueryClient()
      void queryClient.prefetchQuery(
        trpc.lecture.getOne.queryOptions({lectureId})
      )

      

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<CreateLectureSkeleton/>} >

      <EditLecture lectureId={lectureId} />
      </Suspense>
    </HydrationBoundary>
  );
}

export default page
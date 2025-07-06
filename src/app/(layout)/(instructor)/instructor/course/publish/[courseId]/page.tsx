import { auth } from "@/lib/auth";
import PublishPage from "@/modules/Instructor/Publish/PublishPage"
import PublishPageSkeleton from "@/modules/Instructor/Publish/PublishPageSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate,  HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Params{
  params:Promise<{courseId:string}>
}

const page = async({params}:Params) => {

  const {courseId} = await params
    const session = await auth.api.getSession({
        headers:await headers()
      })
    
      const allowedRoles = [ "admin", "instructor"].some((item)=> item===session?.roles[0].role );
  
      const queryClient = getQueryClient()
      void queryClient.prefetchQuery(
        trpc.course.getOne.queryOptions({courseId})
      )
  
    if (!session?.user || !allowedRoles  ) {
      redirect('/sign-in')
    }
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<PublishPageSkeleton/>} >
      <PublishPage/>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page
import { auth } from "@/lib/auth";
import InstructorDashboard from "@/modules/Instructor/Dashboard/InstructorDashboard"
import InstructorDashboardSkeleton from "@/modules/Instructor/Dashboard/InstructorDashboardSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";



const page = async() => {
   const session = await auth.api.getSession({
        headers:await headers()
      })
    
      const allowedRoles = [ "admin", "instructor"].some((item)=> item===session?.roles[0].role );
  
     
    if (!session?.user || !allowedRoles  ) {
      redirect('/sign-in')
    }


    const queryClient =  getQueryClient()
    void queryClient.prefetchQuery(
      trpc.course.getManyInstructor.queryOptions()
    )

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<InstructorDashboardSkeleton/>}>
       <InstructorDashboard/>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page
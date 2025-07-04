import { auth } from "@/lib/auth";
import CoursePage from "@/modules/User/Course/CoursePage"
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";


const page = async() => {

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.course.getMany.queryOptions()
  )

   const session = await auth.api.getSession({
      headers:await headers()
    })
  
   const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );

    

  if (!session?.user || !allowedRoles  ) {
    redirect('/sign-in')
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<p>Loading...</p>} >
      <CoursePage/>
      </Suspense>

    </HydrationBoundary>
  )
}

export default page
import { auth } from "@/lib/auth";
import CourseIdPage from "@/modules/User/Course/CourseIdPage"
import CourseContentSkeleton from "@/modules/User/Course/CourseIdSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate,  HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props{
  params:Promise<{courseId:string}>,
}

const page = async({params}:Props) => {
   const {courseId}= await params
   const session = await auth.api.getSession({
      headers:await headers()
    })
  
   const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );
   const contentAccess = session?.enrolledCourses.some((allowedCourse)=> allowedCourse===courseId )
    

  if (!session?.user || !allowedRoles || !contentAccess  ) {
    redirect('/sign-in')
  }

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.course.getOne.queryOptions({courseId})
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<CourseContentSkeleton/>} >

    <CourseIdPage/>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page
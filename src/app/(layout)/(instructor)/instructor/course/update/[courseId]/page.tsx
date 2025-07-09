
import { CourseUpdate } from "@/modules/Instructor/CourseUpdate/CourseUpdate"
import CourseContentSkeleton from "@/modules/User/Course/CourseIdSkeleton"
import { getQueryClient, trpc } from "@/trpc/server"
import { HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props {
    params:Promise<{courseId:string}>
}

const page = async({params}:Props) => {
       const {courseId}=  await params
       const queryClient = getQueryClient()

       void queryClient.prefetchQuery(
        trpc.course.getOneInstructor.queryOptions({
            courseId
        })
       )
  return (
    <HydrationBoundary>
  <Suspense fallback={<CourseContentSkeleton/>} >
    <CourseUpdate/>
  </Suspense>
    </HydrationBoundary>
  )
}

export default page
"use client"

import CourseLayout from "@/components/CourseLayout"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


const CoursePage = () => {

  const trpc = useTRPC()

  const {data}= useSuspenseQuery(
    trpc.course.getPurchasedCourses.queryOptions()
  )

  console.log(data);
  return (
   <CourseLayout purchasedCourse={data}  forType="course" />
  )
}

export default CoursePage
"use client"

import CourseLayout from "@/components/CourseLayout"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


const CoursePage = () => {

  const trpc = useTRPC()

  const {data}= useSuspenseQuery(
    trpc.course.getMany.queryOptions()
  )

  console.log(data);
  return (
   <CourseLayout forType="course" />
  )
}

export default CoursePage
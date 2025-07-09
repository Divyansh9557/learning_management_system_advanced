'use client'

import { useParams } from "next/navigation"
import CourseCreate from "../CourseCreate/CourseCreate"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"



export const CourseUpdate = () => {
    const {courseId}= useParams() as {courseId:string}
    const trpc = useTRPC()
    const {data} =useSuspenseQuery(
        trpc.course.getOneInstructor.queryOptions({courseId:courseId||""  })
    )
    console.log(data)
  return (
    <CourseCreate initialValues={data} />
  )
}

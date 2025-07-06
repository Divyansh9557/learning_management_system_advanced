"use client"
import { useTRPC } from "@/trpc/client"
import CreateLecture from "./CreateLecture"
import { useSuspenseQuery } from "@tanstack/react-query"


interface Props{
    lectureId:string,
}


export const EditLecture = ({lectureId}:Props) => {
  const trpc = useTRPC()
  const {data:initialValues} = useSuspenseQuery(
    trpc.lecture.getOne.queryOptions({lectureId})
  )
  return (
   <CreateLecture initialValues={initialValues[0]} editLectureId={lectureId} />
  )
}

'use client'
import CourseLayout from "@/components/CourseLayout"
import { useFilterParams } from "@/hooks/useQueryState"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


const Browsepage = () => {
  const trpc = useTRPC()
  const [filter] = useFilterParams()
  const {data} = useSuspenseQuery(
    trpc.course.getMany.queryOptions({page:filter.page,category:filter.category,search:filter.search})  )
    console.log(data)
  return (
   <CourseLayout courses={data} forType="browse" />
  )
}

export default Browsepage
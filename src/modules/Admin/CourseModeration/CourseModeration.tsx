'use client'
import { CourseTable } from "@/components/Coursetable" 

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useFilterParams } from "@/hooks/useQueryState"
import { CoursePagination } from "@/modules/User/Browse/CoursePagination"
import { COURSE_PER_PAGE_ADMIN } from "@/lib/constants"

const CourseModeration = () => {
  const [filter] = useFilterParams()

  const trpc = useTRPC()

  const {data:courseData} = useQuery(
    trpc.admin.getManyCourse.queryOptions({page:filter.page,search:filter.search})
  )

  console.log(courseData)

  return (
    <div className="space-y-6">
     
      
      {/* Courses Table */}
      <CourseTable courseData={courseData  } />
      <CoursePagination limit={COURSE_PER_PAGE_ADMIN} totalPage={courseData?.totalPage || 1} />
    </div>
  )
}

export default CourseModeration

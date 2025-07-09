'use client'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { adminDashboardCourse, AdminGetMany } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";




interface CourseTableProps {
  courseData?: AdminGetMany | undefined ;
  compact?: boolean;
  adminCourseData?: adminDashboardCourse
}


export function CourseTable({ adminCourseData,courseData, compact = false }: CourseTableProps) {

  const [current,setCurrent]= useState<string | undefined >()
  const trpc= useTRPC()
  const queryClient = useQueryClient()
  const {mutate:acceptCourse}= useMutation(
    trpc.admin.approveCourse.mutationOptions({
      onSuccess:async()=>{
           await queryClient.invalidateQueries(
            trpc.admin.getManyCourse.queryOptions()
           )
           setCurrent(undefined)
      }
    })
  )
  const {mutate:rejectCourse}= useMutation(
    trpc.admin.rejectCourse.mutationOptions({
      onSuccess:async()=>{
           await queryClient.invalidateQueries(
            trpc.admin.getManyCourse.queryOptions()
           )
      }
    })
  )

  const handleApprove = (courseId: string) => {
    setCurrent(courseId)
    acceptCourse({courseId})
  };

  const handleReject = (courseId: string) => {
     rejectCourse({courseId})
  };


  

  return (
    <div className="bg-white/[0.02] border border-white/[0.08] rounded-lg backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-white/[0.08] hover:bg-white/[0.02]">
            <TableHead className="text-white/80">Course Title</TableHead>
            <TableHead className="text-white/80">Instructor</TableHead>
            <TableHead className="text-white/80">Status</TableHead>
            <TableHead className="text-white/80">
              Price
            </TableHead>
            {!compact && <TableHead className="text-white/80">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
            {
              adminCourseData ? (<>
              {adminCourseData?.courseDetails.slice(0,7).map((course) => (
            <TableRow key={course.courses.id} className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableCell className="font-medium text-white">{course.courses.title}</TableCell>
              <TableCell className="text-white/70">{course.instructor?.name}</TableCell>
              <TableCell>
                <Badge 
                  variant={course.courses.status === "published" ? "default" : "secondary"}
                  className={course.courses.status === "published" 
                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  }
                >
                  {course.courses.status}
                </Badge>
              </TableCell>
                  <TableCell className="text-white/70">₹{course.courses.price}</TableCell>
            
            </TableRow>
          ))}
              </>):(<>
              {courseData?.data.map((course) => (
            <TableRow key={course.id} className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableCell className="font-medium text-white">{course.title}</TableCell>
              <TableCell className="text-white/70">{course.instructor?.name}</TableCell>
              <TableCell>
                
                {
                  course.status ==="rejected" && (
                     <Badge 
                  variant={ "secondary"}
                  className="bg-red-500/80 text-white-300 border-red-500/50"
                >
                  {course.status}
                </Badge>
                  )
                }
                {
                  course.status==="published" &&(
                       <Badge 
                  variant={ "default" }
                  className="bg-green-500/20 text-green-300 border-green-500/30" 
                >
                  {course.status}
                </Badge>
                  )
                }
                {
                  course.status==="pending_approval" &&(
                    <Badge 
                      variant={ "secondary"}
                      className= "bg-yellow-500/20 text-yellow-300 border-white" 
                    >
                  {course.status}
                </Badge>
                    
                  )
                }
               
              </TableCell>
                  <TableCell className="text-white/70">₹{course.price}</TableCell>
              {!compact && (
                <TableCell>
                  <div className="flex items-center gap-2">
                   {
                     course.status==="published" ? null:(
                       <Button
                      size="sm"
                      disabled={course.id ===current }
                      variant="outline"
                      onClick={() => handleApprove(course.id)}
                      className="bg-green-500/10 hover:text-white border-green-500/30 text-green-300 hover:bg-green-500/20"
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                     )
                   }
                   {
                    course.status==="rejected"?null:(
                       <Button
                      size="sm"
                      disabled={course.id ===current }
                      variant="outline"
                      onClick={() => handleReject(course.id)}
                      className="bg-red-500/10 hover:text-white border-red-500/30 text-red-300 hover:bg-red-500/20"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    )
                   }
                 
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
              </>)
            }
        </TableBody>
      </Table>
    </div>
  );
}

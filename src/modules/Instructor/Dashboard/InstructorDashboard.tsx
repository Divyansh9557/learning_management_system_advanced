"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  Book,
  Award,
  Clock,
  Pencil,
  Trash2,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const InstructorDashboard = () => {
  const trpc = useTRPC();
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);

  const { data: courses } = useSuspenseQuery(
    trpc.course.getManyInstructor.queryOptions()
  );

  const metrics = [
    {
      title: "Total Courses",
      value: courses.length.toString(),
      icon: Book,
      color: "bg-blue-500",
      description: "Active courses",
    },
    {
      title: "Total Students",
      value: "156",
      icon: Users,
      color: "bg-green-500",
      description: "Enrolled students",
    },
    {
      title: "Monthly Revenue",
      value: "$2,340",
      icon: Award,
      color: "bg-yellow-500",
      description: "This month",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      color: "bg-purple-500",
      description: "From 234 reviews",
    },
  ];

  const queryClient = useQueryClient()
  const {mutate:deleteCourse,isPending }= useMutation(
    trpc.course.delete.mutationOptions({
      onSuccess:async()=>{
        await queryClient.invalidateQueries(
          trpc.course.getManyInstructor.queryOptions()
        )
      }
    })
  )

  const handleDelete = () => {
    if (deleteCourseId) {
      deleteCourse({ courseId: deleteCourseId });
      console.log("Deleting course:", deleteCourseId);
      setDeleteCourseId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0b] to-[#111112] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses & Assessments</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your courses and track student progress interactively.
            </p>
          </div>
          <Link href="/instructor/course/create">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
              <Book className="w-4 h-4 mr-2" /> Create New Course
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-300">{metric.title}</p>
                    <p className="text-2xl text-white font-bold">{metric.value}</p>
                    <p className="text-xs text-gray-400">{metric.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.color}`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl bg-white/5">
            <h2 className="text-2xl font-semibold mb-3">No courses available</h2>
            <p className="text-gray-400 mb-6">Start by creating your first course.</p>
            <Link href="/instructor/course/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Book className="w-4 h-4 mr-2" /> Create a Course
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors rounded-xl shadow-md"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 shadow-lg shadow-orange-500/20">
                      <Book className="w-5 h-5 text-white drop-shadow-sm" />
                    </div>
                    <div className="flex gap-3 " >
                      <Badge
                      className={`capitalize ${
                        course.difficulty === "beginner"
                          ? "bg-green-900 text-green-300 border-green-700"
                          : course.difficulty === "intermediate"
                          ? "bg-yellow-900 text-yellow-300 border-yellow-700"
                          : "bg-red-900 text-red-300 border-red-700"
                      }`}
                    >
                      {course.difficulty}
                    </Badge>
                      <Badge
                      className={`uppercase text-xs ${
                        course.status === "published"
                          ? "bg-green-900 text-green-300 border-green-700"
                          : "bg-gray-800 text-gray-400 border-gray-600"
                      }`}
                    >
                      {course.status}
                    </Badge>
                    </div>
                  </div>

                  <h3 className="text-2xl text-white font-semibold leading-snug">{course.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>
                  <div className="text-sm font-medium text-blue-400">{course.category}</div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 40 mins
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> 50 students
                    </div>
                  </div>

                  <div className="flex justify-between  items-center pt-4">
                    <div className="flex gap-2">
                      <Link href={`/instructor/course/update/${course.id}`}>
                        <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteCourseId(course.id)}>
                        {
                          (isPending && deleteCourseId===course.id) ? <Loader className="animate-spin" />
                          :(<>
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </>
                          )
                        }
                      </Button>
                      {course.status === "draft" && (
                        <Link href={`/instructor/lecture/${course.id}`}>
                          <Button size="sm" className="bg-gray-700 hover:bg-gray-600 border-none text-white">
                            Continue Setup
                          </Button>
                        </Link>
                      )}
                    </div>
                  
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!deleteCourseId} onOpenChange={() => setDeleteCourseId(null)}>
        <DialogContent className="bg-[#111112] border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Course</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400 text-sm">
            Are you sure you want to delete this course? This action cannot be undone.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setDeleteCourseId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorDashboard;

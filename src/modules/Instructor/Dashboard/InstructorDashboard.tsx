'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Book, Award,  Clock} from "lucide-react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const InstructorDashboard = () => {

  const metrics = [
    {
      title: "Total Courses",
      value: "8",
      icon: Book,
      color: "bg-blue-600",
      description: "Active courses"
    },
    {
      title: "Total Students",
      value: "156", 
      icon: Users,
      color: "bg-green-600",
      description: "Enrolled students"
    },
    {
      title: "Monthly Revenue",
      value: "$2,340",
      icon: Award,
      color: "bg-orange-600", 
      description: "This month"
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      color: "bg-purple-600",
      description: "From 234 reviews"
    }
  ];


 const trpc = useTRPC()

  const {data:courses} = useSuspenseQuery(
  trpc.course.getManyInstructor.queryOptions()
  )

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Courses & Assessments</h1>
            <p className="text-gray-400">
              Manage your courses and track student progress with interactive
              content
            </p>
          </div>
          <Link href={"/instructor/course/create"}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Book className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {metric.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       {/* Course Cards */}
{courses.length === 0 ? (
  <div className="text-center py-20 border border-dashed border-gray-700 rounded-lg bg-gray-900">
    <h2 className="text-2xl font-semibold text-gray-200 mb-4">
      No courses available
    </h2>
    <p className="text-gray-400 mb-6">
      You haven’t created any courses yet. Start by creating your first course.
    </p>
    <Link href="/instructor/course/create">
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Book className="w-4 h-4 mr-2" />
        Create a Course
      </Button>
    </Link>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {courses.map((course) => (
      <Card
        key={course.id}
        className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors"
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-600">
              <Book className="w-5 h-5 text-white" />
            </div>
            <Badge
              className={`${
                course.status === "published"
                  ? "bg-green-900 text-green-300 border-green-700"
                  : "bg-gray-800 text-gray-400 border-gray-600"
              }`}
            >
              {course.status}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-white">
            {course.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="text-blue-400 text-sm font-medium mb-4">
            {course.category}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              40 minutes
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              50 students
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge
              className={`${
                course.difficulty === "beginner"
                  ? "bg-green-900 text-green-300 border-green-700"
                  : course.difficulty === "intermediate"
                  ? "bg-orange-900 text-orange-300 border-orange-700"
                  : "bg-red-900 text-red-300 border-red-700"
              }`}
            >
              {course.difficulty}
            </Badge>
            {course.status === "published" ? (
              <Badge className="bg-blue-600 text-white border-blue-600">
                Published
              </Badge>
            ) : (
              <Link href={`/instructor/lecture/${course.id}`}>
                <Button className="bg-gray-600 text-white border-gray-600">
                  Continue setup
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)}
      </div>
    </div>
  );
};

export default InstructorDashboard;

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Book, Award, Clock } from "lucide-react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const InstructorDashboard = () => {
  const trpc = useTRPC();

  const { data: courses } = useSuspenseQuery(
    trpc.course.getManyInstructor.queryOptions()
  );

  const metrics = [
    {
      title: "Total Courses",
      value: "8",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0b] to-[#111112] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Courses & Assessments
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your courses and track student progress interactively.
            </p>
          </div>
          <Link href="/instructor/course/create">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
              <Book className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Metrics */}
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
                    <p className="text-2xl  text-white font-bold">{metric.value}</p>
                    <p className="text-xs text-gray-400">
                      {metric.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.color}`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Courses */}
        {courses.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl bg-white/5">
            <h2 className="text-2xl font-semibold mb-3">
              No courses available
            </h2>
            <p className="text-gray-400 mb-6">
              Start by creating your first course.
            </p>
            <Link href="/instructor/course/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Book className="w-4 h-4 mr-2" />
                Create a Course
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

                  <h3 className="text-2xl text-white font-semibold leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="text-sm font-medium text-blue-400">
                    {course.category}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      40 mins
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      50 students
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
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

                    {course.status === "published" && (
                      <Badge className="bg-blue-600 text-white border-blue-600">
                        Published
                      </Badge>
                    )}

                    {course.status === "draft" && (
                      <Link href={`/instructor/lecture/${course.id}`}>
                        <Button
                          size="sm"
                          className="bg-gray-700 hover:bg-gray-600 border-none text-white"
                        >
                          Continue Setup
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

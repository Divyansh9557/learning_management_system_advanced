import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Book, Award,  Clock} from "lucide-react";
import Link from "next/link";

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

  const courses = [
    {
      id: 1,
      title: "React Hooks Fundamentals",
      description: "Test your knowledge of useState, useEffect, and custom hooks",
      category: "Advanced React Development",
      duration: "30 minutes",
      students: 45,
      difficulty: "Intermediate",
      status: "Published",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features", 
      description: "Arrow functions, destructuring, async/await, and more",
      category: "Modern JavaScript",
      duration: "25 minutes",
      students: 67,
      difficulty: "Beginner",
      status: "Published",
      color: "bg-green-600"
    },
    {
      id: 3,
      title: "TypeScript Basics",
      description: "Types, interfaces, and TypeScript fundamentals",
      category: "TypeScript Mastery", 
      duration: "40 minutes",
      students: 23,
      difficulty: "Intermediate",
      status: "Draft",
      color: "bg-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Courses & Assessments</h1>
            <p className="text-gray-400">Manage your courses and track student progress with interactive content</p>
          </div>
          <Link href={'/course/basic-info'} >
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            >
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
                    <p className="text-gray-500 text-xs mt-1">{metric.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${course.color}`}>
                    <Book className="w-5 h-5 text-white" />
                  </div>
                  <Badge 
                    className={`${
                      course.status === 'Published' 
                        ? 'bg-green-900 text-green-300 border-green-700' 
                        : 'bg-gray-800 text-gray-400 border-gray-600'
                    }`}
                  >
                    {course.status}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="text-blue-400 text-sm font-medium mb-4">{course.category}</div>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} students
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge 
                    className={`${
                      course.difficulty === 'Beginner' ? 'bg-green-900 text-green-300 border-green-700' :
                      course.difficulty === 'Intermediate' ? 'bg-orange-900 text-orange-300 border-orange-700' :
                      'bg-red-900 text-red-300 border-red-700'
                    }`}
                  >
                    {course.difficulty}
                  </Badge>
                  <Button 
                    className={`${
                      course.status === 'Published' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {course.status === 'Published' ? 'View Course' : 'Continue Setup'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;

'use client'
import { CourseTable } from "@/components/Coursetable" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Flag } from "lucide-react"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"

const CourseModeration = () => {
  // Mock courses data for the table
  const courses = [
    { id: 1, title: "Advanced React", instructor: "John Teacher", status: "Approved", students: 145 },
    { id: 2, title: "Python Basics", instructor: "Sarah Wilson", status: "Pending", students: 0 },
    { id: 3, title: "UI/UX Design", instructor: "Mike Designer", status: "Approved", students: 89 },
    { id: 4, title: "Node.js Fundamentals", instructor: "Emma Code", status: "Pending", students: 0 },
    { id: 5, title: "Machine Learning", instructor: "Dr. AI Smith", status: "Approved", students: 203 },
    { id: 6, title: "Web Security", instructor: "Security Pro", status: "Flagged", students: 67 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Course Moderation</h1>
          <p className="text-white/60">
            Review and moderate course submissions
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-white/40">
              Courses awaiting approval
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">
              Flagged Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">3</div>
            <p className="text-xs text-white/40">
              Courses needing attention
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/60">
              Approved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">12</div>
            <p className="text-xs text-white/40">
              Courses published
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/40"
          />
        </div>
        <Button variant="outline" className="bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.05]">
          <Flag className="mr-2 h-4 w-4" />
          Flagged Only
        </Button>
        <Button variant="outline" className="bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.05]">Filter</Button>
      </div>

      {/* Courses Table */}
      <CourseTable courses={courses} />
    </div>
  )
}

export default CourseModeration

'use client'
import React from 'react';
import { BookOpen, Download,  Search } from 'lucide-react';
import StatsCard from '@/components/ui/statsCard'; 
import CourseCard from '@/components/ui/courseCard'; 
import Link from 'next/link';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';

const StudentDashboard: React.FC = () => {
  const trpc = useTRPC()
  const { data}= useSuspenseQuery(
    trpc.dashboard.getUser.queryOptions()
  )
  const session = authClient.useSession()


  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {session.data?.user.name || "Guest" }! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Enrolled Courses"
          value={data.enrolledCourses.length}
          icon={BookOpen}
          
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Completed Courses"
          value={data.completedCourse.length}
          icon={Download}
         
          gradient="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Certificates Earned"
          value={data.completedCourse.length}
          icon={Download}
          
          gradient="from-purple-500 to-pink-500"
        />
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Continue Learning
            </h2>
            <Link href={'/courses'} >
            <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              View All
            </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.enrolledCourses.slice(0, 2).map((course,index) => (
              <CourseCard 
              key={course.course.id}
                category={course.course.category}
                enrollment={course.enrollments}
                instructor={data.courseDetails[index].instructor.name}
                level={course.course.difficulty}
                title={course.course.title}
                thumbnail={course.course.thumbnailUrl}
                rating={ 0 }
                duration={"10"}
                lessons={5}
              
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          
          
          

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link href={'/browse'} >
              <button className="w-full flex items-center mb-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all">
                <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                <span className="text-gray-900 dark:text-white font-medium">Browse New Courses</span>
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


import React from 'react';
import { BookOpen, Download, User, Search } from 'lucide-react';
import StatsCard from '@/components/ui/statsCard'; 
import CourseCard from '@/components/ui/courseCard'; 
import Link from 'next/link';

const StudentDashboard: React.FC = () => {
  const recentCourses = [
    {
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      duration: '8 hours',
      lessons: 24,
      thumbnail: '',
      progress: 65,
      level: 'Advanced' as const,
      category: 'Programming'
    },
    {
      title: 'UI/UX Design Fundamentals',
      instructor: 'Mike Chen',
      rating: 4.9,
      duration: '6 hours',
      lessons: 18,
      thumbnail: '',
      progress: 30,
      level: 'Beginner' as const,
      category: 'Design'
    },
    {
      title: 'Data Science with Python',
      instructor: 'Dr. Emily Roberts',
      rating: 4.7,
      duration: '12 hours',
      lessons: 36,
      thumbnail: '',
      progress: 80,
      level: 'Intermediate' as const,
      category: 'Data Science'
    }
  ];

  const recentActivity = [
    { action: 'Completed', item: 'React Hooks Quiz', time: '2 hours ago' },
    { action: 'Started', item: 'Advanced State Management', time: '1 day ago' },
    { action: 'Earned', item: 'JavaScript Fundamentals Certificate', time: '3 days ago' },
    { action: 'Joined', item: 'Web Development Discussion', time: '1 week ago' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Enrolled Courses"
          value={12}
          icon={BookOpen}
          change="+2 this month"
          changeType="positive"
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Completed Courses"
          value={8}
          icon={Download}
          change="+3 this month"
          changeType="positive"
          gradient="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Certificates Earned"
          value={5}
          icon={Download}
          change="+1 this week"
          changeType="positive"
          gradient="from-purple-500 to-pink-500"
        />
        <StatsCard
          title="Learning Hours"
          value="47h"
          icon={User}
          change="+12h this week"
          changeType="positive"
          gradient="from-orange-500 to-red-500"
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
            {recentCourses.slice(0, 2).map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold  text-white mb-6">
            Recent Activity
          </h2>
          
          <div className="bg-gray-800 rounded-xl border border-gray-200  p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">
                      <span className="font-medium">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              <button className="w-full flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all">
                <Download className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-gray-900 dark:text-white font-medium">View Certificates</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

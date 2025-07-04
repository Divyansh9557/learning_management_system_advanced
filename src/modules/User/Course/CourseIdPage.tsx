
import {
  Star,
  Clock,
  User,
  BookOpen,
  Play,
  Download,
  MessageCircle,
} from "lucide-react";
import { CourseTab } from "./CourseTab";

const CourseIdPage = () => {

 

  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Video Player Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <Play className="w-20 h-20 text-white mb-4 mx-auto" />
              <p className="text-white text-lg">Components and JSX</p>
              <p className="text-gray-400">Lesson 3 of 24 • 20:15</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Course Header */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-6">
            <h1 className="text-2xl font-bold text-white mb-4">
              Advanced React Development
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>Sarah Johnson</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>4.8 (2,341 reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>8 hours total</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>24 lessons</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Progress: 8/24 lessons completed
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: "33%" }}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <CourseTab/>
          
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
            <h3 className="font-semibold text-white mb-4">Course Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Completed</span>
                <span className="font-medium text-white">8/24</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: "33%" }}
                />
              </div>
              <div className="text-center text-sm text-gray-400">
                33% Complete
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download Resources
              </button>
              <button className="w-full flex items-center justify-center p-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;

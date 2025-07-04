'use client'
import { BookOpen, Download, MessageCircle, Play } from "lucide-react";
import { useState } from "react";


export const CourseTab = () => {

  const [activeTab, setActiveTab] = useState("content");
    const tabs = [
    { id: "content", name: "Content", icon: BookOpen },
    { id: "assignments", name: "Assignments", icon: Download },
    { id: "discussions", name: "Discussions", icon: MessageCircle },
    { id: "certificate", name: "Certificate", icon: Download },
  ];

    const lessons = [
    {
      id: 1,
      title: "Introduction to React",
      duration: "15:30",
      completed: true,
      type: "video",
    },
    {
      id: 2,
      title: "Setting up Development Environment",
      duration: "12:45",
      completed: true,
      type: "video",
    },
    {
      id: 3,
      title: "Components and JSX",
      duration: "20:15",
      completed: false,
      type: "video",
    },
    {
      id: 4,
      title: "State and Props Quiz",
      duration: "10 questions",
      completed: false,
      type: "quiz",
    },
  ];
  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-400"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "content" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Course Content
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Master advanced React concepts including hooks, context,
                    performance optimization, and modern patterns.
                  </p>

                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                            lesson.completed ? "bg-green-500" : "bg-gray-600"
                          }`}
                        >
                          {lesson.completed ? (
                            <span className="text-white text-sm">✓</span>
                          ) : (
                            <span className="text-white text-sm">
                              {lesson.id}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">
                            {lesson.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {lesson.type === "video" ? "Video" : "Quiz"} •{" "}
                            {lesson.duration}
                          </p>
                        </div>
                        <Play className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "assignments" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Assignments
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                      <h4 className="font-medium text-white mb-2">
                        Build a Todo App with React Hooks
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Create a fully functional todo application using
                        useState and useEffect hooks.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-400 font-medium">
                          Due: March 15, 2024
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Start Assignment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "discussions" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Discussions
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            JD
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">
                              John Doe
                            </span>
                            <span className="text-sm text-gray-400">
                              2 hours ago
                            </span>
                          </div>
                          <p className="text-gray-300">
                            Great explanation of useCallback! Could you provide
                            more examples of when to use it?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "certificate" && (
                <div className="text-center py-8">
                  <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Certificate of Completion
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Complete all lessons to earn your certificate
                  </p>
                  <div className="text-sm text-gray-400">
                    Progress: 8/24 lessons completed (33%)
                  </div>
                </div>
              )}
            </div>
          </div>
  )
}

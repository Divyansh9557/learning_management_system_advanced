'use client'
import { BookOpen, Download, Play } from "lucide-react";
import { useState } from "react";
import type { courseGetOne } from "@/types/types";

interface Props {
  data?: courseGetOne;
  handleLectureChange:(n:number)=> void,
  active :number
}

export const CourseTab = ({data,handleLectureChange,active}:Props) => {

  const [activeTab, setActiveTab] = useState("content");
    const tabs = [
    { id: "content", name: "Content", icon: BookOpen },
    { id: "certificate", name: "Certificate", icon: Download },
  ];

  console.log(data)

   
  return (
    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8 px-6 overflow-y-auto ">
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
              {data?.course.description}
            </p>

            <div className="space-y-3">
              {data?.lecture.map((lesson, index) => (
                <div
                  onClick={() => handleLectureChange(index)}
                  key={lesson.id}
                  className={`flex border items-center p-4 ${
                    index === active
                      ? "bg-gray-500 text-white"
                      : "text-gray-400 hover:bg-gray-700 "
                  } cursor-pointer transition-colors`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-4`}
                  >
                    <span>{index + 1} :  </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{lesson.title}</h4>
                   
                  </div>
                  <Play className="w-5 h-5 text-gray-400" />
                </div>
              ))}
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
  );
}

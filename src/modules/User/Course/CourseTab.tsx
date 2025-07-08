"use client";

import { BookOpen, Download, Play, Check, Loader } from "lucide-react";
import { useState } from "react";
import type { courseGetOne } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

interface Props {
  data?: courseGetOne;
  handleLectureChange: (n: number) => void;
  active: number;
}

export const CourseTab = ({ data, handleLectureChange, active }: Props) => {
  const [activeTab, setActiveTab] = useState("content");

  const tabs = [
    { id: "content", name: "Content", icon: BookOpen },
    { id: "certificate", name: "Certificate", icon: Download },
  ];

  const trpc = useTRPC();
  const queryClient = useQueryClient()

  const { mutate: markAsComplete, isPending } = useMutation(
    trpc.lecture.markAsComplete.mutationOptions({
      onSuccess:async()=>{
        await queryClient.invalidateQueries(
          trpc.course.getOne.queryOptions({courseId:data?.course.id || "" })
        )
        await queryClient.invalidateQueries(
          trpc.course.getMany.queryOptions()
        )
        await queryClient.invalidateQueries(
          trpc.course.getPurchasedCourses.queryOptions()
        )
      }
    })
  );


  const handleComplete = () => {
    markAsComplete({ lectureId: data?.lectureWithProgress[active].id || "",courseId:data?.course.id || "" });
  };

  return (
    <div className="bg-[#121212] rounded-xl shadow-lg border border-gray-800">
      {/* Tabs */}
      <div className="border-b border-gray-700 px-4">
        <nav className="flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 text-sm font-medium transition duration-200 ${
                activeTab === tab.id
                  ? "text-indigo-400 border-b-2 border-indigo-500"
                  : "text-gray-400 border-b-2 border-transparent hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "content" && (
          <div>
            {/* Heading + Mark All Button */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                Course Content
              </h3>
             {
              data?.lectureWithProgress[active].completed?null:(
                 <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
              >
                {isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Mark as Complete
                  </>
                )}
              </button>
              )
             }
            </div>

            <p className="text-gray-400 mb-5">{data?.course.description}</p>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {data?.lectureWithProgress.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => handleLectureChange(index)}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 cursor-pointer border border-gray-700 ${
                    index === active
                      ? "bg-indigo-600/10 text-white border-indigo-500"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-indigo-400 font-semibold">
                      {index + 1}:
                    </span>
                    <h4 className="text-sm font-medium">{lesson.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    
                    {lesson.completed ? (
                      <div className="text-xs px-2 rounded-2xl py-1 border border-emerald-600 text-emerald-400  hover:bg-emerald-700/10 transition">
                        Completed
                      </div>
                    ):(
                       <Play className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "certificate" && (

          data?.progress===100 ?(
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-10 shadow-xl border border-gray-700">
    <div className="text-center max-w-md w-full">
      <Download className="w-14 h-14 text-indigo-400 mx-auto mb-6" />

      <h3 className="text-3xl font-bold text-white mb-4">Certificate of Completion</h3>

      <p className="text-gray-300 text-sm mb-6">
        Congratulations! You&apos;ve successfully completed the course.
      </p>

      <div className="bg-[#121212] p-6 rounded-xl border border-gray-700 text-left text-sm text-white space-y-3 shadow-inner">
        <div className="flex justify-between">
          <span className="text-gray-400">Student</span>
          <span className="font-medium">John Doe</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Course</span>
          <span className="font-medium">{data?.course.title || "Course Title"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Instructor</span>
          <span className="font-medium">{data?.instructor.name || "Instructor Name"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Lessons Completed</span>
          <span className="font-medium">
            {data?.lectureCompleted}/{data?.lectureWithProgress.length}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Progress</span>
          <span className="font-medium">{data?.progress}%</span>
        </div>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition"
      >
        Download Certificate
      </button>
    </div>
  </div>
          ):
          <div className="text-center py-12">
            <Download className="w-14 h-14 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Certificate of Completion
            </h3>
            <p className="text-gray-400">
              Complete all lessons to earn your certificate
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Progress: {data?.lectureCompleted}/{data?.lectureWithProgress.length} lessons completed ({data?.progress}%)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

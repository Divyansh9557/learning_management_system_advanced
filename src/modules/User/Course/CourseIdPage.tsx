'use client'
import {
  Star,
  Clock,
  User,
  BookOpen,
  Download,
} from "lucide-react";
import { CourseTab } from "./CourseTab";
import { useParams } from "next/navigation";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";

const CourseIdPage = () => {

 const [active,setActive] = useState<number>(0)
const {courseId} = useParams() as  {courseId:string}
  
const trpc = useTRPC()
 const {data,isLoading} = useSuspenseQuery(
  trpc.course.getOne.queryOptions({courseId})
 )

 function formatSecondsToHHMMSS(totalSeconds:number) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

   const handleLectureChange= (n:number)=>{
       setActive(n)
   }

   if(isLoading){
    return <>Loading...</>
   }

    const duration = ()=>{
      const time = data?.lecture.reduce((acc,curr)=>{
        return curr.duration ? curr.duration+acc : acc+0
      },0)
      return formatSecondsToHHMMSS(time)
    }


//  console.log(data)
  return (
    <div className="  text-white">
      {/* Video Player Section */}
      <div className="">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video bg-black">
            <video
              className="w-[100%] h-[100%] object-cover"
              controls
              poster={data?.course.thumbnailUrl || "" } // Optional thumbnail
            >
              <source
                src={data?.lecture[active]?.videoUrl || undefined }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Course Header */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-6">
            <h1 className="text-2xl font-bold text-white mb-4">
              {data?.lecture[active]?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{data?.instructor.name}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>4.8 (2,341 reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{duration()} hours total</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{data?.lecture.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Progress: 0/ {data?.lecture.length} lessons completed
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
          <CourseTab
            handleLectureChange={handleLectureChange}
            data={data}
            active={active}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
            <h3 className="font-semibold text-white mb-4">Course Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Completed</span>
                <span className="font-medium text-white">0/{data?.lecture.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: "43%" }}
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
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;

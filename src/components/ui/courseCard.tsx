/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from "next/image";
import {  User, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "./button";
import Link from "next/link";

interface CourseCardProps {
  id?: string | null;
  title: string | null;
  instructor: string | null;
  rating: number | null;
  duration: string | null;
  lessons: number | null;
  thumbnail?: string | null;
  price?: number | null;
  progress?: string|number | null;
  level: "beginner" | "intermediate" | "advanced" | null;
  category: string | null;
  enrollment:any
}

const CourseCard = ({
  id = "545",
  title,
  instructor,
  price,
  level,
  category,
  thumbnail,
  enrollment,

}: CourseCardProps) => {
  // const router = useRouter();

  const trpc = useTRPC()
  const {mutate:purchaseCourse,isPending} = useMutation(
    trpc.course.purchase.mutationOptions({
      onSuccess:async(data:any)=>{

        window.location.href = data.sessionUrl
        console.log("success")
      }
    })
  )

  console.log(enrollment)

  const handleCourseAction = () => {
    purchaseCourse({courseId:id || "" })
    // router.push(`/courses/${id}`);
  };

  return (
    <div
      className="bg-[#0f0f0f] border border-gray-800 rounded-xl shadow hover:shadow-lg hover:border-indigo-500/30 group transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Thumbnail image */}
      <div className="relative w-full aspect-video bg-gray-900">
        <Image
          src={thumbnail || "/api/placeholder/400/250"}
          alt={title || "Course Thumbnail"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {/* Category badge */}
        

        {/* Level badge */}
        
      </div>

      {/* Main content */}
      <div className="p-5">
        <div className="flex justify-between " >

             
        <h3 className={`text-lg font-semibold  mb-2 line-clamp-2 ${enrollment?.progress==="100"?"group-hover:text-green-500 text-green-500 ":"group-hover:text-indigo-400 text-white " }  transition-colors`}>
          {title}
        </h3>
         
         <div className="flex gap-2 " >
          {/* badge */}
        <div >
          <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="z-10">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              level === "beginner"
                ? "bg-green-600/20 text-green-300"
                : level === "intermediate"
                ? "bg-yellow-600/20 text-yellow-300"
                : "bg-red-600/20 text-red-300"
            }`}
          >
            {level}
          </span>
        </div>
         </div>
        </div>

        <div className="flex items-center text-sm text-white/70 mb-3">
          <User className="w-4 h-4 mr-1" />
          <span>{instructor}</span>
        </div>

        

        {/* Progress bar */}
        {enrollment?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/70 mb-1">
              <span>Progress</span>
              <span>{enrollment?.progress }%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={` ${enrollment?.progress==="100"?"bg-green-500":"bg-gradient-to-r from-indigo-500 to-purple-600"}  h-2 rounded-full transition-all duration-300`}
                style={{ width: `${enrollment?.progress }%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2">
          {
            !enrollment?.progress && (
              price && (
                <div className="text-xl font-bold text-white">₹{price}</div>
              )

            )
          }

          {
            enrollment?.progress ? (
              <Link href={`/courses/${id}`} >
              <Button 
              className={`bg-gradient-to-r w-full ${enrollment?.progress==="100"?"bg-green-500 hover:bg-green-400 text-white " : "from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700"}  transition-all duration-200 text-sm font-medium`}
              >
                {
                  enrollment?.progress==="100"?"Completed":"Continue"
                }
                
              </Button>
                </Link>
            ):(
              <button
            onClick={(e) => {
              e.stopPropagation();
              handleCourseAction();
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
          >
            {
              isPending ? <Loader className="animate-spin" /> : (
                  "Enroll Now"
              )
            }
            
          </button>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

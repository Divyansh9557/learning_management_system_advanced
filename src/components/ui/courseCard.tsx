'use client';

import Image from "next/image";
import { Star, Clock, User, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id?: string | null;
  title: string | null;
  instructor: string | null;
  rating: number | null;
  duration: string | null;
  lessons: number | null;
  thumbnail?: string | null;
  price?: number | null;
  progress?: number | null;
  level: "beginner" | "intermediate" | "advanced" | null;
  category: string | null;
}

const CourseCard = ({
  id = "545",
  title,
  instructor,
  rating,
  duration,
  lessons,
  price,
  progress,
  level,
  category,
  thumbnail,
}: CourseCardProps) => {
  const router = useRouter();

  const handleCourseAction = () => {
    router.push(`/courses/${id}`);
  };

  return (
    <div
      onClick={handleCourseAction}
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

             
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
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

        <div className="flex items-center justify-between mb-4 text-sm text-white/70">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{lessons} lessons</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/70 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2">
          {price && (
            <div className="text-xl font-bold text-white">₹{price}</div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCourseAction();
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
          >
            {progress !== undefined ? "Continue" : "Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

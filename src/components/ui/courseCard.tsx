"use client";

import { Star, Clock, User, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id?: number;
  title: string;
  instructor: string;
  rating: number;
  duration: string;
  lessons: number;
  thumbnail?: string;
  price?: string;
  progress?: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

const CourseCard = ({
  id = 1,
  title,
  instructor,
  rating,
  duration,
  lessons,
  price,
  progress,
  level,
  category,
}: CourseCardProps) => {
  const router = useRouter();

  const handleCourseAction = () => {
    router.push(`/course/${id}`);
  };

  return (
    <div
      onClick={handleCourseAction}
      className="bg-[#0f0f0f] border border-gray-800 rounded-xl shadow hover:shadow-lg hover:border-indigo-500/30 group transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top visual area */}
      <div className="relative overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-white opacity-50" />
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Level badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              level === "Beginner"
                ? "bg-green-600/20 text-green-300"
                : level === "Intermediate"
                ? "bg-yellow-600/20 text-yellow-300"
                : "bg-red-600/20 text-red-300"
            }`}
          >
            {level}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

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
            <div className="text-xl font-bold text-white">{price}</div>
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

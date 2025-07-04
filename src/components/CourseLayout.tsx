'use client'
import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import CourseCard from '@/components/ui/courseCard'; 


interface Props{
    forType: "course" | "browse";
}


const CourseLayout = ({ forType }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      rating: 4.8,
      duration: "8 hours",
      lessons: 24,
      thumbnail: "/api/placeholder/400/250",
      price: "$99",
      level: "Advanced" as const,
      category: "Frontend",
    },
    {
      id: 2,
      title: "Modern JavaScript ES6+",
      instructor: "Mike Chen",
      rating: 4.6,
      duration: "6 hours",
      lessons: 18,
      thumbnail: "/api/placeholder/400/250",
      price: "$79",
      level: "Intermediate" as const,
      category: "JavaScript",
    },
    {
      id: 3,
      title: "CSS Grid & Flexbox Mastery",
      instructor: "Emma Davis",
      rating: 4.9,
      duration: "5 hours",
      lessons: 15,
      thumbnail: "/api/placeholder/400/250",
      price: "$59",
      level: "Beginner" as const,
      category: "CSS",
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "Alex Rodriguez",
      rating: 4.7,
      duration: "10 hours",
      lessons: 32,
      thumbnail: "/api/placeholder/400/250",
      price: "$129",
      level: "Intermediate" as const,
      category: "Backend",
    },
    {
      id: 5,
      title: "Python for Data Science",
      instructor: "Dr. Lisa Wang",
      rating: 4.8,
      duration: "12 hours",
      lessons: 28,
      thumbnail: "/api/placeholder/400/250",
      price: "$149",
      level: "Beginner" as const,
      category: "Data Science",
    },
    {
      id: 6,
      title: "TypeScript Fundamentals",
      instructor: "James Wilson",
      rating: 4.5,
      duration: "7 hours",
      lessons: 20,
      thumbnail: "/api/placeholder/400/250",
      price: "$89",
      level: "Intermediate" as const,
      category: "TypeScript",
    },
  ];

  const categories = [
    "all",
    "Frontend",
    "Backend",
    "JavaScript",
    "CSS",
    "Data Science",
    "TypeScript",
  ];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {forType === "browse" ? "Browse Courses" : "Puschased Courses"}
          </h1>
          <p className="text-gray-400">
            {forType === "browse"
              ? "Discover new skills with our comprehensive course catalog"
              : "you can see your progress on  clicking the progress"}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border  border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700  text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {filteredCourses.length} Course
              {filteredCourses.length !== 1 ? "s" : ""} Found
            </h2>
            {(searchQuery ||
              selectedCategory !== "all" ||
              selectedLevel !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>Sorted by rating</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              rating={course.rating}
              duration={course.duration}
              lessons={course.lessons}
              thumbnail={course.thumbnail}
              price={course.price}
              level={course.level}
              category={course.category}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or browse all courses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLayout;

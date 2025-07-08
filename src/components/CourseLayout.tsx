'use client'

import CourseCard from '@/components/ui/courseCard'; 
import { CoursePagination } from '@/modules/User/Browse/CoursePagination';
import { CourseGetMany } from '@/types/types';
import { Search } from 'lucide-react';



interface Props{
    forType: "course" | "browse",
    courses : CourseGetMany
}


const CourseLayout = ({ courses }: Props) => {
  



 
  return (
    <div className=" p-6 ">
     

        {/* Course Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.data.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor?.name || "Unknown"}
              rating={10}
              duration={"5"}
              lessons={5}
              thumbnail={course.thumbnailUrl || "" }
              price={course.price || 0}
              level={course.difficulty}
              category={course.category}
              enrollment={course.enrollment}
            />
          ))}

      </div>

       
        {courses.data?.length === 0 && (
          <div className="text-center  mx-auto  py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search criteria or browse all courses
            </p>
          </div>
        )}
      <CoursePagination totalPage={courses.totalPage}  />
 
    </div>
  );
};

export default CourseLayout;

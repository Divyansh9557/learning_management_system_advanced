'use client'

import CourseCard from '@/components/ui/courseCard'; 
import { CoursePagination } from '@/modules/User/Browse/CoursePagination';
import { CourseGetMany, purchasedCourseGetMany } from '@/types/types';
import { Search, GraduationCap } from 'lucide-react';

interface Props {
  forType: 'course' | 'browse';
  courses?: CourseGetMany;
  purchasedCourse?:purchasedCourseGetMany
}

const CourseLayout = ({ courses,forType,purchasedCourse }: Props) => {
  return (
    <div className="p-6">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text  animate-fade-in">
          { courses?.data && courses?.data?.length > 0 || purchasedCourse && purchasedCourse?.length>0  ? ( 
           
           courses?.data && courses?.data?.length > 0  ?'Explore Courses':"Purchased Course"

            
            ) : 'Nothing Here Yet'}
        </h1>
        <p className="text-sm text-zinc-400 mt-2">Advance your skills with top-tier content</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">

        {
          forType==="browse" ? (
               courses?.data.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            instructor={course.instructor?.name || 'Unknown'}
            rating={10}
            duration={'5'}
            lessons={5}
            thumbnail={course.thumbnailUrl || ''}
            price={course.price || 0}
            level={course.difficulty}
            category={course.category}
            enrollment={course.enrollment}
            
          />
        ))
          ):(
            purchasedCourse?.map((course,index) => (
          <CourseCard
            key={course?.courses.id || index }
            id={course?.courses.id }
            title={course.courses.title}
            instructor={ course.instructor.name || 'Unknown'}
            rating={10}
            duration={'5'}
            lessons={5}
            thumbnail={course.courses.thumbnailUrl || ''}
            price={course.courses.price || 0}
            level={course.courses.difficulty}
            category={course.courses.category}
            enrollment={course}
            progress={course.progress}
          />
        ))
          )
        }
       
      </div>

      {/* Empty state */}
      {courses?.data.length === 0 && (
        <div className="text-center mx-auto py-20">
          <Search className="w-16 h-16 text-zinc-500 mx-auto mb-6 animate-pulse" />
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-zinc-400">Try adjusting your search or browse all categories.</p>
        </div>
      )}

      {/* Divider */}
      <div className="my-10 border-t border-zinc-800" />

      {/* Pagination */}
      <div className="flex justify-center">
        <CoursePagination totalPage={courses?.totalPage || 0 } />
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-14 text-sm text-zinc-500">
        <div className="inline-flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-400" />
          Keep learning, keep growing.
        </div>
      </div>
    </div>
  );
};

export default CourseLayout;

import { db } from "@/db";
import { courses, enrollments, payments, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, inArray, ne } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export const dashboardProcedure = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const enrolledCourses = await db
      .select({
        course:courses,
        enrollments:enrollments
      })
      .from(enrollments)
      .innerJoin(courses,eq(enrollments.courseId,courses.id))
      .where(eq(enrollments.userId, ctx.session.user.id))
      .orderBy(enrollments.updatedAt);

    // Extract courseIds
    const courseIds = enrolledCourses.map((e) => e.course.id);
    const completedCourse = enrolledCourses.filter((c)=> c.enrollments.progress==="100" )

    // If no courses, skip query
    if (courseIds.length === 0) {
      // handle empty state
    }
    

    // Create instructor alias
    const instructor = alias(user, "instructor");

    // Fetch courses with instructors
    const courseDetails = await db
      .select({
        course: courses,
        instructor: instructor,
      })
      .from(courses)
      .innerJoin(instructor, eq(courses.instructorId, instructor.id))
      .where(inArray(courses.id, courseIds));

      return { enrolledCourses, courseDetails, completedCourse };
  }),
  getAdmin:protectedProcedure
  .query(async()=>{
    const  allUsers= await db
    .select()
    .from(user);

    const courseDetails = await db
      .select({
        courses: courses,
        instructor: user,
      })
      .from(courses)
      .innerJoin(user, eq(courses.instructorId, user.id))
      .where(ne(courses.status, "draft"));
    
    const activeCourse = courseDetails.filter((curr)=> curr.courses.status==="published").length
    
    const revenue = await db 
    .select()
    .from(payments)
    .where(eq(payments.status,"success"))
    
    const total = revenue.reduce((acc,curr)=> parseInt(curr.price)+acc ,0)
   
    return { allUsers, activeCourse, total,courseDetails };
  })

});

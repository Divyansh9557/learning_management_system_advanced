import { db } from "@/db";
import { courses, user} from "@/db/schema";
import { COURSE_PER_PAGE_ADMIN, USER_PER_PAGE } from "@/lib/constants";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {  and,    count,   eq, ilike, ne } from "drizzle-orm";
import z from "zod";



export const adminProcedure= createTRPCRouter({
    getUser: protectedProcedure
    .input(z.object({search:z.string().nullish().optional(),page:z.number()}))
    .query(async({ctx,input})=>{
        const existUser = await db
          .select()
          .from(user)
          .where(
            and(
                ne(user.id, ctx.session.user.id),
                input.search ? ilike(user.name, `${input.search}%`) : undefined
            )
        )
          .limit(USER_PER_PAGE)
          .offset(  input.search ? 0 :  (input.page - 1) * USER_PER_PAGE);

          const [totalPage] = await db
          .select({
            total: count()
          }
          )
          .from(user)
          

        return {existUser,totalPage}
    }),
    deleteUser:protectedProcedure
    .input(z.object({userId:z.string()}))
    .mutation(async({input})=>{
        const removedUser = await db
        .delete(user)
        .where(eq(user.id,input.userId))

        return removedUser
    }),
    promoteUser:protectedProcedure
    .input(z.object({userId:z.string()}))
    .mutation(async({input})=>{
         const updatedUser = await db
         .update(user)
         .set({role:"instructor"})
         .where(eq(user.id,input.userId))

         return updatedUser
    }),
    demoteUser:protectedProcedure
    .input(z.object({userId:z.string()}))
    .mutation(async({input})=>{
         const updatedUser = await db
         .update(user)
         .set({role:"student"})
         .where(eq(user.id,input.userId))

         return updatedUser
    }),
      getManyCourse: protectedProcedure
    .input(
      z
        .object({
          page: z.number(),
          level: z
            .enum(["beginner", "intermediate", "advanced"])
            .optional()
            .nullish(),
          search: z.string().nullish(),
          category: z.string().nullish(),
          status: z.enum(["pending_approval", "published", "rejected"]).nullish(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      
      const data = await db
        .select({
          id: courses.id,
          title: courses.title,
          thumbnailUrl: courses.thumbnailUrl,
          instructorId: courses.instructorId,
          difficulty: courses.difficulty,
          category: courses.category,
          price: courses.price,
          status:courses.status,
          // Populated instructor fields
          instructor: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })
        .from(courses)
        .leftJoin(user, eq(courses.instructorId, user.id))
        .where(
          and(
            input?.search
              ? ilike(courses.title, `%${input.search}%`)
              : undefined,
            input?.level ? eq(courses.difficulty, input.level) : undefined,
            input?.category ? eq(courses.category, input.category) : undefined,  
            input?.status ? eq(courses.status, input.status) : undefined,  
            ne(courses.status,"draft")
          )
        )
        .limit(COURSE_PER_PAGE_ADMIN)
        .offset(input?.page ? (input.page - 1) * COURSE_PER_PAGE_ADMIN : 0)
        

      const [{ count: totalPage }] = await db
        .select({
          count: count(),
        })
        .from(courses)
        .where(
          and(
            input?.search
              ? ilike(courses.title, `%${input.search}%`)
              : undefined,
            input?.level ? eq(courses.difficulty, input.level) : undefined,
            input?.category ? eq(courses.category, input.category) : undefined,
            ne(courses.status,"draft")
          )
        );
     
        
      return {
        data,
        totalPage,
      };
    }),
    approveCourse: protectedProcedure
    .input(z.object({courseId:z.string()}))
    .mutation(async({input})=>{
       const course = await db
         .update(courses)
         .set({ status: "published" })
         .where(eq(courses.id, input.courseId));

        return course;
    }),
    rejectCourse: protectedProcedure
    .input(z.object({courseId:z.string()}))
    .mutation(async({input})=>{
       const course = await db
         .update(courses)
         .set({ status: "rejected" })
         .where(eq(courses.id, input.courseId));

        return course;
    })
})

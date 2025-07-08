import { db } from "@/db";
import { courses, lessons, user } from "@/db/schema";
import { COURSE_PER_PAGE, } from "@/lib/constants";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, eq, ilike } from "drizzle-orm";
import z from "zod";

export const CourseProcedure = createTRPCRouter({
  getMany: protectedProcedure
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
            eq(courses.status,"published")
          )
        )
        .limit(COURSE_PER_PAGE)
        .offset(input?.page ? (input.page - 1) * COURSE_PER_PAGE : 0);

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
            input?.category ? eq(courses.category, input.category) : undefined
          )
        );
     
        
      return {
        data,
        totalPage,
      };
    }),

  getOne: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [{ course, instructor }] = await db
        .select({
          course: courses,
          instructor: user, // assuming your instructor table is called `users`
        })
        .from(courses)
        .innerJoin(user, eq(courses.instructorId, user.id))
        .where(eq(courses.id, input.courseId));

      const lecture = await db
        .select()
        .from(lessons)
        .where(eq(lessons.courseId, input.courseId));

      return { course, instructor, lecture };
    }),

  getManyInstructor: protectedProcedure.query(async ({ ctx }) => {
    const data = await db
      .select()
      .from(courses)
      .where(eq(courses.instructorId, ctx.session.user.id));

    return data;
  }),

  create: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        title: z.string(),
        thumbnailUrl: z.string(),
        category: z.string(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        price: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Make sure 'instructorId' exists in your courses schema
      const [data] = await db
        .insert(courses)
        .values({
          ...input,
          instructorId: ctx.session.user.id,
        })
        .returning();

      return data;
    }),

    publish:protectedProcedure
    .input(z.object({courseId:z.string()}))
    .mutation(async({input})=>{
         const publishCourse= await db
         .update(courses)
         .set({status:"pending_approval"})
         .where(eq(courses.id,input.courseId))

         return publishCourse
    }),
  
});

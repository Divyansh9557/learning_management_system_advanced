import { db } from "@/db";
import { courses, lessons } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from "zod";

export const CourseProcedure = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(courses);

    return data;
  }),

  getOne: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await db
        .select({
          course: courses,
          lecture: lessons,
        })
        .from(courses)
        .innerJoin(lessons, eq(courses.id, lessons.courseId))
        .where(eq(courses.id, input.courseId));

        return data
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
});

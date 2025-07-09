import { db } from "@/db";
import {  courses, enrollments, lessons, payments, progressTracker, user } from "@/db/schema";
import { COURSE_PER_PAGE } from "@/lib/constants";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, count, eq, ilike, inArray } from "drizzle-orm";
import z from "zod";

import Stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { deleteFromCloudinary, deleteImageFromCloudinary } from "@/actions/uploadOnCloudinary";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil", // ✅ correct for SDK v13+
});

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
    .query(async ({ input, ctx }) => {
      const currentUserId = ctx.session.user.id;

      const data = await db
        .select({
          id: courses.id,
          title: courses.title,
          thumbnailUrl: courses.thumbnailUrl,
          instructorId: courses.instructorId,
          difficulty: courses.difficulty,
          category: courses.category,
          price: courses.price,
          status: courses.status,
          instructor: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          enrollment: {
            userId: enrollments.userId,
            courseId: enrollments.courseId,
            progress: enrollments.progress,
            completed: enrollments.completed,
            enrolledAt: enrollments.enrolledAt,
          },
        })
        .from(courses)
        .leftJoin(user, eq(courses.instructorId, user.id))
        .leftJoin(
          enrollments,
          and(
            eq(enrollments.courseId, courses.id),
            eq(enrollments.userId, currentUserId)
          )
        )
        .where(
          and(
            input?.search
              ? ilike(courses.title, `%${input.search}%`)
              : undefined,
            input?.level ? eq(courses.difficulty, input.level) : undefined,
            input?.category ? eq(courses.category, input.category) : undefined,
            eq(courses.status, "published")
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
    .query(async ({ input, ctx }) => {
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

      const lectureIds = lecture.map((curr) => curr.id);

      const progressData = await db
        .select()
        .from(progressTracker)
        .where(
          and(
            eq(progressTracker.userId, ctx.session.user.id),
            inArray(progressTracker.lessonId, lectureIds)
          )
        );
      const progressSet = new Set(progressData.map((curr) => curr.lessonId));

      const lectureWithProgress = lecture.map((curr) => ({
        ...curr,
        completed: progressSet.has(curr.id),
      }));

      const progress = Math.floor((progressData.length / lecture.length) * 100);

      return {
        course,
        instructor,
        lectureWithProgress,
        progress,
        lectureCompleted: progressData.length,
      };
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

  publish: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ input }) => {
      const publishCourse = await db
        .update(courses)
        .set({ status: "pending_approval" })
        .where(eq(courses.id, input.courseId));

      return publishCourse;
    }),
  purchase: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [product] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, input.courseId));
      if (!product) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "course not found",
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "inr",
              unit_amount: product.price * 100, // ₹ to paise
              product_data: {
                name: product.title,
                description: product.description,
                images: [product.thumbnailUrl], // Must be HTTPS
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.BETTER_AUTH_URL}/success?sessionId={CHECKOUT_SESSION_ID}&courseId=${product.id}`,
        cancel_url: `${process.env.BETTER_AUTH_URL}/cancel`,
      });

      await db.insert(payments).values({
        paymentId: session.id,
        courseId: product.id,
        userId: ctx.session.user.id,
        price: product.price.toString(),
      });

      return { sessionUrl: session.url };
    }),
  enrollToCourse: protectedProcedure
    .input(z.object({ sessionId: z.string(), courseId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      if (session.payment_status === "paid") {
        await db
          .update(payments)
          .set({ status: "success" })
          .where(
            and(
              eq(payments.courseId, input.courseId),
              eq(payments.userId, ctx.session.user.id)
            )
          );

        await db.insert(enrollments).values({
          userId: ctx.session.user.id,
          courseId: input.courseId,
        });
        return { message: "enrolled successfully" };
      } else {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "payment failed",
        });
      }
    }),
  getPurchasedCourses: protectedProcedure.query(async ({ ctx }) => {
    const purchasedCourses = await db
      .select({
        courses: {
          id: courses.id,
          title: courses.title,
          thumbnailUrl: courses.thumbnailUrl,
          description: courses.description,
          price: courses.price,
          difficulty: courses.difficulty,
          category: courses.category,
        },
        instructor: {
          name: user.name,
        },
        progress: enrollments.progress,
        completed: enrollments.completed,
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .innerJoin(user, eq(courses.instructorId, user.id))

      .where(eq(enrollments.userId, ctx.session.user.id));

    return purchasedCourses;
  }),
  getOneInstructor: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      console.log(input.courseId);
      const [course] = await db
        .select()
        .from(courses)
        .where(eq(courses.id, input.courseId));
      return course;
    }),
  updateCourse: protectedProcedure
    .input(
      z.object({
        description: z.string(),
        title: z.string(),
        thumbnailUrl: z.string(),
        category: z.string(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        price: z.number(),
        courseId:z.string()
    })
    )
    .mutation(async ({ input }) => {

      const [existingCourse] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, input.courseId))

      await deleteImageFromCloudinary(existingCourse.thumbnailUrl)
      
      const updatedData = await db
      .update(courses)
      .set({...input})
      .where(eq(courses.id,input.courseId))

      return updatedData
    }),
  delete:protectedProcedure
  .input(z.object({courseId:z.string()}))
  .mutation(async({input})=>{
      const lecture= await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId,input.courseId))

      lecture.forEach(async (lecture) => {
        await deleteFromCloudinary(lecture?.videoUrl || "" )
        await db.delete(progressTracker).where(eq(progressTracker.lessonId, lecture.id))
        await db.delete(lessons).where(eq(lessons.id, lecture.id));
      })
      await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.courseId, input.courseId));

       const [courseDetails]= await db.select().from(courses).where(eq(courses.id,input.courseId))
        await deleteImageFromCloudinary(courseDetails.thumbnailUrl)
      await db.delete(courses).where(eq(courses.id, input.courseId));

      return true 
    }),
    homePage: baseProcedure
    .query(async()=>{
      const course = await db
      .select({
        course:courses,
        instructor:user
      })
      .from(courses)
      .innerJoin(user,eq(courses.instructorId,user.id))
      .orderBy(courses.updatedAt)
      .limit(3)
      .where(eq(courses.status,"published"))

      return course
    })

});

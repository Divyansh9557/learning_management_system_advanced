import { deleteFromCloudinary } from "@/actions/uploadOnCloudinary";
import { db } from "@/db";
import { certificates, enrollments, lessons, progressTracker } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq, inArray } from "drizzle-orm";
import z from "zod";

export const lectureProcedure = createTRPCRouter({
  getOne:protectedProcedure
  .input(z.object({lectureId:z.string()}))
  .query(async({input})=>{
      const data = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id,input.lectureId));
      return data;
  }),
  get: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(lessons)
        .where(eq(lessons.courseId, input.courseId));
      return data;
    }),
  create: protectedProcedure
  .input(
    z.object({ courseId: z.string(), title: z.string() ,videoUrl:z.string(),duration:z.number()})
  )
  .mutation(async({input})=>{
   
      const [createdLecture] = await db
      .insert(lessons)
      .values({...input})
      .returning()
    
      return createdLecture
     
  }),
  update: protectedProcedure
  .input(
    z.object({ lectureId: z.string(), title: z.string() ,videoUrl:z.string(),duration:z.number()})
  )
  .mutation(async({input})=>{
      const {duration,lectureId,title,videoUrl}= input

     const [existingLecture]= await db
     .select()
     .from(lessons)
     .where(eq(lessons.id,lectureId))
     
     await deleteFromCloudinary(existingLecture.videoUrl!)

      const [createdLecture] = await db
      .update(lessons)
      .set({duration,title,videoUrl})
      .where(eq(lessons.id,lectureId))
      .returning()
    
      return createdLecture
     
  }),
  delete:protectedProcedure
  .input(z.object({lectureId:z.string()}))
  .mutation(async({input})=>{
        
   const [existingLecture]= await db
   .select()
   .from(lessons)
   .where(eq(lessons.id,input.lectureId))

   if(!existingLecture){
    throw new Error("Lecture not found")
   }
   

   await deleteFromCloudinary(existingLecture.videoUrl!)
  
    await db
   .delete(lessons)
   .where(eq(lessons.id,input.lectureId))
   .returning()

   return  true

  }),
  markAsComplete:protectedProcedure
  .input(z.object({lectureId:z.string(),courseId:z.string()}))
  .mutation(async({input,ctx})=>{
    const [existingLecture]= await db
    .select()
    .from(lessons)
    .where(eq(lessons.id,input.lectureId))
    
    if(!existingLecture){
      throw new Error("Lecture not found")
    }

    const [existProgress] = await db
    .select()
    .from(progressTracker)
    .where(
      and(
        eq(progressTracker.lessonId,input.lectureId),
        eq(progressTracker.userId,ctx.session.user.id)
      )
    )
    if(existProgress){
      return existProgress
    }

    const data=await db
    .insert(progressTracker)
    .values({
      lessonId:input.lectureId,
      userId:ctx.session.user.id,
      status:"completed"
    })

    // total lecture for progress
    const totalLecture = await db
      .select()
      .from(lessons)
      .where(eq(lessons.courseId, input.courseId));
      
   // completed lecture

    const lectureIds= totalLecture.map((curr)=> curr.id )

    const completedLecture = await db
    .select()
    .from(progressTracker)
    .where(
      and(
        inArray(progressTracker.lessonId,lectureIds),
        eq(progressTracker.userId,ctx.session.user.id)
      )
    )

    const progressPercentage = Math.ceil((completedLecture.length / totalLecture.length)*100);

    if(progressPercentage===100){
     const [enroll]= await db 
      .select()
      .from(certificates )
      .where(
        and(
          eq(certificates.courseId,input.courseId),
          eq(certificates.userId,ctx.session.user.id),
        )
      )
      if(!enroll){
        const url = Math.ceil(Math.random()*1000000)
        await db
        .insert(certificates)
        .values({
          courseId:input.courseId,
          userId:ctx.session.user.id,
          certificateUrl:url.toString()
        })
      }
    }
    
     
      await db
       .update(enrollments)
       .set({
        progress:progressPercentage.toString()
       })
       .where(
        and(
          eq(enrollments.courseId,input.courseId),
          eq(enrollments.userId,ctx.session.user.id)
        )
       )
     
   
    return data
  
  })
});
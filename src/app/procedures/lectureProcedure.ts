import { deleteFromCloudinary } from "@/actions/uploadOnCloudinary";
import { db } from "@/db";
import { lessons } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
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

  })
});
import { db } from "@/db";
import { lessons } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from "zod";

export const lectureProcedure = createTRPCRouter({
   get:protectedProcedure
   .input(z.object({courseId:z.string()}))
   .mutation(async({input})=>{
    
    const data= await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId,input.courseId));
    return data;
   })
});
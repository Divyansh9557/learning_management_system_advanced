import { db } from "@/db";
import { courses } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";


export const CourseProcedure = createTRPCRouter({
    getMany: protectedProcedure
    .query(async()=>{
         const data=  await db
         .select()
         .from(courses)

         return data
    }),
    
    create:protectedProcedure
    .input(z.object({
        description: z.string(),
        title: z.string(),
        thumbnailUrl: z.string(),
        category: z.string(),
        difficulty: z.enum(["beginner", "intermediate", "advanced"])
    }))
    .mutation(async ({ input, ctx }) => {
        // Make sure 'instructorId' exists in your courses schema
        const [data]=await db.insert(courses).values({
            ...input,
            instructorId: ctx.session.user.id
        })
        .returning()
        
        return data
    })
   
});
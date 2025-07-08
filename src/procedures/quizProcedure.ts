import { db } from "@/db";
import { quizzes, quizzesAttempted } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and,  eq, isNotNull, sql } from "drizzle-orm";
import z from "zod";

export const quizProcedure = createTRPCRouter({
   create:protectedProcedure
   .input(z.object({
     timeLimit:z.number(),
     title:z.string(),
     description:z.string(),
     questions:z.string()
}
)).mutation(async({ctx,input})=>{
    const {description,questions,timeLimit,title}=input
    const createdQuiz = await db
    .insert(quizzes)
    .values({description,questions,timeLimit,title,creater:ctx.session.user.id})

    return createdQuiz
}),
getMany:protectedProcedure.query(async({ctx})=>{
const result = await db
  .select({
    id: quizzes.id,
    title: quizzes.title,
    description: quizzes.description,
    timeLimit: quizzes.timeLimit,
    questions: quizzes.questions,
    attempted: isNotNull(quizzesAttempted.userId).as("attempted"),
    totalAttempts: sql<number>`(
      SELECT COUNT(*) 
      FROM ${quizzesAttempted} AS qa 
      WHERE qa.quiz_id = ${quizzes.id}
    )`.as("totalAttempts"),
  })
  .from(quizzes)
  .leftJoin(
    quizzesAttempted,
    and(
      eq(quizzesAttempted.quizId, quizzes.id),
      eq(quizzesAttempted.userId, ctx.session.user.id)
    )
  );


  result.forEach((quiz)=>{
    
        quiz.questions = JSON.parse(quiz.questions || "" );
    });
    

    return result
}),
getOne:protectedProcedure
.input(z.object({quizId:z.string()}))
.query(async({input})=>{
    const [quiz] = await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.id,input.quizId))

       
             quiz.questions = JSON.parse(quiz.questions || "" );
   

    return quiz
}),
attemptQuiz:protectedProcedure
.input(z.object({quizId:z.string()}))
.mutation(async({input,ctx})=>{
    
    const [existedQuiz] = await db
    .select()
    .from(quizzesAttempted)
    .where(
        and(
            eq(quizzesAttempted.quizId,input.quizId),
            eq(quizzesAttempted.userId,ctx.session.user.id)
        ),
        )

        if(existedQuiz?.id){
            return existedQuiz
        }

        
             await db
            .insert(quizzesAttempted)
            .values({
                quizId:input.quizId,
                userId:ctx.session.user.id,
            })
   

    return true
}),


});
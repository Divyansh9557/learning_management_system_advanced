
import { lectureProcedure } from '@/app/procedures/lectureProcedure';
import {  createTRPCRouter } from '../init';
import { CourseProcedure } from '@/app/procedures/courseProcedure'; 
import { quizProcedure } from '@/app/procedures/quizProcedure';
import { adminProcedure } from '@/app/procedures/adminProcedurre';
export const appRouter = createTRPCRouter({
   course:CourseProcedure,
   lecture:lectureProcedure,
   quiz:quizProcedure,
   admin:adminProcedure,
});
// export type definition of API
export type AppRouter = typeof appRouter;
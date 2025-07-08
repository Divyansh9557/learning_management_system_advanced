
import { lectureProcedure } from '@/procedures/lectureProcedure';
import {  createTRPCRouter } from '../init';
import { CourseProcedure } from '@/procedures/courseProcedure'; 
import { quizProcedure } from '@/procedures/quizProcedure';
import { adminProcedure } from '@/procedures/adminProcedurre';
export const appRouter = createTRPCRouter({
   course:CourseProcedure,
   lecture:lectureProcedure,
   quiz:quizProcedure,
   admin:adminProcedure,
});
// export type definition of API
export type AppRouter = typeof appRouter;
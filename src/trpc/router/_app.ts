
import { lectureProcedure } from '@/app/procedures/lectureProcedure';
import {  createTRPCRouter } from '../init';
import { CourseProcedure } from '@/app/procedures/courseProcedure'; 
export const appRouter = createTRPCRouter({
   course:CourseProcedure,
   lecture:lectureProcedure,
});
// export type definition of API
export type AppRouter = typeof appRouter;
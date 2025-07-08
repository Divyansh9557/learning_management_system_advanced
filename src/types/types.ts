import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/router/_app"; 

export type CourseGetMany= inferRouterOutputs<AppRouter>["course"]["getMany"]
export type purchasedCourseGetMany= inferRouterOutputs<AppRouter>["course"]["getPurchasedCourses"]


export type courseGetOne= inferRouterOutputs<AppRouter>["course"]["getOne"]
export type userGetOne= inferRouterOutputs<AppRouter>["admin"]["getUser"]
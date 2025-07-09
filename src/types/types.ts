import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/router/_app"; 

export type purchasedCourseGetMany= inferRouterOutputs<AppRouter>["course"]["getPurchasedCourses"]
export type CourseGetMany= inferRouterOutputs<AppRouter>["course"]["getMany"]
export type AdminGetMany= inferRouterOutputs<AppRouter>["admin"]["getManyCourse"]


export type courseGetOne= inferRouterOutputs<AppRouter>["course"]["getOne"]
export type courseGetOneInstructor= inferRouterOutputs<AppRouter>["course"]["getOneInstructor"]
export type userGetOne= inferRouterOutputs<AppRouter>["admin"]["getUser"]
export type adminDashboardCourse= inferRouterOutputs<AppRouter>["dashboard"]["getAdmin"]
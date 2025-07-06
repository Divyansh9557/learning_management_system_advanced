import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/router/_app"; 

export type CourseGetMany= inferRouterOutputs<AppRouter>["course"]["getMany"]
import { AppRouter } from "@/trpc/router/_app"; 
import { inferRouterOutputs } from "@trpc/server";

export type LectureTypes = inferRouterOutputs<AppRouter>["lecture"]["get"];
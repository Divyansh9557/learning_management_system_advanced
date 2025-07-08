import { betterAuth,  } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

 
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
  emailAndPassword: {
    enabled: true,
  },
     socialProviders:{
      google: { 
            clientId: process.env.GOOGLE_CLIENT_ID! as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string, 
      }, 
       github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 

     },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required:false
      },
      enrolledCourses:{
        type:"string[]",
        required:false
      }
    },
  },
   plugins: [
        customSession(async ({ user, session }) => {
            const roles = await db
              .select({ role: schema.user.role })
              .from(schema.user)
              .where(eq(schema.user.id, session.userId));

              const enrolledCourses = await db
              .select({courseId:schema.enrollments.courseId})
              .from(schema.enrollments)
              .where(eq(schema.enrollments.userId, session.userId));

            return {
                roles,
                enrolledCourses:enrolledCourses.map(e => e.courseId ),
                user: {
                    ...user,
                    newField: "newField",
                },
                session
            };
        }),
    ],
  
},);
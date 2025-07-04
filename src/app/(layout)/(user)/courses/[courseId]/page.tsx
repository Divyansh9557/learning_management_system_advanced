import { auth } from "@/lib/auth";
import CourseIdPage from "@/modules/User/Course/CourseIdPage"
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const page = async() => {
   const session = await auth.api.getSession({
      headers:await headers()
    })
  
   const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );

    console.log(session?.roles[0].role)

  if (!session?.user || !allowedRoles  ) {
    redirect('/sign-in')
  }
  return (
    <CourseIdPage/>
  )
}

export default page
import { auth } from "@/lib/auth";
import CourseModeration from "@/modules/Admin/CourseModeration/CourseModeration"
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const page = async() => {
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin"].some((item)=> item===session?.roles[0].role );
    
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }
  return (
    <CourseModeration/>
  )
}

export default page
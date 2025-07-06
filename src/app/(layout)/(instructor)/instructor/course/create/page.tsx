import { auth } from "@/lib/auth";
import CourseCreate from "@/modules/Instructor/CourseCreate/CourseCreate";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const page = async() => {
   const session = await auth.api.getSession({
        headers:await headers()
      })
    
      const allowedRoles = [ "admin", "instructor"].some((item)=> item===session?.roles[0].role );
  
   
    if (!session?.user || !allowedRoles  ) {
      redirect('/sign-in')
    }
  return <CourseCreate />;
}

export default page
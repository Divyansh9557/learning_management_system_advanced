import { auth } from "@/lib/auth";
import InstructorDashboard from "@/modules/Instructor/ui/Dashboard/InstructorDashboard"
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
  return (
    <InstructorDashboard/>
  )
}

export default page
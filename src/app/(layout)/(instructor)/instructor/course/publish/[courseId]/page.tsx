import { auth } from "@/lib/auth";
import PublishPage from "@/modules/Instructor/Publish/PublishPage"
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
    <PublishPage/>
  )
}

export default page
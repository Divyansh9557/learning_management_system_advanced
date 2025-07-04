import { auth } from "@/lib/auth";
import UserManagement from "@/modules/Admin/UserManagement/UserManagement"
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
    <UserManagement/>
  )
}

export default page
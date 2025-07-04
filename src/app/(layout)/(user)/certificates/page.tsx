import { auth } from "@/lib/auth";
import CertificatePage from "@/modules/User/Certificate/CertificatePage"
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
    <CertificatePage/>
  )
}

export default page
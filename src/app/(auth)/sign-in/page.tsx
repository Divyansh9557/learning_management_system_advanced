import { auth } from "@/lib/auth"
import SignIn from "@/modules/Auth/SignIn"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


const page = async() => {

   const session = await auth.api.getSession({
      headers: await headers()
    })
  
    if(session?.user){
      redirect('/')
    }

  return (
    <SignIn/>
  )
}

export default page
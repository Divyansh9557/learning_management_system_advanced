import { auth } from "@/lib/auth"
import SignUp from "@/modules/Auth/SignUp"
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
    <SignUp/>
  )
}

export default page
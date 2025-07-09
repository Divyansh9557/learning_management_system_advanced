import { auth } from "@/lib/auth"
import StudentDashboardSkeleton from "@/modules/User/Dashboard/StudentSkeletonDashboard"
import UserDashboard from "@/modules/User/Dashboard/UserDashboard"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"


const page = async() => {

  const session = await auth.api.getSession({
    headers:await headers()
  })

  const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );


  if (!session?.user || !allowedRoles  ) {
    redirect('/sign-in')
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.dashboard.getUser.queryOptions()
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
  <Suspense fallback={<StudentDashboardSkeleton/>} >

    <UserDashboard/>
  </Suspense>
    </HydrationBoundary>
  )
}

export default page
import { loadSearchParams } from "@/hooks/loadSearchParams";
import { auth } from "@/lib/auth";
import UserManagement from "@/modules/Admin/UserManagement/UserManagement"
import { UserTableSkeleton } from "@/modules/Admin/UserManagement/UserManagementSkeleton";
import { AdminUserSeach } from "@/modules/Admin/UserManagement/UserSearch";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>
}

const page = async({searchParams}:PageProps) => {
    const { page, search } = await loadSearchParams(searchParams)
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin"].some((item)=> item===session?.roles[0].role );
    
       
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }

      const queryClient = getQueryClient()
      void queryClient.prefetchQuery(
        trpc.admin.getUser.queryOptions({page,search})
      )

  return (<>
   <AdminUserSeach/>
    <HydrationBoundary state={dehydrate(queryClient)} >
     <Suspense fallback={<UserTableSkeleton/>} >
      <UserManagement/>

     </Suspense>
    </HydrationBoundary>
    
  </>
  )
}

export default page
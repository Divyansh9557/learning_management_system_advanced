import { loadSearchParams } from "@/hooks/loadSearchParams";
import { auth } from "@/lib/auth";
import BrowsePage from "@/modules/User/Browse/Browsepage"
import BrowsePageHeader from "@/modules/User/Browse/BrowsePageHeader";
import CourseCardSkeleton from "@/modules/User/Browse/BrowsePageSkeleton";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>
}

const page = async({ searchParams }: PageProps) => {
    const {category,page,search} = await loadSearchParams(searchParams)

    const session = await auth.api.getSession({
         headers:await headers()
       })
     
       const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );
   
    
   
     if (!session?.user || !allowedRoles  ) {
       redirect('/sign-in')
     }
     

     const queryClient = getQueryClient()
     void queryClient.prefetchQuery(
      trpc.course.getMany.queryOptions({page,category,search }))
  return (<>
  <BrowsePageHeader/>
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<CourseCardSkeleton/>} >

      <BrowsePage />
      </Suspense>
    </HydrationBoundary>
   
  </>
  )
}

export default page
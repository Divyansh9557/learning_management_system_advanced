import { auth } from '@/lib/auth';
import AdminDashboard from '@/modules/Admin/Dashboard/AdminDashboard'
import StudentDashboardSkeleton from '@/modules/User/Dashboard/StudentSkeletonDashboard';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

const page = async() => {
   const session = await auth.api.getSession({
          headers:await headers()
        })
      
        const allowedRoles = [ "admin"].some((item)=> item===session?.roles[0].role );
    
    
      if (!session?.user || !allowedRoles  ) {
        redirect('/sign-in')
      }
      
        const queryClient = getQueryClient()
        void queryClient.prefetchQuery(
          trpc.dashboard.getAdmin.queryOptions()
        )
      
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
    <Suspense fallback={<StudentDashboardSkeleton/>} >

    <AdminDashboard/>
    </Suspense>
    </HydrationBoundary>
  )
}

export default page
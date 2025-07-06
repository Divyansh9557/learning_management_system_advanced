import { auth } from '@/lib/auth';
import QuizesPage from '@/modules/User/Quizes/QuizesPage'
import QuizzesSkeleton from '@/modules/User/Quizes/QuizesSkeleton';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

const page = async() => {
   const session = await auth.api.getSession({
      headers:await headers()
    })
  
    const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
      trpc.quiz.getMany.queryOptions()
    )

  if (!session?.user || !allowedRoles  ) {
    redirect('/sign-in')
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<QuizzesSkeleton/>} >

      <QuizesPage/>
      </Suspense>

    </HydrationBoundary>
  )
}

export default page
import { auth } from '@/lib/auth';
import QuizIdPage from '@/modules/User/Quizes/QuizIdPage'
import QuizTakerSkeleton from '@/modules/User/Quizes/QuizTakenSkeleton';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

interface Props{
  params:Promise<{quizId:string}>
}

const page = async({params}:Props) => {

  const {quizId} = await params

   const session = await auth.api.getSession({
        headers:await headers()
      })
    
      const allowedRoles = ["student", "admin", "instructor"].some((item)=> item===session?.roles[0].role );
  
  
    if (!session?.user || !allowedRoles  ) {
      redirect('/sign-in')
    }

    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
      trpc.quiz.getOne.queryOptions({quizId})
    )

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<QuizTakerSkeleton/>} >

      <QuizIdPage/>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page
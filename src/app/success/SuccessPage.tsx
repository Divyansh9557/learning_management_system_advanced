'use client';

import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Loader2 } from 'lucide-react';
import {  useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {


    
    const searchParams = useSearchParams();
const sessionId = searchParams.get('sessionId') || "" ;
const courseId = searchParams.get('courseId') || "";
    const router = useRouter()
    const queryClinet = useQueryClient()
    const trpc = useTRPC()
    const {mutate} = useMutation(
        trpc.course.enrollToCourse.mutationOptions({
            onSuccess:async()=>{
               await queryClinet.invalidateQueries(
                trpc.course.getMany.queryOptions()
               )
                router.push(`/courses/${courseId}`)
        }
    })
)

useEffect(()=>{
    console.log(courseId, sessionId);
    mutate({courseId,sessionId})
},[courseId,sessionId,mutate])

return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white px-4">
      <div className="bg-zinc-900 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-zinc-700">
        <CheckCircle className="mx-auto text-green-500 h-14 w-14" strokeWidth={1.5} />
        <h1 className="text-2xl font-bold mt-4">Payment Successful</h1>
        <p className="text-zinc-400 mt-2">Thank you for your purchase!</p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Performing background tasks... you’ll be redirected soon
        </div>
      </div>
    </main>
  );
}

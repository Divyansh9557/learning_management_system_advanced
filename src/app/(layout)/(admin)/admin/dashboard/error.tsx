'use client';

import ErrorState from "@/components/ErrorState";


const error = () => {
  return (
     <ErrorState description="failed to load admin dashboard" />
  )
}

export default error
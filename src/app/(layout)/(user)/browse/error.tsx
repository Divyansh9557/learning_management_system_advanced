'use client'

import ErrorState from "@/components/ErrorState"


const error = () => {
  return <ErrorState description="Something went wrong" />;
}

export default error
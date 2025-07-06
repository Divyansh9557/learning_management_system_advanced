'use client'

import ErrorState from "@/components/ErrorState"

const error = () => {
  return <ErrorState description="Lecture not found" />;
}

export default error
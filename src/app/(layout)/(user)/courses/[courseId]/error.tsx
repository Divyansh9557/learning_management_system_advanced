'use client'
import ErrorState from "@/components/ErrorState"

const error = () => {
  return <ErrorState description="Error loading course" />;
}

export default error
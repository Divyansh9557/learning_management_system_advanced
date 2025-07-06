'use client'

import ErrorState from "@/components/ErrorState"

const error = () => {
  return (
    <ErrorState description="course not found" />
  )
}

export default error
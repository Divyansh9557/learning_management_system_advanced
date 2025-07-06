'use client'
import ErrorState from "@/components/ErrorState"

const error = () => {
  return (
    <ErrorState description="failed to load quizzes" />
  )
}

export default error
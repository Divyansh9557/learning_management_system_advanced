"use client"

import ErrorState from "@/components/ErrorState"

const error = () => {
  return <ErrorState description="failed to load course moderation page" />;
}

export default error
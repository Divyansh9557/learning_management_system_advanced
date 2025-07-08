"use client"

import ErrorState from "@/components/ErrorState"

const error = () => {
  return <ErrorState description="error while loading page" />;
}

export default error
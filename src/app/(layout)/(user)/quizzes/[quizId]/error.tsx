'use client'

import ErrorState from '@/components/ErrorState'
import React from 'react'

const error = () => {
  return (
    <ErrorState description='Failed to load quiz' />
  )
}

export default error
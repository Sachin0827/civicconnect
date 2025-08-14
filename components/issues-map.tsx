'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { mockIssues, type MockIssue } from '@/lib/mock-data'

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
})

interface IssuesMapProps {
  centerLat?: number
  centerLng?: number
  zoom?: number
}

export function IssuesMap({ centerLat = 12.9716, centerLng = 77.5946, zoom = 12 }: IssuesMapProps) {
  const [issues, setIssues] = useState<MockIssue[]>(mockIssues)
  const [loading, setLoading] = useState(false) // No loading for demo

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <DynamicMap
        issues={issues}
        centerLat={centerLat}
        centerLng={centerLng}
        zoom={zoom}
      />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { IssuesFeed } from '@/components/issues-feed'
import { IssuesMap } from '@/components/issues-map'
import { ReportIssueDialog } from '@/components/report-issue-dialog'

export default function Home() {
  const [currentView, setCurrentView] = useState<'feed' | 'map'>('feed')
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 }) // Default to Bangalore

  const handleLocationClick = (lat: number, lng: number) => {
    setMapCenter({ lat, lng })
    setCurrentView('map')
  }

  const handleIssueCreated = () => {
    // In demo mode, we'll just close the dialog
    setShowReportDialog(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onReportClick={() => setShowReportDialog(true)}
      />
      
      <main className="pb-4 sm:p-4">
        {currentView === 'feed' ? (
          <IssuesFeed onLocationClick={handleLocationClick} />
        ) : (
          <div className="h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] mx-3 sm:mx-0 rounded-lg sm:rounded-xl overflow-hidden">
            <IssuesMap
              centerLat={mapCenter.lat}
              centerLng={mapCenter.lng}
              zoom={13}
            />
          </div>
        )}
      </main>

      <ReportIssueDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        onIssueCreated={handleIssueCreated}
      />
    </div>
  )
}

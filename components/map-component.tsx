'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Calendar, User } from 'lucide-react'
import { formatRelativeTime, getStatusColor, getCategoryIcon } from '@/lib/utils'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom marker icons based on status
const createCustomIcon = (status: string, category: string) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return '#ef4444'
      case 'IN_PROGRESS': return '#f59e0b'
      case 'RESOLVED': return '#10b981'
      default: return '#6b7280'
    }
  }

  const color = getStatusColor(status)
  const emoji = getCategoryIcon(category)

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

import { type MockIssue } from '@/lib/mock-data'

interface MapComponentProps {
  issues: MockIssue[]
  centerLat: number
  centerLng: number
  zoom: number
}

export default function MapComponent({ issues, centerLat, centerLng, zoom }: MapComponentProps) {
  const [map, setMap] = useState<L.Map | null>(null)

  const handleVote = async (issueId: string) => {
    // Demo vote functionality
    alert(`Voted on issue ${issueId} - This is a demo!`)
  }

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.latitude, issue.longitude]}
          icon={createCustomIcon(issue.status, issue.category)}
        >
          <Popup maxWidth={300} className="custom-popup">
            <div className="p-2 max-w-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <Badge className={getStatusColor(issue.status)}>
                  {issue.status.replace('_', ' ')}
                </Badge>
                <span className="text-sm text-gray-500">
                  {getCategoryIcon(issue.category)} {issue.category.toLowerCase().replace('_', ' ')}
                </span>
              </div>

              {/* Title and Description */}
              <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {issue.description}
              </p>

              {/* Image */}
              {issue.imageUrl && (
                <div className="mb-2">
                  <img
                    src={issue.imageUrl}
                    alt="Issue"
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              )}

              {/* Author and Date */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {issue.author.name || 'Anonymous'}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatRelativeTime(new Date(issue.createdAt))}
                </div>
              </div>

              {/* Address */}
              {issue.address && (
                <p className="text-xs text-gray-500 mb-2">📍 {issue.address}</p>
              )}

              {/* Vote Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleVote(issue.id)}
                  className={`vote-btn ${issue.hasUserVoted ? 'voted' : ''} !text-xs !h-8 !px-3 !py-1`}
                  style={{ fontSize: '12px', padding: '4px 12px', minHeight: '32px' }}
                >
                  <Heart className={`w-3 h-3 heart-icon ${issue.hasUserVoted ? 'liked' : ''}`} />
                  <span className="vote-count text-xs">
                    {issue.voteCount}
                  </span>
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

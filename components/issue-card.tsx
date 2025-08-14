'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, MapPin, Calendar } from 'lucide-react'
import { formatRelativeTime, getStatusColor, getCategoryIcon } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

import { type MockIssue } from '@/lib/mock-data'

interface IssueCardProps {
  issue: MockIssue
  onVote?: (issueId: string) => void
  onLocationClick?: (lat: number, lng: number) => void
  isAdmin?: boolean
  onStatusChange?: (issueId: string, status: string) => void
}

export function IssueCard({ 
  issue, 
  onVote, 
  onLocationClick, 
  isAdmin, 
  onStatusChange 
}: IssueCardProps) {
  const [voting, setVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(issue.hasUserVoted)
  const [voteCount, setVoteCount] = useState(issue.voteCount)
  const [justVoted, setJustVoted] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const { toast } = useToast()

  const handleVote = async (e: React.MouseEvent) => {
    if (!onVote || voting) return
    
    setVoting(true)
    setJustVoted(true)
    setShowParticles(true)
    
    // Create ripple effect
    const button = e.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top = `${e.clientY - rect.top}px`
    button.appendChild(ripple)
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600)
    
    // Simulate voting for demo
    setTimeout(() => {
      const newVoted = !hasVoted
      setHasVoted(newVoted)
      setVoteCount(newVoted ? voteCount + 1 : voteCount - 1)
      onVote(issue.id)
      setVoting(false)
      
      // Reset animation state after animation completes
      setTimeout(() => {
        setJustVoted(false)
        setShowParticles(false)
      }, 1000)
    }, 500)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!onStatusChange) return
    
    onStatusChange(issue.id, newStatus)
    toast({
      title: "Status Updated (Demo)",
      description: `Issue status changed to ${newStatus.toLowerCase().replace('_', ' ')}.`,
    })
  }

  return (
    <Card className="mb-4 sm:mb-6 issue-card glass-card animate-fade-in-up mx-3 sm:mx-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
              <AvatarImage src={issue.author.image || ''} alt={issue.author.name || ''} />
              <AvatarFallback className="text-sm">{issue.author.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-base font-medium truncate">{issue.author.name || 'Anonymous'}</p>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{formatRelativeTime(new Date(issue.createdAt))}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            <Badge className={getStatusColor(issue.status) + " text-xs"}>
              {issue.status.replace('_', ' ')}
            </Badge>
            {isAdmin && (
              <select
                value={issue.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="text-xs border rounded px-2 py-1 touch-manipulation"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{getCategoryIcon(issue.category)}</span>
          <span className="text-sm text-gray-600 capitalize">
            {issue.category.toLowerCase().replace('_', ' ')}
          </span>
        </div>

        <h3 className="font-semibold text-lg sm:text-xl mb-2 leading-tight">{issue.title}</h3>
        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{issue.description}</p>

        {issue.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              src={issue.imageUrl}
              alt="Issue"
              className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        {issue.address && (
          <div className="flex items-start text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <button
              onClick={() => onLocationClick?.(issue.latitude, issue.longitude)}
              className="text-blue-600 hover:underline touch-manipulation text-left"
            >
              {issue.address}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleVote}
            disabled={voting || !onVote}
            className={`vote-btn ${hasVoted ? 'voted' : ''} ${voting ? 'opacity-75' : ''} touch-manipulation flex-shrink-0`}
          >
            {showParticles && (
              <>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
              </>
            )}
            <Heart className={`w-5 h-5 sm:w-6 sm:h-6 heart-icon ${hasVoted ? 'liked' : ''} ${justVoted ? 'clicked' : ''}`} />
            <span className={`vote-count ${justVoted ? 'animate' : ''} text-sm sm:text-base`}>
              {voteCount}
            </span>
          </button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLocationClick?.(issue.latitude, issue.longitude)}
            className="btn-animate touch-manipulation h-10 sm:h-9 px-3 sm:px-4 flex-1 sm:flex-initial justify-center sm:justify-start"
          >
            <MapPin className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">View on Map</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

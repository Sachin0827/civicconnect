'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IssueCard } from './issue-card'
import { Loader2, Search, Filter } from 'lucide-react'
import { mockIssues, mockUser, type MockIssue } from '@/lib/mock-data'

// Using MockIssue type from mock-data

interface IssuesFeedProps {
  onLocationClick?: (lat: number, lng: number) => void
}

const categories = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
  { value: 'SAFETY', label: 'Safety' },
  { value: 'ENVIRONMENT', label: 'Environment' },
  { value: 'TRANSPORTATION', label: 'Transportation' },
  { value: 'PUBLIC_SERVICES', label: 'Public Services' },
  { value: 'COMMUNITY', label: 'Community' },
  { value: 'OTHER', label: 'Other' },
]

const statuses = [
  { value: 'ALL', label: 'All Status' },
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
]

export function IssuesFeed({ onLocationClick }: IssuesFeedProps) {
  const [issues, setIssues] = useState<MockIssue[]>(mockIssues)
  const [loading, setLoading] = useState(false) // No loading for demo
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [showFilters, setShowFilters] = useState(false)

  const handleVote = useCallback((issueId: string) => {
    // Mock vote toggle for demo
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          hasUserVoted: !issue.hasUserVoted,
          voteCount: issue.hasUserVoted ? issue.voteCount - 1 : issue.voteCount + 1
        }
      }
      return issue
    }))
  }, [])

  const handleStatusChange = useCallback((issueId: string, newStatus: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: newStatus as MockIssue['status'] }
        : issue
    ))
  }, [])

  // Filter issues based on category and status
  let filteredIssues = issues.filter(issue => {
    const matchesCategory = selectedCategory === 'ALL' || issue.category === selectedCategory
    const matchesStatus = selectedStatus === 'ALL' || issue.status === selectedStatus
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const isAdmin = false // Demo user is not admin

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-0">
      {/* Search and Filters */}
      <div className="glass-card p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in">
        <div className="space-y-3 sm:space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 sm:py-3 text-base sm:text-sm border-none bg-white/20 backdrop-blur-sm focus:bg-white/30 transition-all duration-300 rounded-xl h-12 sm:h-auto touch-manipulation"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="btn-animate bg-white/10 border-white/20 hover:bg-white/20 h-10 sm:h-9 px-4 touch-manipulation"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <span className="text-sm text-gray-600 font-medium">
              {filteredIssues.length} issue{filteredIssues.length !== 1 ? 's' : ''}
            </span>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              <div>
                <label className="text-sm font-semibold mb-2 block text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-none rounded-xl px-4 py-3 sm:py-3 text-base sm:text-sm bg-white/30 backdrop-blur-sm focus:bg-white/40 transition-all duration-300 h-12 sm:h-auto touch-manipulation"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-semibold mb-2 block text-gray-700">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border-none rounded-xl px-4 py-3 sm:py-3 text-base sm:text-sm bg-white/30 backdrop-blur-sm focus:bg-white/40 transition-all duration-300 h-12 sm:h-auto touch-manipulation"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Issues List */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchTerm || selectedCategory !== 'ALL' || selectedStatus !== 'ALL' 
              ? 'No issues match your search criteria.' 
              : 'No issues reported yet.'}
          </div>
          {(!searchTerm && selectedCategory === 'ALL' && selectedStatus === 'ALL') && (
            <p className="text-sm text-gray-400">
              Be the first to report an issue in your community!
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.map((issue, index) => (
            <div key={issue.id} className="stagger-item">
              <IssueCard
                issue={issue}
                onVote={handleVote}
                onLocationClick={onLocationClick}
                isAdmin={isAdmin}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

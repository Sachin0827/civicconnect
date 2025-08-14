'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, ArrowLeft, BarChart3, Users, AlertCircle, CheckCircle } from 'lucide-react'
import { getStatusColor, getCategoryIcon, formatRelativeTime } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

interface Issue {
  id: string
  title: string
  description: string
  category: string
  status: string
  latitude: number
  longitude: number
  address?: string
  imageUrl?: string
  createdAt: string
  author: {
    id: string
    name?: string
    image?: string
  }
  hasUserVoted: boolean
  voteCount: number
}

interface Stats {
  totalIssues: number
  openIssues: number
  inProgressIssues: number
  resolvedIssues: number
  totalUsers: number
}

export default function AdminPanel() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') {
      router.push('/')
      return
    }

    fetchData()
  }, [session, router])

  const fetchData = async () => {
    try {
      const [issuesResponse, statsResponse] = await Promise.all([
        fetch('/api/issues'),
        fetch('/api/admin/stats')
      ])

      if (issuesResponse.ok) {
        const issuesData = await issuesResponse.json()
        setIssues(issuesData)
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (issueId: string, newStatus: string) => {
    setUpdatingStatus(issueId)
    try {
      const response = await fetch(`/api/issues/${issueId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      setIssues(prev => prev.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: newStatus }
          : issue
      ))

      // Update stats
      if (stats) {
        setStats(prev => {
          if (!prev) return prev
          
          // Recalculate stats based on new status
          const updatedIssues = issues.map(issue => 
            issue.id === issueId ? { ...issue, status: newStatus } : issue
          )
          
          return {
            ...prev,
            openIssues: updatedIssues.filter(i => i.status === 'OPEN').length,
            inProgressIssues: updatedIssues.filter(i => i.status === 'IN_PROGRESS').length,
            resolvedIssues: updatedIssues.filter(i => i.status === 'RESOLVED').length,
          }
        })
      }

      toast({
        title: "Status Updated",
        description: `Issue status changed to ${newStatus.toLowerCase().replace('_', ' ')}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdatingStatus(null)
    }
  }

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
            <Button onClick={() => router.push('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage community issues and track platform statistics</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Issues</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.openIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Loader2 className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inProgressIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.resolvedIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Issues Management */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No issues to manage.</p>
              ) : (
                issues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getCategoryIcon(issue.category)}</span>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {issue.category.toLowerCase().replace('_', ' ')}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{issue.title}</h3>
                        <p className="text-gray-600 mb-2">{issue.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {issue.author.name || 'Anonymous'}</span>
                          <span>{formatRelativeTime(new Date(issue.createdAt))}</span>
                          <span>{issue.voteCount} votes</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <select
                          value={issue.status}
                          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                          disabled={updatingStatus === issue.id}
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                        >
                          <option value="OPEN">Open</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                        {updatingStatus === issue.id && (
                          <Loader2 className="h-4 w-4 animate-spin mt-2" />
                        )}
                      </div>
                    </div>

                    {issue.imageUrl && (
                      <div className="mb-3">
                        <img
                          src={issue.imageUrl}
                          alt="Issue"
                          className="w-32 h-24 object-cover rounded"
                        />
                      </div>
                    )}

                    {issue.address && (
                      <p className="text-sm text-gray-500">📍 {issue.address}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

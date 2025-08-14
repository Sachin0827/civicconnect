import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get statistics
    const [
      totalIssues,
      openIssues,
      inProgressIssues,
      resolvedIssues,
      totalUsers,
    ] = await Promise.all([
      db.issue.count(),
      db.issue.count({ where: { status: 'OPEN' } }),
      db.issue.count({ where: { status: 'IN_PROGRESS' } }),
      db.issue.count({ where: { status: 'RESOLVED' } }),
      db.user.count(),
    ])

    return NextResponse.json({
      totalIssues,
      openIssues,
      inProgressIssues,
      resolvedIssues,
      totalUsers,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}

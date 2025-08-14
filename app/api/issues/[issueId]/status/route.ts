import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { IssueStatus } from '@prisma/client'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { issueId: string } }
) {
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

    const { issueId } = params
    const { status } = await request.json()

    // Validate status
    if (!Object.values(IssueStatus).includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const updatedIssue = await db.issue.update({
      where: { id: issueId },
      data: { status },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    })

    return NextResponse.json(updatedIssue)
  } catch (error) {
    console.error('Error updating issue status:', error)
    return NextResponse.json(
      { error: 'Failed to update issue status' },
      { status: 500 }
    )
  }
}

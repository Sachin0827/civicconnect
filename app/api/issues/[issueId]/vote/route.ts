import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(
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

    const { issueId } = params

    // Check if issue exists
    const issue = await db.issue.findUnique({
      where: { id: issueId },
    })

    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      )
    }

    // Check if user has already voted
    const existingVote = await db.vote.findUnique({
      where: {
        userId_issueId: {
          userId: session.user.id,
          issueId,
        },
      },
    })

    if (existingVote) {
      // Remove vote (toggle)
      await db.vote.delete({
        where: { id: existingVote.id },
      })

      const voteCount = await db.vote.count({
        where: { issueId },
      })

      return NextResponse.json({
        hasUserVoted: false,
        voteCount,
      })
    } else {
      // Add vote
      await db.vote.create({
        data: {
          userId: session.user.id,
          issueId,
        },
      })

      const voteCount = await db.vote.count({
        where: { issueId },
      })

      return NextResponse.json({
        hasUserVoted: true,
        voteCount,
      })
    }
  } catch (error) {
    console.error('Error toggling vote:', error)
    return NextResponse.json(
      { error: 'Failed to toggle vote' },
      { status: 500 }
    )
  }
}

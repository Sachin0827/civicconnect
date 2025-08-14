import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Category } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as Category | null
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    if (category && category !== 'ALL') {
      where.category = category
    }
    if (status && status !== 'ALL') {
      where.status = status
    }

    const issues = await db.issue.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        votes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    const issuesWithUserVote = issues.map((issue) => ({
      ...issue,
      hasUserVoted: userId ? issue.votes.some((vote) => vote.userId === userId) : false,
      voteCount: issue._count.votes,
    }))

    return NextResponse.json(issuesWithUserVote)
  } catch (error) {
    console.error('Error fetching issues:', error)
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, category, latitude, longitude, address, imageUrl } = body

    // Validate required fields
    if (!title || !description || !category || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const issue = await db.issue.create({
      data: {
        title,
        description,
        category,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        imageUrl,
        authorId: session.user.id,
      },
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

    return NextResponse.json({
      ...issue,
      hasUserVoted: false,
      voteCount: 0,
    })
  } catch (error) {
    console.error('Error creating issue:', error)
    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 500 }
    )
  }
}

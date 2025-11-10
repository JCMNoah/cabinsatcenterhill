import { NextRequest, NextResponse } from 'next/server'
import { authServer } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await authServer.getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile,
      },
    })

  } catch (error: any) {
    console.error('Get user error:', error)
    
    return NextResponse.json(
      { error: 'Failed to get user information' },
      { status: 500 }
    )
  }
}

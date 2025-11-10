import { NextRequest, NextResponse } from 'next/server'
import { authClient } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await authClient.signOut()

    return NextResponse.json({
      message: 'Signed out successfully',
    })

  } catch (error: any) {
    console.error('Signout error:', error)
    
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    )
  }
}

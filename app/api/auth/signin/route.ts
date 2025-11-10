import { NextRequest, NextResponse } from 'next/server'
import { authClient } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const data = await authClient.signIn(email, password)

    return NextResponse.json({
      message: 'Signed in successfully',
      user: data.user,
      session: data.session,
    })

  } catch (error: any) {
    console.error('Signin error:', error)
    
    // Handle specific Supabase errors
    if (error.message?.includes('Invalid login credentials')) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (error.message?.includes('Email not confirmed')) {
      return NextResponse.json(
        { error: 'Please confirm your email address before signing in' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to sign in' },
      { status: 500 }
    )
  }
}

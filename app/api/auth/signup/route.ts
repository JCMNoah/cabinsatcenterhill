import { NextRequest, NextResponse } from 'next/server'
import { authClient } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, role } = body

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Validate role
    const validRoles = ['guest', 'host']
    if (role && !validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be guest or host' },
        { status: 400 }
      )
    }

    const data = await authClient.signUp(email, password, {
      name,
      role: role || 'guest',
    })

    return NextResponse.json({
      message: 'User created successfully. Please check your email to confirm your account.',
      user: data.user,
    }, { status: 201 })

  } catch (error: any) {
    console.error('Signup error:', error)
    
    // Handle specific Supabase errors
    if (error.message?.includes('User already registered')) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { authServer } from '@/lib/auth'
import { avatarUtils, fileValidation } from '@/lib/storage'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await authServer.getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file
    const validation = await fileValidation.validateImage(file, {
      maxSize: 2 * 1024 * 1024, // 2MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxWidth: 512,
      maxHeight: 512,
    })

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Upload avatar
    const avatarUrl = await avatarUtils.uploadAvatar(user.id, file)

    // Update user profile with new avatar URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: avatarUrl })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating user avatar:', updateError)
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      message: 'Avatar uploaded successfully',
      avatarUrl,
    })

  } catch (error: any) {
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { authServer } from '@/lib/auth'
import { cabinImageUtils, fileValidation } from '@/lib/storage'
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

    // Check if user is host or admin
    if (!user.profile || !['host', 'admin'].includes(user.profile.role)) {
      return NextResponse.json(
        { error: 'Host or admin role required' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const cabinId = formData.get('cabinId') as string | null
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    // Validate files
    const validation = await fileValidation.validateImages(files, {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxWidth: 2048,
      maxHeight: 2048,
    })

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'File validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    // Check if user owns the cabin (unless admin) - only if cabinId is provided
    if (cabinId && user.profile.role !== 'admin') {
      const { data: cabin } = await supabase
        .from('cabins')
        .select('host_id')
        .eq('id', cabinId)
        .single()

      if (!cabin || cabin.host_id !== user.id) {
        return NextResponse.json(
          { error: 'You can only upload images for your own cabins' },
          { status: 403 }
        )
      }
    }

    // Upload images
    // For new cabins (no cabinId), use a temporary folder or user ID
    const uploadPath = cabinId || `temp/${user.id}`
    const imageUrls = await cabinImageUtils.uploadCabinImages(uploadPath, files)

    return NextResponse.json({
      message: 'Images uploaded successfully',
      imageUrls,
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

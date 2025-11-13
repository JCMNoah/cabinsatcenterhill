import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const STORAGE_BUCKET = 'cabin-images'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const cabinId = formData.get('cabinId') as string | null
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    console.log(`Uploading ${files.length} files for cabin: ${cabinId || 'new cabin'}`)

    // Upload images using supabaseAdmin (no auth required)
    const uploadPath = cabinId || `temp/${Date.now()}`
    const imageUrls: string[] = []

    for (const file of files) {
      try {
        // Generate unique filename
        const timestamp = Date.now()
        const extension = file.name.split('.').pop()
        const path = `${uploadPath}/${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`

        console.log(`Uploading file to: ${path}`)

        // Convert File to ArrayBuffer for upload
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to Supabase storage using admin client
        const { data, error } = await supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .upload(path, buffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
          })

        if (error) {
          console.error('Upload error:', error)
          throw error
        }

        console.log('Upload successful:', data.path)

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(data.path)

        imageUrls.push(urlData.publicUrl)
      } catch (fileError: any) {
        console.error(`Error uploading file ${file.name}:`, fileError)
        throw new Error(`Failed to upload ${file.name}: ${fileError.message}`)
      }
    }

    console.log(`Successfully uploaded ${imageUrls.length} images`)

    return NextResponse.json({
      message: 'Images uploaded successfully',
      imageUrls,
    })

  } catch (error: any) {
    console.error('Admin upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images', details: error.message },
      { status: 500 }
    )
  }
}


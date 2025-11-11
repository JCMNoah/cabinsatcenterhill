import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Admin API: Fetching cabin by ID:', id)

    const { data, error } = await supabaseAdmin
      .from('cabins')
      .select(`
        *,
        host:users!host_id(id, email, name)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Cabin not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching cabin:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Admin API: Updating cabin:', id)
    const body = await request.json()

    // Validate and sanitize update data
    const updateData: any = {}

    if (body.title !== undefined) updateData.title = String(body.title)
    if (body.description !== undefined) updateData.description = String(body.description)
    if (body.location !== undefined) updateData.location = String(body.location)
    if (body.price_per_night !== undefined) {
      const price = parseFloat(body.price_per_night)
      if (isNaN(price) || price <= 0) {
        return NextResponse.json(
          { error: 'Price per night must be a positive number' },
          { status: 400 }
        )
      }
      updateData.price_per_night = price
    }
    if (body.max_guests !== undefined) {
      const guests = parseInt(body.max_guests)
      if (isNaN(guests) || guests <= 0) {
        return NextResponse.json(
          { error: 'Max guests must be a positive integer' },
          { status: 400 }
        )
      }
      updateData.max_guests = guests
    }
    if (body.bedrooms !== undefined) updateData.bedrooms = parseInt(body.bedrooms)
    if (body.bathrooms !== undefined) updateData.bathrooms = parseInt(body.bathrooms)
    if (body.amenities !== undefined) updateData.amenities = Array.isArray(body.amenities) ? body.amenities : []
    if (body.images !== undefined) updateData.images = Array.isArray(body.images) ? body.images : []
    if (body.is_featured !== undefined) updateData.is_featured = Boolean(body.is_featured)
    if (body.status !== undefined) updateData.status = String(body.status)
    if (body.host_id !== undefined) updateData.host_id = String(body.host_id)

    console.log('Update data:', updateData)

    const { data, error } = await supabaseAdmin
      .from('cabins')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        host:users!host_id(id, email, name)
      `)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Cabin not found' },
          { status: 404 }
        )
      }
      throw error
    }

    console.log('Cabin updated successfully:', data?.id)

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error updating cabin:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Admin API: Deleting cabin:', id)

    // First check if cabin exists
    const { data: existingCabin, error: fetchError } = await supabaseAdmin
      .from('cabins')
      .select('id, title')
      .eq('id', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Cabin not found' },
          { status: 404 }
        )
      }
      throw fetchError
    }

    // Delete the cabin (this will cascade delete related bookings and reviews)
    const { error } = await supabaseAdmin
      .from('cabins')
      .delete()
      .eq('id', id)

    if (error) throw error

    console.log('Cabin deleted successfully:', id)

    return NextResponse.json({
      data: {
        id: id,
        message: `Cabin "${existingCabin.title}" deleted successfully`
      }
    })
  } catch (error: any) {
    console.error('Error deleting cabin:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

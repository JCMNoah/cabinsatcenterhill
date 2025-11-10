import { NextRequest, NextResponse } from 'next/server'
import { cabinOperations, reviewOperations, bookingOperations } from '@/lib/database'
import { supabase } from '@/lib/supabase'

// GET /api/cabins/[id] - Get a specific cabin
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cabin = await cabinOperations.getById(params.id)

    if (!cabin) {
      return NextResponse.json(
        { error: 'Cabin not found' },
        { status: 404 }
      )
    }

    // Get host information
    const { data: host } = await supabase
      .from('users')
      .select('id, name, avatar_url, created_at')
      .eq('id', cabin.host_id)
      .single()

    // Get reviews with guest information
    const reviews = await reviewOperations.getByCabinId(cabin.id)

    // Get confirmed/completed bookings for availability
    const { data: bookings } = await supabase
      .from('bookings')
      .select('check_in, check_out')
      .eq('cabin_id', cabin.id)
      .in('status', ['confirmed', 'completed'])

    // Get booking count
    const { count: bookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('cabin_id', cabin.id)

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

    const cabinWithDetails = {
      ...cabin,
      host: host || null,
      reviews,
      bookings: bookings || [],
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
      bookingCount: bookingCount || 0,
    }

    return NextResponse.json(cabinWithDetails)
  } catch (error) {
    console.error('Error fetching cabin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cabin' },
      { status: 500 }
    )
  }
}

// PUT /api/cabins/[id] - Update a cabin (host/admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // In a real app, you'd validate ownership and authentication here
    const {
      title,
      description,
      location,
      price_per_night,
      max_guests,
      bedrooms,
      bathrooms,
      amenities,
      images,
      is_featured,
      status,
    } = body

    const updates: any = {}

    if (title) updates.title = title
    if (description) updates.description = description
    if (location) updates.location = location
    if (price_per_night) updates.price_per_night = parseFloat(price_per_night)
    if (max_guests) updates.max_guests = parseInt(max_guests)
    if (bedrooms) updates.bedrooms = parseInt(bedrooms)
    if (bathrooms) updates.bathrooms = parseInt(bathrooms)
    if (amenities) updates.amenities = amenities
    if (images) updates.images = images
    if (typeof is_featured === 'boolean') updates.is_featured = is_featured
    if (status) updates.status = status

    const cabin = await cabinOperations.update(params.id, updates)

    // Get host information
    const { data: host } = await supabase
      .from('users')
      .select('id, name, avatar_url')
      .eq('id', cabin.host_id)
      .single()

    return NextResponse.json({
      ...cabin,
      host: host || null,
    })
  } catch (error) {
    console.error('Error updating cabin:', error)
    return NextResponse.json(
      { error: 'Failed to update cabin' },
      { status: 500 }
    )
  }
}

// DELETE /api/cabins/[id] - Delete a cabin (host/admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, you'd validate ownership and authentication here
    await cabinOperations.delete(params.id)

    return NextResponse.json({ message: 'Cabin deleted successfully' })
  } catch (error) {
    console.error('Error deleting cabin:', error)
    return NextResponse.json(
      { error: 'Failed to delete cabin' },
      { status: 500 }
    )
  }
}

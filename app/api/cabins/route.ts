import { NextRequest, NextResponse } from 'next/server'
import { cabinOperations, reviewOperations } from '@/lib/database'
import { supabase } from '@/lib/supabase'

// GET /api/cabins - Get all cabins with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const maxGuests = searchParams.get('maxGuests')
    const maxPrice = searchParams.get('maxPrice')
    const minPrice = searchParams.get('minPrice')
    const location = searchParams.get('location')
    const amenities = searchParams.get('amenities')

    let cabins

    // If we have search parameters, use the search function
    if (location || maxPrice || minPrice || maxGuests || amenities) {
      const searchParams = {
        location: location || undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxGuests: maxGuests ? parseInt(maxGuests) : undefined,
        amenities: amenities ? amenities.split(',') : undefined,
      }
      cabins = await cabinOperations.search(searchParams)
    } else if (featured === 'true') {
      cabins = await cabinOperations.getFeatured()
    } else {
      const includeInactive = status !== undefined
      cabins = await cabinOperations.getAll(includeInactive)

      // Filter by status if specified
      if (status) {
        cabins = cabins.filter(cabin => cabin.status === status)
      }
    }

    // Get host information and reviews for each cabin
    const cabinsWithDetails = await Promise.all(
      cabins.map(async (cabin) => {
        // Get host info
        const { data: host } = await supabase
          .from('users')
          .select('id, name, avatar_url')
          .eq('id', cabin.host_id)
          .single()

        // Get reviews for rating calculation
        const reviews = await reviewOperations.getByCabinId(cabin.id)
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0

        // Get booking count
        const { count: bookingCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('cabin_id', cabin.id)

        return {
          ...cabin,
          host: host || null,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount: reviews.length,
          bookingCount: bookingCount || 0,
        }
      })
    )

    return NextResponse.json(cabinsWithDetails)
  } catch (error) {
    console.error('Error fetching cabins:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cabins' },
      { status: 500 }
    )
  }
}

// POST /api/cabins - Create a new cabin (host only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real app, you'd validate the user's role and authentication here
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
      host_id,
    } = body

    const cabin = await cabinOperations.create({
      title,
      description,
      location,
      price_per_night: parseFloat(price_per_night),
      max_guests: parseInt(max_guests),
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      amenities: amenities || [],
      images: images || [],
      host_id,
      status: 'pending', // New cabins start as pending
    })

    // Get host information
    const { data: host } = await supabase
      .from('users')
      .select('id, name, avatar_url')
      .eq('id', cabin.host_id)
      .single()

    return NextResponse.json({
      ...cabin,
      host: host || null,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating cabin:', error)
    return NextResponse.json(
      { error: 'Failed to create cabin' },
      { status: 500 }
    )
  }
}

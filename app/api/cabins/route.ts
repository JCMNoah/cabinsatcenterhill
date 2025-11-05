import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/cabins - Get all cabins with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const maxGuests = searchParams.get('maxGuests')
    const maxPrice = searchParams.get('maxPrice')

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (featured === 'true') {
      where.isFeatured = true
    }
    
    if (maxGuests) {
      where.maxGuests = { gte: parseInt(maxGuests) }
    }
    
    if (maxPrice) {
      where.pricePerNight = { lte: parseFloat(maxPrice) }
    }

    const cabins = await prisma.cabin.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    // Calculate average rating for each cabin
    const cabinsWithRatings = cabins.map(cabin => {
      const avgRating = cabin.reviews.length > 0
        ? cabin.reviews.reduce((sum, review) => sum + review.rating, 0) / cabin.reviews.length
        : 0

      return {
        ...cabin,
        avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
        reviewCount: cabin._count.reviews,
        bookingCount: cabin._count.bookings,
      }
    })

    return NextResponse.json(cabinsWithRatings)
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
      pricePerNight,
      maxGuests,
      bedrooms,
      bathrooms,
      amenities,
      images,
      hostId,
    } = body

    const cabin = await prisma.cabin.create({
      data: {
        title,
        description,
        location,
        pricePerNight: parseFloat(pricePerNight),
        maxGuests: parseInt(maxGuests),
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        amenities,
        images,
        hostId,
        status: 'pending', // New cabins start as pending
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    })

    return NextResponse.json(cabin, { status: 201 })
  } catch (error) {
    console.error('Error creating cabin:', error)
    return NextResponse.json(
      { error: 'Failed to create cabin' },
      { status: 500 }
    )
  }
}

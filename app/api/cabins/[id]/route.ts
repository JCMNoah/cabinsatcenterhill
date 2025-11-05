import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/cabins/[id] - Get a specific cabin
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cabin = await prisma.cabin.findUnique({
      where: { id: params.id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            createdAt: true,
          },
        },
        reviews: {
          include: {
            guest: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        bookings: {
          where: {
            status: { in: ['confirmed', 'completed'] },
          },
          select: {
            checkIn: true,
            checkOut: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
    })

    if (!cabin) {
      return NextResponse.json(
        { error: 'Cabin not found' },
        { status: 404 }
      )
    }

    // Calculate average rating
    const avgRating = cabin.reviews.length > 0
      ? cabin.reviews.reduce((sum, review) => sum + review.rating, 0) / cabin.reviews.length
      : 0

    const cabinWithRating = {
      ...cabin,
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: cabin._count.reviews,
      bookingCount: cabin._count.bookings,
    }

    return NextResponse.json(cabinWithRating)
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
      pricePerNight,
      maxGuests,
      bedrooms,
      bathrooms,
      amenities,
      images,
      isFeatured,
      status,
    } = body

    const cabin = await prisma.cabin.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(location && { location }),
        ...(pricePerNight && { pricePerNight: parseFloat(pricePerNight) }),
        ...(maxGuests && { maxGuests: parseInt(maxGuests) }),
        ...(bedrooms && { bedrooms: parseInt(bedrooms) }),
        ...(bathrooms && { bathrooms: parseInt(bathrooms) }),
        ...(amenities && { amenities }),
        ...(images && { images }),
        ...(typeof isFeatured === 'boolean' && { isFeatured }),
        ...(status && { status }),
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

    return NextResponse.json(cabin)
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
    await prisma.cabin.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Cabin deleted successfully' })
  } catch (error) {
    console.error('Error deleting cabin:', error)
    return NextResponse.json(
      { error: 'Failed to delete cabin' },
      { status: 500 }
    )
  }
}

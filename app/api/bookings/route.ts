import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/bookings - Get bookings (filtered by user role)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guestId = searchParams.get('guestId')
    const hostId = searchParams.get('hostId')
    const status = searchParams.get('status')

    const where: any = {}
    
    if (guestId) {
      where.guestId = guestId
    }
    
    if (hostId) {
      where.cabin = { hostId }
    }
    
    if (status) {
      where.status = status
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        cabin: {
          select: {
            id: true,
            title: true,
            location: true,
            images: true,
            pricePerNight: true,
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        payment: {
          select: {
            id: true,
            status: true,
            paymentMethod: true,
            transactionId: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cabinId, guestId, checkIn, checkOut } = body

    // Validate dates
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    
    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      )
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        cabinId,
        status: { in: ['confirmed', 'pending'] },
        OR: [
          {
            checkIn: { lte: checkInDate },
            checkOut: { gt: checkInDate },
          },
          {
            checkIn: { lt: checkOutDate },
            checkOut: { gte: checkOutDate },
          },
          {
            checkIn: { gte: checkInDate },
            checkOut: { lte: checkOutDate },
          },
        ],
      },
    })

    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'Cabin is not available for the selected dates' },
        { status: 409 }
      )
    }

    // Get cabin details to calculate total price
    const cabin = await prisma.cabin.findUnique({
      where: { id: cabinId },
      select: { pricePerNight: true },
    })

    if (!cabin) {
      return NextResponse.json(
        { error: 'Cabin not found' },
        { status: 404 }
      )
    }

    // Calculate total price
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = cabin.pricePerNight.toNumber() * nights

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        cabinId,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice,
        status: 'pending',
      },
      include: {
        cabin: {
          select: {
            id: true,
            title: true,
            location: true,
            images: true,
            pricePerNight: true,
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

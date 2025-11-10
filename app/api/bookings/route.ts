import { NextRequest, NextResponse } from 'next/server'
import { bookingOperations } from '@/lib/database'
import { supabase } from '@/lib/supabase'

// GET /api/bookings - Get bookings (filtered by user role)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const guestId = searchParams.get('guestId')
    const hostId = searchParams.get('hostId')
    const status = searchParams.get('status')

    let bookings

    if (guestId) {
      bookings = await bookingOperations.getByGuestId(guestId)
    } else if (hostId) {
      // Get bookings for cabins owned by this host
      const { data: hostCabins } = await supabase
        .from('cabins')
        .select('id')
        .eq('host_id', hostId)

      if (hostCabins && hostCabins.length > 0) {
        const cabinIds = hostCabins.map(cabin => cabin.id)
        const { data: hostBookings } = await supabase
          .from('bookings')
          .select(`
            *,
            cabin:cabins(*),
            guest:users(*)
          `)
          .in('cabin_id', cabinIds)
          .order('created_at', { ascending: false })

        bookings = hostBookings || []
      } else {
        bookings = []
      }
    } else {
      bookings = await bookingOperations.getAll()
    }

    // Filter by status if provided
    if (status && bookings) {
      bookings = bookings.filter((booking: any) => booking.status === status)
    }

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
    const { cabin_id, guest_id, check_in, check_out } = body

    // Validate dates
    const checkInDate = new Date(check_in)
    const checkOutDate = new Date(check_out)

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      )
    }

    // Check availability
    const isAvailable = await bookingOperations.checkAvailability(
      cabin_id,
      check_in,
      check_out
    )

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Cabin is not available for the selected dates' },
        { status: 409 }
      )
    }

    // Get cabin details to calculate total price
    const { data: cabin } = await supabase
      .from('cabins')
      .select('price_per_night')
      .eq('id', cabin_id)
      .single()

    if (!cabin) {
      return NextResponse.json(
        { error: 'Cabin not found' },
        { status: 404 }
      )
    }

    // Calculate total price
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = cabin.price_per_night * nights

    // Create booking
    const booking = await bookingOperations.create({
      cabin_id,
      guest_id,
      check_in,
      check_out,
      total_price: totalPrice,
      status: 'pending',
    })

    // Get booking with related data
    const bookingWithDetails = await bookingOperations.getById(booking.id)

    return NextResponse.json(bookingWithDetails, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

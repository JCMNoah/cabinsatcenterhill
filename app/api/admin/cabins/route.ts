import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('Admin API: Fetching cabins...')
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    const status = searchParams.get('status')

    console.log('Query params:', { page, perPage, sort, order, status })

    // Get total count
    let countQuery = supabaseAdmin
      .from('cabins')
      .select('id', { count: 'exact', head: true })

    if (status) {
      countQuery = countQuery.eq('status', status)
    }

    const { count } = await countQuery

    // Get data with pagination, sorting, and host information
    let dataQuery = supabaseAdmin
      .from('cabins')
      .select(`
        *,
        host:users!host_id(id, email, name)
      `)
      .order(sort, { ascending: order === 'asc' })
      .range((page - 1) * perPage, page * perPage - 1)

    if (status) {
      dataQuery = dataQuery.eq('status', status)
    }

    const { data, error } = await dataQuery

    if (error) throw error

    console.log(`Found ${data?.length || 0} cabins, total: ${count}`)

    return NextResponse.json({
      data: data || [],
      total: count || 0
    })
  } catch (error: any) {
    console.error('Error fetching cabins:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Admin API: Creating cabin...')
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'description', 'location', 'price_per_night', 'max_guests', 'bedrooms', 'bathrooms', 'host_id']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate data types
    const cabinData = {
      title: String(body.title),
      description: String(body.description),
      location: String(body.location),
      price_per_night: parseFloat(body.price_per_night),
      max_guests: parseInt(body.max_guests),
      bedrooms: parseInt(body.bedrooms),
      bathrooms: parseInt(body.bathrooms),
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      images: Array.isArray(body.images) ? body.images : [],
      host_id: String(body.host_id),
      is_featured: Boolean(body.is_featured || false),
      status: body.status || 'pending'
    }

    // Validate numeric values
    if (isNaN(cabinData.price_per_night) || cabinData.price_per_night <= 0) {
      return NextResponse.json(
        { error: 'Price per night must be a positive number' },
        { status: 400 }
      )
    }

    if (isNaN(cabinData.max_guests) || cabinData.max_guests <= 0) {
      return NextResponse.json(
        { error: 'Max guests must be a positive integer' },
        { status: 400 }
      )
    }

    console.log('Creating cabin with data:', cabinData)

    const { data, error } = await supabaseAdmin
      .from('cabins')
      .insert(cabinData)
      .select(`
        *,
        host:users!host_id(id, email, name)
      `)
      .single()

    if (error) throw error

    console.log('Cabin created successfully:', data?.id)

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating cabin:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'

    // Get total count
    const { count } = await supabaseAdmin
      .from('bookings')
      .select('id', { count: 'exact', head: true })

    // Get data with pagination and sorting, including related data
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        guest:users!guest_id(id, email, name),
        cabin:cabins!cabin_id(id, title, status)
      `)
      .order(sort, { ascending: order === 'asc' })
      .range((page - 1) * perPage, page * perPage - 1)

    if (error) throw error

    return NextResponse.json({
      data: data || [],
      total: count || 0
    })
  } catch (error: any) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

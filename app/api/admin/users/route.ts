import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('Admin API: Fetching users...')

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'

    console.log('Query params:', { page, perPage, sort, order })

    // Check if supabaseAdmin is configured
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client not configured')
    }

    // Get total count
    const { count, error: countError } = await supabaseAdmin
      .from('users')
      .select('id', { count: 'exact', head: true })

    if (countError) {
      console.error('Count error:', countError)
      throw countError
    }

    // Get data with pagination and sorting
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order(sort, { ascending: order === 'asc' })
      .range((page - 1) * perPage, page * perPage - 1)

    if (error) {
      console.error('Data fetch error:', error)
      throw error
    }

    console.log(`Found ${data?.length || 0} users, total: ${count}`)

    return NextResponse.json({
      data: data || [],
      total: count || 0
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch users',
        details: error.details || null,
        hint: error.hint || null
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

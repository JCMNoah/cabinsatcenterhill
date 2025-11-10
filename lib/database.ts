import { supabase, supabaseAdmin, Database } from './supabase'

// Type definitions
type User = Database['public']['Tables']['users']['Row']
type Cabin = Database['public']['Tables']['cabins']['Row']
type Booking = Database['public']['Tables']['bookings']['Row']
type Review = Database['public']['Tables']['reviews']['Row']

type CabinInsert = Database['public']['Tables']['cabins']['Insert']
type BookingInsert = Database['public']['Tables']['bookings']['Insert']
type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

// User operations
export const userOperations = {
  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getAll(): Promise<User[]> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async updateRole(id: string, role: 'guest' | 'host' | 'admin'): Promise<User> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ role })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Cabin operations
export const cabinOperations = {
  async getAll(includeInactive = false): Promise<Cabin[]> {
    let query = supabase
      .from('cabins')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!includeInactive) {
      query = query.eq('status', 'active')
    }
    
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Cabin | null> {
    const { data, error } = await supabase
      .from('cabins')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getByHostId(hostId: string): Promise<Cabin[]> {
    const { data, error } = await supabase
      .from('cabins')
      .select('*')
      .eq('host_id', hostId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getFeatured(): Promise<Cabin[]> {
    const { data, error } = await supabase
      .from('cabins')
      .select('*')
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(cabin: CabinInsert): Promise<Cabin> {
    const { data, error } = await supabase
      .from('cabins')
      .insert(cabin)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<CabinInsert>): Promise<Cabin> {
    const { data, error } = await supabase
      .from('cabins')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('cabins')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async search(params: {
    location?: string
    maxPrice?: number
    minPrice?: number
    maxGuests?: number
    amenities?: string[]
  }): Promise<Cabin[]> {
    let query = supabase
      .from('cabins')
      .select('*')
      .eq('status', 'active')
    
    if (params.location) {
      query = query.ilike('location', `%${params.location}%`)
    }
    
    if (params.maxPrice) {
      query = query.lte('price_per_night', params.maxPrice)
    }
    
    if (params.minPrice) {
      query = query.gte('price_per_night', params.minPrice)
    }
    
    if (params.maxGuests) {
      query = query.gte('max_guests', params.maxGuests)
    }
    
    if (params.amenities && params.amenities.length > 0) {
      query = query.contains('amenities', params.amenities)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  }
}

// Booking operations
export const bookingOperations = {
  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        cabin:cabins(*),
        guest:users(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        cabin:cabins(*),
        guest:users(*)
      `)
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getByGuestId(guestId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        cabin:cabins(*)
      `)
      .eq('guest_id', guestId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByCabinId(cabinId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        guest:users(*)
      `)
      .eq('cabin_id', cabinId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(booking: BookingInsert): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<BookingInsert>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async checkAvailability(cabinId: string, checkIn: string, checkOut: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('cabin_id', cabinId)
      .in('status', ['confirmed', 'pending'])
      .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`)
    
    if (error) throw error
    return data.length === 0
  }
}

// Review operations
export const reviewOperations = {
  async getAll(): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        cabin:cabins(*),
        guest:users(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getByCabinId(cabinId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        guest:users(name, avatar_url)
      `)
      .eq('cabin_id', cabinId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async create(review: ReviewInsert): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<ReviewInsert>): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getAverageRating(cabinId: string): Promise<number> {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('cabin_id', cabinId)
    
    if (error) throw error
    if (!data || data.length === 0) return 0
    
    const sum = data.reduce((acc, review) => acc + review.rating, 0)
    return sum / data.length
  }
}

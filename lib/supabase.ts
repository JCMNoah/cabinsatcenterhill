import { createClient } from '@supabase/supabase-js'

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_anon_key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock_service_key'

// Validate environment variables in production
if (process.env.NODE_ENV === 'production') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing required Supabase environment variables')
  }
}

// Main Supabase client (works in both client and server contexts)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Client component client (alias for consistency)
export const createSupabaseClient = () => supabase

// Server component client (alias for consistency)
export const createSupabaseServerClient = () => supabase

// Admin client with service role key (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types (will be generated from Supabase)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'guest' | 'host' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'guest' | 'host' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'guest' | 'host' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cabins: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          price_per_night: number
          max_guests: number
          bedrooms: number
          bathrooms: number
          amenities: string[]
          images: string[]
          host_id: string
          is_featured: boolean
          status: 'active' | 'inactive' | 'pending'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          price_per_night: number
          max_guests: number
          bedrooms: number
          bathrooms: number
          amenities?: string[]
          images?: string[]
          host_id: string
          is_featured?: boolean
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          price_per_night?: number
          max_guests?: number
          bedrooms?: number
          bathrooms?: number
          amenities?: string[]
          images?: string[]
          host_id?: string
          is_featured?: boolean
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          cabin_id: string
          guest_id: string
          check_in: string
          check_out: string
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          cabin_id: string
          guest_id: string
          check_in: string
          check_out: string
          total_price: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          cabin_id?: string
          guest_id?: string
          check_in?: string
          check_out?: string
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          cabin_id: string
          guest_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          cabin_id: string
          guest_id: string
          rating: number
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          cabin_id?: string
          guest_id?: string
          rating?: number
          comment?: string
          created_at?: string
        }
      }
    }
  }
}

import { createSupabaseClient, createSupabaseServerClient } from './supabase'
import { userOperations } from './database'

// Client-side auth functions
export const authClient = {
  async signUp(email: string, password: string, userData: { name: string, role?: 'guest' | 'host' }) {
    const supabase = createSupabaseClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          role: userData.role || 'guest',
        },
      },
    })

    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const supabase = createSupabaseClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const supabase = createSupabaseClient()
    
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const supabase = createSupabaseClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    
    if (!user) return null

    // Get user profile from our users table
    const profile = await userOperations.getById(user.id)
    
    return {
      ...user,
      profile,
    }
  },

  async updateProfile(updates: { name?: string, avatar_url?: string }) {
    const supabase = createSupabaseClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Not authenticated')

    // Update auth user metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: updates,
    })
    if (authError) throw authError

    // Update our users table
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async resetPassword(email: string) {
    const supabase = createSupabaseClient()
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
  },

  async updatePassword(newPassword: string) {
    const supabase = createSupabaseClient()
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
  },
}

// Server-side auth functions
export const authServer = {
  async getCurrentUser() {
    const supabase = createSupabaseServerClient()

    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error

    if (!user) return null

    // Get user profile from our users table
    const profile = await userOperations.getById(user.id)

    return {
      ...user,
      profile,
    }
  },

  async requireAuth() {
    const user = await this.getCurrentUser()
    if (!user) {
      throw new Error('Authentication required')
    }
    return user
  },

  async requireRole(requiredRole: 'guest' | 'host' | 'admin') {
    const user = await this.requireAuth()
    
    if (!user.profile || user.profile.role !== requiredRole) {
      throw new Error(`${requiredRole} role required`)
    }
    
    return user
  },

  async requireRoles(requiredRoles: ('guest' | 'host' | 'admin')[]) {
    const user = await this.requireAuth()
    
    if (!user.profile || !requiredRoles.includes(user.profile.role)) {
      throw new Error(`One of these roles required: ${requiredRoles.join(', ')}`)
    }
    
    return user
  },

  async isAdmin() {
    try {
      const user = await this.getCurrentUser()
      return user?.profile?.role === 'admin'
    } catch {
      return false
    }
  },

  async isHost() {
    try {
      const user = await this.getCurrentUser()
      return user?.profile?.role === 'host' || user?.profile?.role === 'admin'
    } catch {
      return false
    }
  },
}

// Role checking utilities
export const hasRole = (userRole: string | undefined, requiredRole: 'guest' | 'host' | 'admin'): boolean => {
  if (!userRole) return false
  
  // Admin has access to everything
  if (userRole === 'admin') return true
  
  // Host has access to host and guest features
  if (userRole === 'host' && (requiredRole === 'host' || requiredRole === 'guest')) return true
  
  // Guest only has access to guest features
  if (userRole === 'guest' && requiredRole === 'guest') return true
  
  return false
}

export const hasAnyRole = (userRole: string | undefined, requiredRoles: ('guest' | 'host' | 'admin')[]): boolean => {
  return requiredRoles.some(role => hasRole(userRole, role))
}

// Auth middleware for API routes
export const withAuth = (handler: Function) => {
  return async (request: Request, context: any) => {
    try {
      const user = await authServer.getCurrentUser()
      if (!user) {
        return new Response(JSON.stringify({ error: 'Authentication required' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      
      return handler(request, { ...context, user })
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
}

export const withRole = (requiredRole: 'guest' | 'host' | 'admin') => {
  return (handler: Function) => {
    return async (request: Request, context: any) => {
      try {
        const user = await authServer.requireRole(requiredRole)
        return handler(request, { ...context, user })
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
  }
}

export const withRoles = (requiredRoles: ('guest' | 'host' | 'admin')[]) => {
  return (handler: Function) => {
    return async (request: Request, context: any) => {
      try {
        const user = await authServer.requireRoles(requiredRoles)
        return handler(request, { ...context, user })
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
  }
}

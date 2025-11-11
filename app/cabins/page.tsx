'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ClientAnimationWrapper from '@/components/animations/ClientAnimationWrapper'
import FadeAnimation from '@/components/animations/FadeAnimation'

interface Cabin {
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
  status: string
  is_featured: boolean
  host: {
    id: string
    name: string
    avatar_url?: string
  }
  avgRating: number
  reviewCount: number
  bookingCount: number
}

export default function CabinsPage() {
  const [cabins, setCabins] = useState<Cabin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    location: '',
    maxPrice: '',
    minPrice: '',
    maxGuests: '',
    amenities: ''
  })

  useEffect(() => {
    fetchCabins()
  }, [])

  const fetchCabins = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Build query parameters
      const params = new URLSearchParams()
      if (filters.location) params.append('location', filters.location)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxGuests) params.append('maxGuests', filters.maxGuests)
      if (filters.amenities) params.append('amenities', filters.amenities)
      
      const response = await fetch(`/api/cabins?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch cabins')
      }
      
      const data = await response.json()
      setCabins(data.filter((cabin: Cabin) => cabin.status === 'active'))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    fetchCabins()
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      maxPrice: '',
      minPrice: '',
      maxGuests: '',
      amenities: ''
    })
    setTimeout(fetchCabins, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cabins...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={fetchCabins}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <ClientAnimationWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <FadeAnimation>
              <h1 className="text-4xl font-bold text-gray-900 text-center">Our Cabins</h1>
              <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
                Discover our collection of beautiful cabins, each offering unique experiences 
                and stunning views at Center Hill Lake.
              </p>
            </FadeAnimation>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <FadeAnimation delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="$1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                  <input
                    type="number"
                    value={filters.maxGuests}
                    onChange={(e) => handleFilterChange('maxGuests', e.target.value)}
                    placeholder="Any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button
                    onClick={applyFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </FadeAnimation>
          </div>
        </div>

        {/* Cabins Grid */}
        <div className="container mx-auto px-4 py-8">
          {cabins.length === 0 ? (
            <FadeAnimation delay={0.4}>
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No cabins found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View All Cabins
                </button>
              </div>
            </FadeAnimation>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cabins.map((cabin, index) => (
                <FadeAnimation key={cabin.id} delay={0.1 * index}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Cabin Image */}
                    <div className="relative h-48">
                      {cabin.images && cabin.images.length > 0 ? (
                        <Image
                          src={cabin.images[0]}
                          alt={cabin.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/cabin-placeholder.jpg'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      {cabin.is_featured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Cabin Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{cabin.title}</h3>
                      <p className="text-gray-600 mb-2">{cabin.location}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{cabin.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          ${cabin.price_per_night}
                          <span className="text-sm font-normal text-gray-600">/night</span>
                        </div>
                        {cabin.avgRating > 0 && (
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-sm text-gray-600">
                              {cabin.avgRating} ({cabin.reviewCount})
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{cabin.max_guests} guests</span>
                        <span>{cabin.bedrooms} bed</span>
                        <span>{cabin.bathrooms} bath</span>
                      </div>

                      <Link
                        href={`/cabins/${cabin.id}`}
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </FadeAnimation>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientAnimationWrapper>
  )
}

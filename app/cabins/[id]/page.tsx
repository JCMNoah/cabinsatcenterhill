'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
    created_at: string
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string
    guest: {
      name: string
    }
    created_at: string
  }>
  bookings: Array<{
    check_in: string
    check_out: string
  }>
  avgRating: number
  reviewCount: number
  bookingCount: number
}

export default function CabinDetailPage() {
  const params = useParams()
  const [cabin, setCabin] = useState<Cabin | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchCabin(params.id as string)
    }
  }, [params.id])

  const fetchCabin = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/cabins/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Cabin not found')
        }
        throw new Error('Failed to fetch cabin details')
      }
      
      const data = await response.json()
      setCabin(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cabin details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <Link
            href="/cabins"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Cabins
          </Link>
        </div>
      </div>
    )
  }

  if (!cabin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Cabin not found</p>
          <Link
            href="/cabins"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Cabins
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ClientAnimationWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="text-sm">
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link href="/cabins" className="text-blue-600 hover:underline">Cabins</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-700">{cabin.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Images */}
              <FadeAnimation>
                <div className="mb-8">
                  {cabin.images && cabin.images.length > 0 ? (
                    <div>
                      <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={cabin.images[selectedImage]}
                          alt={cabin.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/cabin-placeholder.jpg'
                          }}
                        />
                      </div>
                      {cabin.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                          {cabin.images.slice(0, 4).map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`relative h-20 rounded overflow-hidden ${
                                selectedImage === index ? 'ring-2 ring-blue-500' : ''
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`${cabin.title} ${index + 1}`}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/images/cabin-placeholder.jpg'
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No Images Available</span>
                    </div>
                  )}
                </div>
              </FadeAnimation>

              {/* Title and Basic Info */}
              <FadeAnimation delay={0.2}>
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{cabin.title}</h1>
                      <p className="text-gray-600 text-lg">{cabin.location}</p>
                    </div>
                    {cabin.is_featured && (
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-gray-600">
                    <span>{cabin.max_guests} guests</span>
                    <span>{cabin.bedrooms} bedrooms</span>
                    <span>{cabin.bathrooms} bathrooms</span>
                    {cabin.avgRating > 0 && (
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">
                          {cabin.avgRating} ({cabin.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </FadeAnimation>

              {/* Description */}
              <FadeAnimation delay={0.3}>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this cabin</h2>
                  <p className="text-gray-700 leading-relaxed">{cabin.description}</p>
                </div>
              </FadeAnimation>

              {/* Amenities */}
              {cabin.amenities && cabin.amenities.length > 0 && (
                <FadeAnimation delay={0.4}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {cabin.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeAnimation>
              )}

              {/* Host Info */}
              <FadeAnimation delay={0.5}>
                <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Meet your host</h2>
                  <div className="flex items-center">
                    {cabin.host.avatar_url ? (
                      <Image
                        src={cabin.host.avatar_url}
                        alt={cabin.host.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-15 h-15 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-gray-600 text-xl">{cabin.host.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cabin.host.name}</h3>
                      <p className="text-gray-600">
                        Host since {new Date(cabin.host.created_at).getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeAnimation>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <FadeAnimation delay={0.6}>
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600">
                      ${cabin.price_per_night}
                      <span className="text-lg font-normal text-gray-600">/night</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {Array.from({ length: cabin.max_guests }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} guest{i > 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold">
                    Check Availability
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    <p>{cabin.bookingCount} bookings so far</p>
                  </div>
                </div>
              </FadeAnimation>
            </div>
          </div>

          {/* Reviews */}
          {cabin.reviews && cabin.reviews.length > 0 && (
            <FadeAnimation delay={0.7}>
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Reviews ({cabin.reviewCount})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cabin.reviews.slice(0, 6).map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-500">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-600">- {review.guest.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeAnimation>
          )}
        </div>
      </div>
    </ClientAnimationWrapper>
  )
}

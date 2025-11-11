'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

export default function CabinsSection() {
  const [cabins, setCabins] = useState<Cabin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedCabins()
  }, [])

  const fetchFeaturedCabins = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cabins?featured=true&status=active')
      if (response.ok) {
        const data = await response.json()
        setCabins(data.slice(0, 6)) // Show max 6 cabins
      }
    } catch (error) {
      console.error('Error fetching featured cabins:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="cabins-area py-120 position-relative z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading cabins...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (cabins.length === 0) {
    return (
      <section className="cabins-area py-120 position-relative z-1">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-8 col-lg-8">
              <div className="section-wrapper tw-mb-14 tw_fade_anim" data-delay=".3">
                <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Sleep in Style and Serenity</h6>
                <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">Our Featured Cabins</h2>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="service-top-button tw_fade_anim" data-delay=".5">
                <Link className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg" href="/cabins">
                  View All Cabins <span className="d-inline-block lh-1 tw-text-lg"><i className="ph ph-arrow-up-right"></i></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-gray-600">No featured cabins available at the moment.</p>
              <Link href="/cabins" className="btn btn-primary mt-3">View All Cabins</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="cabins-area py-120 position-relative z-1">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-8 col-lg-8">
            <div className="section-wrapper tw-mb-14 tw_fade_anim" data-delay=".3">
              <h6 className="section-subtitle tw-text-xl fw-medium text-uppercase tw-mb-4 text-main-600">Sleep in Style and Serenity</h6>
              <h2 className="section-title fw-normal tw-mb-7 tw-char-animation">Our Featured Cabins</h2>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <div className="service-top-button tw_fade_anim" data-delay=".5">
              <Link className="tw-btn-hover-black bg-main-600 tw-py-5 tw-px-12 text-uppercase text-heading font-heading d-inline-flex align-items-center tw-gap-2 tw-rounded-lg" href="/cabins">
                View All Cabins <span className="d-inline-block lh-1 tw-text-lg"><i className="ph ph-arrow-up-right"></i></span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="service-slider tw_fade_anim">
              <div className="service-active swiper-container">
                <div className="swiper-wrapper">
                  {cabins.map((cabin, index) => (
                    <div key={cabin.id} className="service-wrapper bg-white tw-p-4 tw-rounded-xl tw-mb-8 swiper-slide">
                      <div className="service-thumb tw-mb-5 position-relative z-1 overflow-hidden">
                        <Link href={`/cabins/${cabin.id}`}>
                          {cabin.images && cabin.images.length > 0 ? (
                            <Image
                              className="tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500"
                              src={cabin.images[0]}
                              alt={cabin.title}
                              width={400}
                              height={300}
                              style={{ height: '250px', objectFit: 'cover' }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/assets/images/thumbs/service-thumb1.jpg'
                              }}
                            />
                          ) : (
                            <img
                              className="tw-rounded-xl w-100 h-100 object-fit-cover hover-scale-2 tw-duration-500"
                              src="/assets/images/thumbs/service-thumb1.jpg"
                              alt={cabin.title}
                              style={{ height: '250px', objectFit: 'cover' }}
                            />
                          )}
                        </Link>
                        <div className="service-tag position-absolute start-0 top-0 tw-mt-2 tw-ms-2">
                          <span className="bg-white text-heading tw-py-1 tw-px-5 tw-rounded-lg tw-text-lg text-capitalize">
                            {cabin.max_guests} guests
                          </span>
                        </div>
                        {cabin.is_featured && (
                          <div className="service-tag position-absolute end-0 top-0 tw-mt-2 tw-me-2">
                            <span className="bg-yellow-500 text-white tw-py-1 tw-px-3 tw-rounded-lg tw-text-sm text-capitalize">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="service-content tw-px-2 tw-mb-2">
                        <span className="service-location">
                          <i className="ph ph-map-pin"></i> {cabin.location}
                        </span>
                        <h4 className="service-title tw-text-8 fw-normal text-capitalize tw-mb-2">
                          <Link className="hover-text-secondary" href={`/cabins/${cabin.id}`}>
                            {cabin.title}
                          </Link>
                        </h4>
                        <p className="service-paragraph tw-mb-5">
                          {cabin.description.length > 100 
                            ? `${cabin.description.substring(0, 100)}...` 
                            : cabin.description
                          }
                        </p>
                        <div className="service-wrap tw-rounded-xl tw-py-4 tw-px-6">
                          <div className="service-star d-flex tw-gap-6 tw-pb-4 tw-mb-6">
                            <span className="text-heading fw-normal d-flex tw-gap-2">
                              <i className="ph ph-star"></i> 
                              {cabin.avgRating > 0 ? `${cabin.avgRating} (${cabin.reviewCount})` : 'New'}
                            </span>
                            <span className="text-heading fw-normal">
                              {cabin.bedrooms} bed • {cabin.bathrooms} bath
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                            <div className="service-price">
                              <h6 className="fw-normal">${cabin.price_per_night}</h6>
                              <p>/ Per Night</p>
                            </div>
                            <div>
                              <Link 
                                className="font-heading tw-text-sm text-uppercase text-heading fw-normal hover-text-main-600" 
                                href={`/cabins/${cabin.id}`}
                              >
                                EXPLORE MORE <i className="tw-text-base ph ph-arrow-up-right"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

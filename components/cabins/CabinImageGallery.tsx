'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CabinImageGalleryProps {
  images: string[]
  title: string
}

export default function CabinImageGallery({ images, title }: CabinImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="mb-8">
        <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No Images Available</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/images/cabin-placeholder.jpg'
          }}
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 rounded overflow-hidden transition-all ${
                selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
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
  )
}

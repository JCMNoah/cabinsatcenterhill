'use client'

import { useState } from 'react'

interface BookingFormProps {
  cabin: {
    id: string
    price_per_night: number
    max_guests: number
    bookingCount: number
    bookings: Array<{
      check_in: string
      check_out: string
    }>
  }
}

export default function BookingForm({ cabin }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement booking logic
    console.log('Booking request:', {
      cabinId: cabin.id,
      checkIn,
      checkOut,
      guests
    })
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Booking functionality coming soon!')
    }, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-blue-600">
          ${cabin.price_per_night}
          <span className="text-lg font-normal text-gray-600">/night</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <select 
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: cabin.max_guests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit"
          disabled={isLoading || !checkIn || !checkOut}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Check Availability'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        <p>{cabin.bookingCount} bookings so far</p>
      </div>
    </div>
  )
}

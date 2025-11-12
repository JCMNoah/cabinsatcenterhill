import Link from 'next/link'
import { notFound } from 'next/navigation'
import CabinDetailClient from '@/components/cabins/CabinDetailClient'

// Fetch cabin data on the server
async function getCabin(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/cabins/${id}`, {
      cache: 'no-store' // Always fetch fresh data
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch cabin details')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching cabin:', error)
    return null
  }
}

export default async function CabinDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cabin = await getCabin(id)

  if (!cabin) {
    notFound()
  }



  return (
    <div>
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

      {/* Client Component for Interactive Features */}
      <CabinDetailClient cabin={cabin} />
    </div>
  )
}

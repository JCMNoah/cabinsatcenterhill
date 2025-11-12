import CabinListClient from '@/components/cabins/CabinListClient'

// Fetch cabins data on the server
async function getCabins() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/cabins?status=active`, {
      cache: 'no-store' // Always fetch fresh data
    })

    if (!response.ok) {
      console.error('Failed to fetch cabins:', response.status)
      return []
    }

    const data = await response.json()
    return data.filter((cabin: any) => cabin.status === 'active')
  } catch (error) {
    console.error('Error fetching cabins:', error)
    return []
  }
}

export default async function CabinsPage() {
  const initialCabins = await getCabins()

  return <CabinListClient initialCabins={initialCabins} />
}

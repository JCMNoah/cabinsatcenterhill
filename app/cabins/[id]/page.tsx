import Layout from '@/components/layout/Layout';
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
  params: { id: string }
}) {
  const { id } = await params
  const cabin = await getCabin(id)

  if (!cabin) {
    notFound()
  }



  return (
    <Layout>
      <section className="breadcrumb-area background-img position-relative z-1" style={{backgroundImage: 'url(/assets/images/thumbs/breadcrumb-bg.jpg)'}}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="text-center">
                        <span className="breadcrumb-subtitle tw-mb-4 text-white text-uppercase tw-text-xl fw-bold text-white">{cabin.location}</span>
                        <h2 className="breadcrumb-title tw-text-25 fw-normal text-white tw-char-animation">{cabin.title}</h2>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <div>

      {/* Client Component for Interactive Features */}
      <CabinDetailClient cabin={cabin} />
    </div>  
    </Layout>
  )
}

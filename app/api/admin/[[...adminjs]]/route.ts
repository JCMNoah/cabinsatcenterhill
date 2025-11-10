import { NextRequest, NextResponse } from 'next/server'

// For now, redirect to the custom server admin panel
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const adminPath = url.pathname.replace('/api/admin', '')

  // Redirect to the custom server running on port 3001
  return NextResponse.redirect(`http://localhost:3001/admin${adminPath}`)
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const adminPath = url.pathname.replace('/api/admin', '')

  return NextResponse.redirect(`http://localhost:3001/admin${adminPath}`)
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url)
  const adminPath = url.pathname.replace('/api/admin', '')

  return NextResponse.redirect(`http://localhost:3001/admin${adminPath}`)
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const adminPath = url.pathname.replace('/api/admin', '')

  return NextResponse.redirect(`http://localhost:3001/admin${adminPath}`)
}

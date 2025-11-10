import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get total counts
    const [totalCabins, totalBookings, totalUsers] = await Promise.all([
      prisma.cabin.count(),
      prisma.booking.count(),
      prisma.user.count(),
    ])

    // Get total revenue from completed bookings
    const revenueResult = await prisma.booking.aggregate({
      where: {
        status: { in: ['completed', 'confirmed'] },
      },
      _sum: {
        totalPrice: true,
      },
    })

    const totalRevenue = revenueResult._sum.totalPrice?.toNumber() || 0

    // Get recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        cabin: {
          select: {
            title: true,
          },
        },
        guest: {
          select: {
            name: true,
          },
        },
      },
    })

    // Get cabins by status
    const cabinsByStatus = await prisma.cabin.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    })

    const cabinStatusCounts = {
      active: 0,
      pending: 0,
      inactive: 0,
    }

    cabinsByStatus.forEach((group) => {
      cabinStatusCounts[group.status as keyof typeof cabinStatusCounts] = group._count.status
    })

    // Get users by role
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true,
      },
    })

    const userRoleCounts = {
      guest: 0,
      host: 0,
      admin: 0,
    }

    usersByRole.forEach((group) => {
      userRoleCounts[group.role as keyof typeof userRoleCounts] = group._count.role
    })

    // Format recent bookings for response
    const formattedRecentBookings = recentBookings.map((booking) => ({
      id: booking.id,
      cabin: booking.cabin,
      guest: booking.guest,
      totalPrice: booking.totalPrice.toNumber(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
    }))

    const dashboardStats = {
      totalCabins,
      totalBookings,
      totalUsers,
      totalRevenue,
      recentBookings: formattedRecentBookings,
      cabinsByStatus: cabinStatusCounts,
      usersByRole: userRoleCounts,
    }

    return NextResponse.json(dashboardStats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}

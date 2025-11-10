import React, { useEffect, useState } from 'react'
import { Box, H2, H3, Text, Card, Flex, Badge } from '@adminjs/design-system'

interface DashboardStats {
  totalCabins: number
  totalBookings: number
  totalUsers: number
  totalRevenue: number
  recentBookings: Array<{
    id: string
    cabin: { title: string }
    guest: { name: string }
    totalPrice: number
    status: string
    createdAt: string
  }>
  cabinsByStatus: {
    active: number
    pending: number
    inactive: number
  }
  usersByRole: {
    guest: number
    host: number
    admin: number
  }
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard-stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box p="xl">
        <H2>Dashboard</H2>
        <Text>Loading...</Text>
      </Box>
    )
  }

  if (!stats) {
    return (
      <Box p="xl">
        <H2>Dashboard</H2>
        <Text>Failed to load dashboard data</Text>
      </Box>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'cancelled':
        return 'danger'
      case 'completed':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Box p="xl">
      <H2 mb="xl">Dashboard Overview</H2>
      
      {/* Key Metrics */}
      <Flex flexWrap="wrap" mb="xl">
        <Box width={[1, 1/2, 1/4]} p="sm">
          <Card p="lg" textAlign="center">
            <H3 color="primary">{stats.totalCabins}</H3>
            <Text>Total Cabins</Text>
          </Card>
        </Box>
        <Box width={[1, 1/2, 1/4]} p="sm">
          <Card p="lg" textAlign="center">
            <H3 color="success">{stats.totalBookings}</H3>
            <Text>Total Bookings</Text>
          </Card>
        </Box>
        <Box width={[1, 1/2, 1/4]} p="sm">
          <Card p="lg" textAlign="center">
            <H3 color="info">{stats.totalUsers}</H3>
            <Text>Total Users</Text>
          </Card>
        </Box>
        <Box width={[1, 1/2, 1/4]} p="sm">
          <Card p="lg" textAlign="center">
            <H3 color="warning">{formatCurrency(stats.totalRevenue)}</H3>
            <Text>Total Revenue</Text>
          </Card>
        </Box>
      </Flex>

      {/* Detailed Stats */}
      <Flex flexWrap="wrap" mb="xl">
        <Box width={[1, 1/2]} p="sm">
          <Card p="lg">
            <H3 mb="md">Cabins by Status</H3>
            <Flex justifyContent="space-between" mb="sm">
              <Text>Active:</Text>
              <Badge variant="success">{stats.cabinsByStatus.active}</Badge>
            </Flex>
            <Flex justifyContent="space-between" mb="sm">
              <Text>Pending:</Text>
              <Badge variant="warning">{stats.cabinsByStatus.pending}</Badge>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Inactive:</Text>
              <Badge variant="danger">{stats.cabinsByStatus.inactive}</Badge>
            </Flex>
          </Card>
        </Box>
        <Box width={[1, 1/2]} p="sm">
          <Card p="lg">
            <H3 mb="md">Users by Role</H3>
            <Flex justifyContent="space-between" mb="sm">
              <Text>Guests:</Text>
              <Badge variant="info">{stats.usersByRole.guest}</Badge>
            </Flex>
            <Flex justifyContent="space-between" mb="sm">
              <Text>Hosts:</Text>
              <Badge variant="primary">{stats.usersByRole.host}</Badge>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Admins:</Text>
              <Badge variant="success">{stats.usersByRole.admin}</Badge>
            </Flex>
          </Card>
        </Box>
      </Flex>

      {/* Recent Bookings */}
      <Card p="lg">
        <H3 mb="md">Recent Bookings</H3>
        {stats.recentBookings.length === 0 ? (
          <Text>No recent bookings</Text>
        ) : (
          <Box>
            {stats.recentBookings.map((booking) => (
              <Flex
                key={booking.id}
                justifyContent="space-between"
                alignItems="center"
                p="sm"
                borderBottom="1px solid #eee"
              >
                <Box>
                  <Text fontWeight="bold">{booking.cabin.title}</Text>
                  <Text fontSize="sm" color="grey60">
                    Guest: {booking.guest.name}
                  </Text>
                  <Text fontSize="sm" color="grey60">
                    {formatDate(booking.createdAt)}
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontWeight="bold">{formatCurrency(booking.totalPrice)}</Text>
                  <Badge variant={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Card>
    </Box>
  )
}

export default Dashboard

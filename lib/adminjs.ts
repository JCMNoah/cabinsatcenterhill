import AdminJS from 'adminjs'
import { PrismaAdapter } from '@adminjs/prisma'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import Dashboard from './admin-dashboard'

// Register the Prisma adapter
AdminJS.registerAdapter({
  Resource: PrismaAdapter.Resource,
  Database: PrismaAdapter.Database,
})

// Authentication configuration
const authenticate = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.role !== 'admin') {
    return null
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

// AdminJS configuration
export const adminJsConfig = {
  databases: [new PrismaAdapter.Database(prisma)],
  rootPath: '/admin',
  dashboard: {
    component: Dashboard,
  },
  branding: {
    companyName: 'Cabins at Center Hill',
    logo: '/assets/images/logo.png',
    softwareBrothers: false,
    favicon: '/favicon.ico',
  },
  resources: [
    {
      resource: { model: prisma.user, client: prisma },
      options: {
        id: 'User',
        navigation: {
          name: 'User Management',
          icon: 'User',
        },
        listProperties: ['id', 'name', 'email', 'role', 'createdAt'],
        showProperties: ['id', 'name', 'email', 'role', 'avatarUrl', 'createdAt', 'updatedAt'],
        editProperties: ['name', 'email', 'role', 'avatarUrl'],
        filterProperties: ['name', 'email', 'role', 'createdAt'],
        properties: {
          passwordHash: {
            isVisible: false,
          },
          id: {
            isVisible: { list: true, show: true, edit: false, filter: false },
          },
          createdAt: {
            isVisible: { list: true, show: true, edit: false, filter: true },
          },
          updatedAt: {
            isVisible: { list: false, show: true, edit: false, filter: false },
          },
        },
      },
    },
    {
      resource: { model: prisma.cabin, client: prisma },
      options: {
        id: 'Cabin',
        navigation: {
          name: 'Property Management',
          icon: 'Home',
        },
        listProperties: ['title', 'location', 'pricePerNight', 'maxGuests', 'status', 'isFeatured', 'createdAt'],
        showProperties: [
          'id', 'title', 'description', 'location', 'pricePerNight', 'maxGuests', 
          'bedrooms', 'bathrooms', 'amenities', 'images', 'hostId', 'isFeatured', 
          'status', 'createdAt', 'updatedAt'
        ],
        editProperties: [
          'title', 'description', 'location', 'pricePerNight', 'maxGuests',
          'bedrooms', 'bathrooms', 'amenities', 'images', 'hostId', 'isFeatured', 'status'
        ],
        filterProperties: ['title', 'location', 'status', 'isFeatured', 'hostId', 'pricePerNight'],
        properties: {
          id: {
            isVisible: { list: false, show: true, edit: false, filter: false },
          },
          pricePerNight: {
            type: 'number',
            props: {
              step: 0.01,
            },
          },
          amenities: {
            type: 'textarea',
            props: {
              rows: 3,
            },
          },
          images: {
            type: 'textarea',
            props: {
              rows: 3,
            },
          },
          description: {
            type: 'textarea',
            props: {
              rows: 4,
            },
          },
        },
        actions: {
          approveCabin: {
            actionType: 'record',
            component: false,
            handler: async (request: any, response: any, context: any) => {
              const { record } = context
              
              await prisma.cabin.update({
                where: { id: record.params.id },
                data: { status: 'active' },
              })

              return {
                record: record.toJSON(),
                notice: {
                  message: 'Cabin approved successfully!',
                  type: 'success',
                },
                redirectUrl: context.h.resourceUrl({ resourceId: 'Cabin' }),
              }
            },
          },
        },
      },
    },
    {
      resource: { model: prisma.booking, client: prisma },
      options: {
        id: 'Booking',
        navigation: {
          name: 'Booking Management',
          icon: 'Calendar',
        },
        listProperties: ['id', 'cabinId', 'guestId', 'checkIn', 'checkOut', 'totalPrice', 'status', 'createdAt'],
        showProperties: [
          'id', 'cabinId', 'guestId', 'checkIn', 'checkOut', 'totalPrice', 'status', 'createdAt'
        ],
        editProperties: ['cabinId', 'guestId', 'checkIn', 'checkOut', 'totalPrice', 'status'],
        filterProperties: ['status', 'cabinId', 'guestId', 'checkIn', 'checkOut'],
        properties: {
          totalPrice: {
            type: 'number',
            props: {
              step: 0.01,
            },
          },
          checkIn: {
            type: 'datetime',
          },
          checkOut: {
            type: 'datetime',
          },
        },
        actions: {
          markAsPaid: {
            actionType: 'record',
            component: false,
            handler: async (request: any, response: any, context: any) => {
              const { record } = context
              
              // Update booking status
              await prisma.booking.update({
                where: { id: record.params.id },
                data: { status: 'confirmed' },
              })

              // Create or update payment record
              await prisma.payment.upsert({
                where: { bookingId: record.params.id },
                update: { status: 'paid' },
                create: {
                  bookingId: record.params.id,
                  amount: record.params.totalPrice,
                  paymentMethod: 'Admin Panel',
                  status: 'paid',
                  transactionId: `admin_${Date.now()}`,
                },
              })

              return {
                record: record.toJSON(),
                notice: {
                  message: 'Booking marked as paid successfully!',
                  type: 'success',
                },
                redirectUrl: context.h.resourceUrl({ resourceId: 'Booking' }),
              }
            },
          },
        },
      },
    },
    {
      resource: { model: prisma.review, client: prisma },
      options: {
        id: 'Review',
        navigation: {
          name: 'Content Management',
          icon: 'Star',
        },
        listProperties: ['id', 'cabinId', 'guestId', 'rating', 'comment', 'createdAt'],
        showProperties: ['id', 'cabinId', 'guestId', 'rating', 'comment', 'createdAt'],
        editProperties: ['cabinId', 'guestId', 'rating', 'comment'],
        filterProperties: ['rating', 'cabinId', 'guestId', 'createdAt'],
        properties: {
          rating: {
            type: 'number',
            props: {
              min: 1,
              max: 5,
            },
          },
          comment: {
            type: 'textarea',
            props: {
              rows: 4,
            },
          },
        },
      },
    },
    {
      resource: { model: prisma.payment, client: prisma },
      options: {
        id: 'Payment',
        navigation: {
          name: 'Financial Management',
          icon: 'CreditCard',
        },
        listProperties: ['id', 'bookingId', 'amount', 'paymentMethod', 'status', 'createdAt'],
        showProperties: [
          'id', 'bookingId', 'amount', 'paymentMethod', 'status', 'transactionId', 'createdAt'
        ],
        editProperties: ['bookingId', 'amount', 'paymentMethod', 'status', 'transactionId'],
        filterProperties: ['status', 'paymentMethod', 'bookingId'],
        properties: {
          amount: {
            type: 'number',
            props: {
              step: 0.01,
            },
          },
        },
      },
    },
  ],
}

export { authenticate }

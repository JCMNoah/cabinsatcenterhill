import AdminJS from 'adminjs'
import express from 'express'
import { Database, Resource } from '@adminjs/prisma'  // using "next" adapter
import pkg from '@prisma/client'
const { PrismaClient } = pkg
import AdminJSExpress from '@adminjs/express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import session from 'express-session'

// Prisma setup
console.log('🔄 Initializing Prisma client...')
const prisma = new PrismaClient()

// Register Prisma adapter
console.log('🔄 Registering AdminJS Prisma adapter...')
import { Database, Resource } from '@adminjs/prisma'
AdminJS.registerAdapter({ Database, Resource })
console.log('✅ AdminJS Prisma adapter registered')

// Authentication function
const authenticate = async (email, password) => {
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
const adminJsConfig = {
  databases: [new Database(prisma)],
  rootPath: '/admin',
  branding: {
    companyName: 'Cabins at Center Hill',
    softwareBrothers: false,
    favicon: '/favicon.ico',
  },
  resources: [
    {
      resource: { model: 'user', client: prisma },
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
      resource: { model: 'cabin', client: prisma },
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
          },
          amenities: {
            type: 'textarea',
          },
          images: {
            type: 'textarea',
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
            handler: async (request, response, context) => {
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
      resource: { model: 'booking', client: prisma },
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
            handler: async (request, response, context) => {
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
      resource: { model: 'review', client: prisma },
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
          },
          comment: {
            type: 'textarea',
          },
        },
      },
    },
    {
      resource: { model: 'payment', client: prisma },
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
          },
        },
      },
    },
  ],
}

// Create AdminJS instance
console.log('🔄 Creating AdminJS instance...')
const adminJs = new AdminJS(adminJsConfig)
console.log('✅ AdminJS instance created')

// Create Express app
const app = express()

const sessionOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}

// Create AdminJS router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
  },
  null,
  sessionOptions
)

app.use(adminJs.options.rootPath, adminRouter)

// Start server
const PORT = process.env.ADMIN_PORT || 3001
app.listen(PORT, () => {
  console.log(`AdminJS is running on http://localhost:${PORT}${adminJs.options.rootPath}`)
})

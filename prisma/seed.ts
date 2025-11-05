import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.payment.deleteMany()
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.cabin.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleared existing data')

  // Create password hashes
  const adminPassword = await bcrypt.hash('admin123', 12)
  const hostPassword = await bcrypt.hash('host123', 12)
  const guest1Password = await bcrypt.hash('guest123', 12)
  const guest2Password = await bcrypt.hash('guest456', 12)

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@cabinsatcenterhill.com',
      passwordHash: adminPassword,
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  })

  // Create Host User
  const host = await prisma.user.create({
    data: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      passwordHash: hostPassword,
      role: 'host',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  })

  // Create Guest Users
  const guest1 = await prisma.user.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      passwordHash: guest1Password,
      role: 'guest',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
  })

  const guest2 = await prisma.user.create({
    data: {
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      passwordHash: guest2Password,
      role: 'guest',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
    },
  })

  console.log('👥 Created users')

  // Create Cabins
  const cabin1 = await prisma.cabin.create({
    data: {
      title: 'Lakefront Paradise Cabin',
      description: 'A stunning lakefront cabin with panoramic views of Center Hill Lake. Perfect for families and groups looking for a peaceful retreat with modern amenities and direct lake access.',
      location: 'Center Hill Lake, Tennessee',
      pricePerNight: 250.00,
      maxGuests: 8,
      bedrooms: 3,
      bathrooms: 2,
      amenities: [
        'WiFi',
        'Kitchen',
        'Washer/Dryer',
        'Hot Tub',
        'Fire Pit',
        'Boat Dock',
        'Fishing Equipment',
        'BBQ Grill',
        'Air Conditioning',
        'Heating'
      ],
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
      ],
      hostId: host.id,
      isFeatured: true,
      status: 'active',
    },
  })

  const cabin2 = await prisma.cabin.create({
    data: {
      title: 'Cozy Mountain Retreat',
      description: 'A charming mountain cabin nestled in the hills overlooking Center Hill Lake. Features rustic charm with modern comforts, perfect for couples or small families seeking tranquility.',
      location: 'Smithville, Tennessee',
      pricePerNight: 180.00,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenities: [
        'WiFi',
        'Kitchen',
        'Fireplace',
        'Hiking Trails',
        'BBQ Grill',
        'Air Conditioning',
        'Heating',
        'Coffee Maker',
        'Board Games'
      ],
      images: [
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop'
      ],
      hostId: host.id,
      isFeatured: false,
      status: 'active',
    },
  })

  console.log('🏠 Created cabins')

  // Create Bookings
  const booking1 = await prisma.booking.create({
    data: {
      cabinId: cabin1.id,
      guestId: guest1.id,
      checkIn: new Date('2024-12-15'),
      checkOut: new Date('2024-12-18'),
      totalPrice: 750.00, // 3 nights * $250
      status: 'completed',
    },
  })

  const booking2 = await prisma.booking.create({
    data: {
      cabinId: cabin2.id,
      guestId: guest2.id,
      checkIn: new Date('2024-11-20'),
      checkOut: new Date('2024-11-23'),
      totalPrice: 540.00, // 3 nights * $180
      status: 'completed',
    },
  })

  const booking3 = await prisma.booking.create({
    data: {
      cabinId: cabin1.id,
      guestId: guest2.id,
      checkIn: new Date('2024-12-25'),
      checkOut: new Date('2024-12-30'),
      totalPrice: 1250.00, // 5 nights * $250
      status: 'confirmed',
    },
  })

  console.log('📅 Created bookings')

  // Create Payments
  await prisma.payment.create({
    data: {
      bookingId: booking1.id,
      amount: 750.00,
      paymentMethod: 'Stripe',
      status: 'paid',
      transactionId: 'pi_1234567890abcdef',
    },
  })

  await prisma.payment.create({
    data: {
      bookingId: booking2.id,
      amount: 540.00,
      paymentMethod: 'PayPal',
      status: 'paid',
      transactionId: 'PAYID-ABCD1234',
    },
  })

  await prisma.payment.create({
    data: {
      bookingId: booking3.id,
      amount: 1250.00,
      paymentMethod: 'Stripe',
      status: 'paid',
      transactionId: 'pi_0987654321fedcba',
    },
  })

  console.log('💳 Created payments')

  // Create Reviews
  await prisma.review.create({
    data: {
      cabinId: cabin1.id,
      guestId: guest1.id,
      rating: 5,
      comment: 'Absolutely amazing cabin! The lake views were breathtaking and the amenities were top-notch. The hot tub was perfect after a day of fishing. John was an excellent host and very responsive. Highly recommend!',
    },
  })

  await prisma.review.create({
    data: {
      cabinId: cabin2.id,
      guestId: guest2.id,
      rating: 4,
      comment: 'Great little cabin for a peaceful getaway. The location was perfect for hiking and the cabin was clean and comfortable. Only minor issue was the WiFi was a bit slow, but that actually helped us disconnect and enjoy nature more!',
    },
  })

  console.log('⭐ Created reviews')

  console.log('✅ Database seeded successfully!')
  console.log(`
📊 Summary:
- 👤 Users: 4 (1 admin, 1 host, 2 guests)
- 🏠 Cabins: 2 (both active, 1 featured)
- 📅 Bookings: 3 (2 completed, 1 confirmed)
- 💳 Payments: 3 (all paid)
- ⭐ Reviews: 2
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

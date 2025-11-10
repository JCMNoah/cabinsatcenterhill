const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAdminSetup() {
  console.log('🧪 Testing AdminJS Setup...\n')

  try {
    // Test 1: Database Connection
    console.log('1. Testing database connection...')
    await prisma.$connect()
    console.log('   ✅ Database connection successful')

    // Test 2: Check if tables exist
    console.log('2. Checking database tables...')
    const tableChecks = await Promise.all([
      prisma.user.count(),
      prisma.cabin.count(),
      prisma.booking.count(),
      prisma.review.count(),
      prisma.payment.count(),
    ])
    console.log('   ✅ All tables exist and accessible')

    // Test 3: Check for admin users
    console.log('3. Checking for admin users...')
    const adminUsers = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true, name: true, email: true, createdAt: true }
    })

    if (adminUsers.length === 0) {
      console.log('   ⚠️  No admin users found')
      console.log('   💡 Run: pnpm admin:create')
    } else {
      console.log(`   ✅ Found ${adminUsers.length} admin user(s):`)
      adminUsers.forEach(admin => {
        console.log(`      - ${admin.name} (${admin.email})`)
      })
    }

    // Test 4: Check sample data
    console.log('4. Checking sample data...')
    const [userCount, cabinCount, bookingCount] = tableChecks
    
    if (userCount === 0) {
      console.log('   ⚠️  No users found - consider running: pnpm db:seed')
    } else {
      console.log(`   ✅ Found ${userCount} users`)
    }

    if (cabinCount === 0) {
      console.log('   ⚠️  No cabins found - consider running: pnpm db:seed')
    } else {
      console.log(`   ✅ Found ${cabinCount} cabins`)
    }

    if (bookingCount === 0) {
      console.log('   ⚠️  No bookings found - consider running: pnpm db:seed')
    } else {
      console.log(`   ✅ Found ${bookingCount} bookings`)
    }

    // Test 5: Check environment variables
    console.log('5. Checking environment variables...')
    
    if (!process.env.DATABASE_URL) {
      console.log('   ❌ DATABASE_URL not set')
    } else {
      console.log('   ✅ DATABASE_URL is set')
    }

    if (!process.env.NEXTAUTH_SECRET) {
      console.log('   ⚠️  NEXTAUTH_SECRET not set (recommended for production)')
    } else {
      console.log('   ✅ NEXTAUTH_SECRET is set')
    }

    // Test 6: Test bcrypt functionality
    console.log('6. Testing password hashing...')
    const testPassword = 'test123'
    const hash = await bcrypt.hash(testPassword, 12)
    const isValid = await bcrypt.compare(testPassword, hash)
    
    if (isValid) {
      console.log('   ✅ Password hashing working correctly')
    } else {
      console.log('   ❌ Password hashing failed')
    }

    console.log('\n🎉 Setup Test Complete!')
    console.log('\n📋 Next Steps:')
    
    if (adminUsers.length === 0) {
      console.log('   1. Create an admin user: pnpm admin:create')
    }
    
    console.log('   2. Start the admin panel: pnpm admin')
    console.log('   3. Visit: http://localhost:3001/admin')
    
    if (userCount === 0) {
      console.log('   4. (Optional) Add sample data: pnpm db:seed')
    }

  } catch (error) {
    console.error('❌ Setup test failed:', error.message)
    
    if (error.code === 'P1001') {
      console.log('\n💡 Database connection failed. Check:')
      console.log('   - Is PostgreSQL running?')
      console.log('   - Is DATABASE_URL correct in .env?')
      console.log('   - Have you run: pnpm db:migrate?')
    }
  } finally {
    await prisma.$disconnect()
  }
}

testAdminSetup()

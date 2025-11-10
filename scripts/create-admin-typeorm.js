import "reflect-metadata"
import { AppDataSource } from '../src/data-source.js'
import { User, UserRole } from '../src/entities/User.js'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function createAdmin() {
  try {
    console.log('🔧 Creating admin user...\n')

    // Initialize TypeORM
    await AppDataSource.initialize()
    const userRepository = AppDataSource.getRepository(User)

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { role: UserRole.ADMIN }
    })

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:')
      console.log(`   Email: ${existingAdmin.email}`)
      console.log(`   Name: ${existingAdmin.name}`)
      console.log('\nIf you want to create another admin, please continue.\n')
    }

    // Get admin details
    const name = await question('Enter admin name: ')
    const email = await question('Enter admin email: ')
    const password = await question('Enter admin password: ')

    if (!name || !email || !password) {
      console.log('❌ All fields are required!')
      process.exit(1)
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('❌ Please enter a valid email address!')
      process.exit(1)
    }

    // Check if user with email already exists
    const existingUser = await userRepository.findOne({ where: { email } })
    if (existingUser) {
      console.log('❌ User with this email already exists!')
      process.exit(1)
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create admin user
    const admin = userRepository.create({
      name,
      email,
      passwordHash,
      role: UserRole.ADMIN
    })

    await userRepository.save(admin)

    console.log('\n✅ Admin user created successfully!')
    console.log(`   Name: ${admin.name}`)
    console.log(`   Email: ${admin.email}`)
    console.log(`   Role: ${admin.role}`)
    console.log(`   ID: ${admin.id}`)
    console.log('\nYou can now log in to the admin panel with these credentials.')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  } finally {
    rl.close()
    await AppDataSource.destroy()
  }
}

// Run the script
createAdmin()

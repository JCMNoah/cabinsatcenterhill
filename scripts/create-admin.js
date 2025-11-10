import "reflect-metadata"
import { AppDataSource } from '../src/data-source.js'
import { User, UserRole } from '../src/entities/User.js'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createAdmin() {
  try {
    console.log('🔧 Creating Admin User for AdminJS Panel\n')

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    })

    if (existingAdmin) {
      console.log('⚠️  An admin user already exists:')
      console.log(`   Email: ${existingAdmin.email}`)
      console.log(`   Name: ${existingAdmin.name}`)
      
      const overwrite = await question('\nDo you want to create another admin? (y/N): ')
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('✅ Keeping existing admin user.')
        rl.close()
        return
      }
    }

    // Get admin details
    const name = await question('Enter admin name: ')
    const email = await question('Enter admin email: ')
    
    // Hide password input (basic implementation)
    process.stdout.write('Enter admin password: ')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    
    let password = ''
    
    const passwordPromise = new Promise((resolve) => {
      process.stdin.on('data', (char) => {
        char = char.toString()
        
        if (char === '\r' || char === '\n') {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\n')
          resolve(password)
        } else if (char === '\u0003') {
          // Ctrl+C
          process.exit()
        } else if (char === '\u007f') {
          // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1)
            process.stdout.write('\b \b')
          }
        } else {
          password += char
          process.stdout.write('*')
        }
      })
    })
    
    password = await passwordPromise

    if (!name || !email || !password) {
      console.log('❌ All fields are required!')
      rl.close()
      return
    }

    if (password.length < 6) {
      console.log('❌ Password must be at least 6 characters long!')
      rl.close()
      return
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('❌ A user with this email already exists!')
      rl.close()
      return
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'admin',
      }
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`   ID: ${admin.id}`)
    console.log(`   Name: ${admin.name}`)
    console.log(`   Email: ${admin.email}`)
    console.log(`   Role: ${admin.role}`)
    console.log('\n🚀 You can now log in to the AdminJS panel at: http://localhost:3001/admin')

  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createAdmin()

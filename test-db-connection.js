import { config } from 'dotenv'
import pg from 'pg'
const { Client } = pg

// Load environment variables
config()

async function testConnection() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL)

  // Try with DATABASE_URL first
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  try {
    console.log('🔄 Testing database connection...')
    await client.connect()
    console.log('✅ Database connection successful!')
    
    const result = await client.query('SELECT NOW()')
    console.log('Current time from database:', result.rows[0].now)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('Full error:', error)
  } finally {
    await client.end()
  }
}

testConnection()

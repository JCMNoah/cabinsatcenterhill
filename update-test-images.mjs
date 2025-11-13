/**
 * Script to update a cabin with test images
 * Run with: node update-test-images.js
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Test images from Unsplash (free to use)
const testImages = [
  'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80', // Main cabin exterior
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',  // Cabin by lake
  'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',     // Cozy interior
  'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80',  // Lake view
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',  // Mountain landscape
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',  // Mountain view
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80'   // Sunset lake
]

async function updateCabinImages() {
  try {
    console.log('🔄 Updating cabin with test images...')
    
    // Update the "Lakeside Retreat" cabin
    const { data, error } = await supabase
      .from('cabins')
      .update({ 
        images: testImages,
        updated_at: new Date().toISOString()
      })
      .eq('id', '550e8400-e29b-41d4-a716-446655440101')
      .select()
      .single()

    if (error) {
      throw error
    }

    console.log('✅ Successfully updated cabin:', data.title)
    console.log('📸 Added', testImages.length, 'test images')
    console.log('\n🎉 You can now view the cabin at: http://localhost:3000/cabins/' + data.id)
    
  } catch (error) {
    console.error('❌ Error updating cabin:', error.message)
    process.exit(1)
  }
}

updateCabinImages()


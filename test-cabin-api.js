// Simple test script to verify cabin API endpoints
// Run with: node test-cabin-api.js

const BASE_URL = 'http://localhost:3000';

async function testAPI(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    console.log(`\n🧪 Testing ${method} ${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      console.log(`❌ Failed: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log('Error:', errorText);
      return null;
    }
    
    const result = await response.json();
    console.log(`✅ Success: ${response.status}`);
    
    if (Array.isArray(result)) {
      console.log(`📊 Returned ${result.length} items`);
      if (result.length > 0) {
        console.log('Sample item:', JSON.stringify(result[0], null, 2));
      }
    } else if (result.data) {
      if (Array.isArray(result.data)) {
        console.log(`📊 Returned ${result.data.length} items (total: ${result.total || 'unknown'})`);
        if (result.data.length > 0) {
          console.log('Sample item:', JSON.stringify(result.data[0], null, 2));
        }
      } else {
        console.log('Data:', JSON.stringify(result.data, null, 2));
      }
    } else {
      console.log('Result:', JSON.stringify(result, null, 2));
    }
    
    return result;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

async function runTests() {
  console.log('🚀 Starting Cabin API Tests...');
  
  // Test public cabin endpoints
  console.log('\n=== PUBLIC CABIN ENDPOINTS ===');
  await testAPI('/api/cabins');
  await testAPI('/api/cabins?featured=true');
  await testAPI('/api/cabins?status=active');
  
  // Test admin cabin endpoints
  console.log('\n=== ADMIN CABIN ENDPOINTS ===');
  await testAPI('/api/admin/cabins');
  await testAPI('/api/admin/cabins?page=1&perPage=5');
  
  // Test individual cabin
  console.log('\n=== INDIVIDUAL CABIN ENDPOINTS ===');
  const cabins = await testAPI('/api/cabins');
  if (cabins && cabins.length > 0) {
    const firstCabin = cabins[0];
    await testAPI(`/api/cabins/${firstCabin.id}`);
    await testAPI(`/api/admin/cabins/${firstCabin.id}`);
  }
  
  // Test cabin creation (admin)
  console.log('\n=== CABIN CREATION TEST ===');
  const newCabin = {
    title: 'Test Cabin',
    description: 'A test cabin for API testing',
    location: 'Test Location, TN',
    price_per_night: 150.00,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen'],
    images: ['https://example.com/test.jpg'],
    host_id: '550e8400-e29b-41d4-a716-446655440004',
    status: 'active',
    is_featured: false
  };
  
  const createdCabin = await testAPI('/api/admin/cabins', 'POST', newCabin);
  
  if (createdCabin && createdCabin.data) {
    const cabinId = createdCabin.data.id;
    console.log(`\n📝 Created cabin with ID: ${cabinId}`);
    
    // Test cabin update
    console.log('\n=== CABIN UPDATE TEST ===');
    const updateData = {
      title: 'Updated Test Cabin',
      price_per_night: 175.00
    };
    await testAPI(`/api/admin/cabins/${cabinId}`, 'PUT', updateData);
    
    // Test cabin deletion
    console.log('\n=== CABIN DELETION TEST ===');
    await testAPI(`/api/admin/cabins/${cabinId}`, 'DELETE');
  }
  
  console.log('\n✨ Tests completed!');
}

// Run the tests
runTests().catch(console.error);

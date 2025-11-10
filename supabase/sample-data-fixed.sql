-- Sample data for testing the admin dashboard
-- Run this AFTER you've run schema-fixed.sql

-- Insert sample users (these can be created independently of auth.users)
INSERT INTO public.users (id, email, name, role, phone, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@cabins.com', 'Admin User', 'admin', '+1-555-0001', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'john@example.com', 'John Smith', 'guest', '+1-555-0002', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'jane@example.com', 'Jane Doe', 'guest', '+1-555-0003', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'bob@example.com', 'Bob Johnson', 'host', '+1-555-0004', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'sarah@example.com', 'Sarah Wilson', 'host', '+1-555-0005', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample cabins
INSERT INTO public.cabins (id, title, description, location, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, host_id, is_featured, status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440101', 'Lakeside Retreat', 'Beautiful lakeside cabin with stunning views and private dock. Perfect for families looking to enjoy water activities and peaceful surroundings.', 'Center Hill Lake, Tennessee', 250.00, 6, 3, 2,
 '{"WiFi", "Hot Tub", "Fireplace", "Full Kitchen", "Lake Access", "Private Dock", "Kayaks", "Fire Pit"}',
 '{"https://images.unsplash.com/photo-1449824913935-59a10b8d2000", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}',
 '550e8400-e29b-41d4-a716-446655440004', true, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440102', 'Mountain View Lodge', 'Cozy mountain cabin perfect for families. Features panoramic mountain views and easy access to hiking trails.', 'Center Hill Lake, Tennessee', 180.00, 4, 2, 1,
 '{"WiFi", "Fireplace", "Kitchen", "Deck", "Hiking Trails", "Mountain Views", "BBQ Grill"}',
 '{"https://images.unsplash.com/photo-1470770841072-f978cf4d019e", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}',
 '550e8400-e29b-41d4-a716-446655440004', false, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440103', 'Rustic Hideaway', 'Authentic rustic experience in the woods. Perfect for couples seeking a romantic getaway surrounded by nature.', 'Center Hill Lake, Tennessee', 120.00, 2, 1, 1,
 '{"Fireplace", "Basic Kitchen", "Nature Trails", "Romantic Setting", "Secluded Location"}',
 '{"https://images.unsplash.com/photo-1441974231531-c6227db76b6e"}',
 '550e8400-e29b-41d4-a716-446655440005', false, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440104', 'Premium Waterfront', 'Luxury cabin right on the water with private dock and boat rental. The ultimate lakeside experience with all modern amenities.', 'Center Hill Lake, Tennessee', 350.00, 8, 4, 3,
 '{"WiFi", "Hot Tub", "Fireplace", "Full Kitchen", "Private Dock", "Boat Rental", "Luxury Furnishing", "Lake Views", "Game Room"}',
 '{"https://images.unsplash.com/photo-1449824913935-59a10b8d2000", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"}',
 '550e8400-e29b-41d4-a716-446655440005', true, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440105', 'Family Fun Lodge', 'Large family-friendly cabin with game room and multiple bedrooms. Great for family reunions and group getaways.', 'Center Hill Lake, Tennessee', 220.00, 10, 5, 3,
 '{"WiFi", "Game Room", "Full Kitchen", "Multiple Bedrooms", "Large Deck", "BBQ Area", "Family Friendly"}',
 '{"https://images.unsplash.com/photo-1441974231531-c6227db76b6e", "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"}',
 '550e8400-e29b-41d4-a716-446655440004', false, 'active', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample bookings
INSERT INTO public.bookings (id, cabin_id, guest_id, check_in, check_out, total_price, guest_count, special_requests, status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440002', '2024-12-15', '2024-12-18', 750.00, 4, 'Late check-in requested around 8 PM', 'confirmed', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440003', '2024-12-20', '2024-12-23', 540.00, 2, NULL, 'confirmed', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440002', '2025-01-05', '2025-01-08', 1050.00, 6, 'Anniversary celebration - please provide champagne', 'pending', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440204', '550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003', '2024-11-25', '2024-11-27', 240.00, 2, NULL, 'completed', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440205', '550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440002', '2024-12-28', '2025-01-02', 1100.00, 8, 'Family reunion - need extra towels and bedding', 'confirmed', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO public.reviews (id, cabin_id, guest_id, booking_id, rating, comment, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440204', 5, 'Amazing rustic experience! Perfect for a romantic getaway. The cabin was clean, cozy, and exactly what we needed to disconnect and enjoy nature.', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440201', 4, 'Great cabin with beautiful mountain views. Very clean and comfortable. The kids loved the deck and the hiking trails nearby. Would definitely book again!', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify the data was inserted
SELECT 'Users' as table_name, COUNT(*) as record_count FROM public.users
UNION ALL
SELECT 'Cabins' as table_name, COUNT(*) as record_count FROM public.cabins
UNION ALL
SELECT 'Bookings' as table_name, COUNT(*) as record_count FROM public.bookings
UNION ALL
SELECT 'Reviews' as table_name, COUNT(*) as record_count FROM public.reviews
ORDER BY table_name;

-- Sample data for testing the admin dashboard
-- Run this AFTER you've run schema.sql and rls-policies.sql

-- Insert sample users
INSERT INTO public.users (id, email, name, role, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@cabins.com', 'Admin User', 'admin', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'john@example.com', 'John Smith', 'guest', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'jane@example.com', 'Jane Doe', 'guest', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'bob@example.com', 'Bob Johnson', 'host', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample cabins
INSERT INTO public.cabins (id, title, description, location, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, host_id, is_featured, status, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440101', 'Lakeside Retreat', 'Beautiful lakeside cabin with stunning views', 'Center Hill Lake, Tennessee', 250.00, 6, 3, 2,
 '{"WiFi", "Hot Tub", "Fireplace", "Kitchen", "Lake Access"}',
 '{"https://example.com/cabin1-1.jpg", "https://example.com/cabin1-2.jpg"}',
 '550e8400-e29b-41d4-a716-446655440004', true, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440102', 'Mountain View Lodge', 'Cozy mountain cabin perfect for families', 'Center Hill Lake, Tennessee', 180.00, 4, 2, 1,
 '{"WiFi", "Fireplace", "Kitchen", "Deck"}',
 '{"https://example.com/cabin2-1.jpg", "https://example.com/cabin2-2.jpg"}',
 '550e8400-e29b-41d4-a716-446655440004', false, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440103', 'Rustic Hideaway', 'Authentic rustic experience in the woods', 'Center Hill Lake, Tennessee', 120.00, 2, 1, 1,
 '{"Fireplace", "Basic Kitchen", "Nature Trails"}',
 '{"https://example.com/cabin3-1.jpg"}',
 '550e8400-e29b-41d4-a716-446655440004', false, 'active', NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440104', 'Premium Waterfront', 'Luxury cabin right on the water with private dock', 'Center Hill Lake, Tennessee', 350.00, 8, 4, 3,
 '{"WiFi", "Hot Tub", "Fireplace", "Full Kitchen", "Private Dock", "Boat Rental"}',
 '{"https://example.com/cabin4-1.jpg", "https://example.com/cabin4-2.jpg", "https://example.com/cabin4-3.jpg"}',
 '550e8400-e29b-41d4-a716-446655440004', true, 'active', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample bookings
INSERT INTO public.bookings (id, cabin_id, guest_id, check_in, check_out, total_price, status, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440002', '2024-12-15', '2024-12-18', 750.00, 'confirmed', NOW()),
('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440003', '2024-12-20', '2024-12-23', 540.00, 'confirmed', NOW()),
('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440002', '2025-01-05', '2025-01-08', 1050.00, 'pending', NOW()),
('550e8400-e29b-41d4-a716-446655440204', '550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003', '2024-11-25', '2024-11-27', 240.00, 'completed', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO public.reviews (id, cabin_id, guest_id, rating, comment, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003', 5, 'Amazing rustic experience! Perfect for a romantic getaway.', NOW()),
('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440002', 4, 'Great cabin with beautiful mountain views. Very clean and comfortable.', NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify the data was inserted
SELECT 'Users' as table_name, COUNT(*) as record_count FROM public.users
UNION ALL
SELECT 'Cabins' as table_name, COUNT(*) as record_count FROM public.cabins
UNION ALL
SELECT 'Bookings' as table_name, COUNT(*) as record_count FROM public.bookings
UNION ALL
SELECT 'Reviews' as table_name, COUNT(*) as record_count FROM public.reviews;

-- Insert sample users (these would normally be created through Supabase Auth)
-- Note: In production, users are created through the auth.users table via Supabase Auth
-- This is just for development/testing purposes

-- Insert sample users into public.users table
-- (In real app, these would be created via Supabase Auth signup)
INSERT INTO public.users (id, name, email, role, created_at) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Admin User', 'admin@cabinsatcenterhill.com', 'admin', NOW()),
    ('550e8400-e29b-41d4-a716-446655440002', 'John Smith', 'john.smith@example.com', 'host', NOW()),
    ('550e8400-e29b-41d4-a716-446655440003', 'Sarah Johnson', 'sarah.johnson@example.com', 'guest', NOW()),
    ('550e8400-e29b-41d4-a716-446655440004', 'Mike Davis', 'mike.davis@example.com', 'guest', NOW()),
    ('550e8400-e29b-41d4-a716-446655440005', 'Emily Wilson', 'emily.wilson@example.com', 'host', NOW());

-- Insert sample cabins
INSERT INTO public.cabins (id, title, description, location, price_per_night, max_guests, bedrooms, bathrooms, amenities, images, host_id, is_featured, status, created_at) VALUES
    (
        '660e8400-e29b-41d4-a716-446655440001',
        'Lakefront Cabin Retreat',
        'Beautiful lakefront cabin with stunning views and modern amenities. Perfect for a peaceful getaway with family or friends.',
        'Center Hill Lake, Tennessee',
        250.00,
        6,
        3,
        2,
        ARRAY['WiFi', 'Kitchen', 'Fireplace', 'Lake Access', 'Boat Dock', 'Hot Tub'],
        ARRAY['/assets/images/cabins/cabin1-1.jpg', '/assets/images/cabins/cabin1-2.jpg', '/assets/images/cabins/cabin1-3.jpg'],
        '550e8400-e29b-41d4-a716-446655440002',
        true,
        'active',
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440002',
        'Mountain View Lodge',
        'Cozy mountain lodge with panoramic views and rustic charm. Ideal for couples or small families seeking tranquility.',
        'Smithville, Tennessee',
        180.00,
        4,
        2,
        1,
        ARRAY['WiFi', 'Kitchen', 'Fireplace', 'Mountain Views', 'Hiking Trails', 'Pet Friendly'],
        ARRAY['/assets/images/cabins/cabin2-1.jpg', '/assets/images/cabins/cabin2-2.jpg'],
        '550e8400-e29b-41d4-a716-446655440005',
        false,
        'active',
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440003',
        'Luxury Waterfront Villa',
        'Spacious luxury villa right on the water with premium amenities and breathtaking sunset views.',
        'Center Hill Lake, Tennessee',
        450.00,
        10,
        5,
        3,
        ARRAY['WiFi', 'Full Kitchen', 'Multiple Fireplaces', 'Private Beach', 'Boat Dock', 'Hot Tub', 'Game Room', 'BBQ Grill'],
        ARRAY['/assets/images/cabins/cabin3-1.jpg', '/assets/images/cabins/cabin3-2.jpg', '/assets/images/cabins/cabin3-3.jpg', '/assets/images/cabins/cabin3-4.jpg'],
        '550e8400-e29b-41d4-a716-446655440002',
        true,
        'active',
        NOW()
    );

-- Insert sample bookings
INSERT INTO public.bookings (id, cabin_id, guest_id, check_in, check_out, total_price, status, created_at) VALUES
    (
        '770e8400-e29b-41d4-a716-446655440001',
        '660e8400-e29b-41d4-a716-446655440001',
        '550e8400-e29b-41d4-a716-446655440003',
        '2024-12-15',
        '2024-12-18',
        750.00,
        'confirmed',
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440002',
        '660e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440004',
        '2024-12-20',
        '2024-12-23',
        540.00,
        'pending',
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440003',
        '660e8400-e29b-41d4-a716-446655440003',
        '550e8400-e29b-41d4-a716-446655440003',
        '2025-01-05',
        '2025-01-08',
        1350.00,
        'confirmed',
        NOW()
    );

-- Insert sample reviews
INSERT INTO public.reviews (id, cabin_id, guest_id, rating, comment, created_at) VALUES
    (
        '880e8400-e29b-41d4-a716-446655440001',
        '660e8400-e29b-41d4-a716-446655440001',
        '550e8400-e29b-41d4-a716-446655440003',
        5,
        'Absolutely amazing cabin! The lake views were breathtaking and the amenities were top-notch. The hot tub was perfect after a day on the water. Highly recommend!',
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440002',
        '660e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440004',
        4,
        'Great mountain retreat! Very peaceful and cozy. The fireplace was perfect for the cool evenings. Only minor issue was the WiFi was a bit slow, but that added to the disconnect from city life.',
        NOW()
    );

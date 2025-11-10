-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure schema exists
CREATE SCHEMA IF NOT EXISTS public;

-- Drop tables first (be careful, this deletes data!)
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.cabins CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop types if they exist (optional, for clean rebuild)
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS cabin_status CASCADE;
DROP TYPE IF EXISTS booking_status CASCADE;

-- Create custom types
CREATE TYPE user_role AS ENUM ('guest', 'host', 'admin');
CREATE TYPE cabin_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Users table (can work independently of auth.users for admin purposes)
CREATE TABLE public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role user_role DEFAULT 'guest',
    avatar_url TEXT,
    phone TEXT,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cabins table
CREATE TABLE public.cabins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    max_guests INTEGER NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    host_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    status cabin_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cabin_id UUID REFERENCES public.cabins(id) ON DELETE CASCADE NOT NULL,
    guest_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    guest_count INTEGER DEFAULT 1,
    special_requests TEXT,
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cabin_id UUID REFERENCES public.cabins(id) ON DELETE CASCADE NOT NULL,
    guest_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cabin_id, guest_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_cabins_host_id ON public.cabins(host_id);
CREATE INDEX idx_cabins_status ON public.cabins(status);
CREATE INDEX idx_bookings_cabin_id ON public.bookings(cabin_id);
CREATE INDEX idx_bookings_guest_id ON public.bookings(guest_id);
CREATE INDEX idx_bookings_dates ON public.bookings(check_in, check_out);
CREATE INDEX idx_reviews_cabin_id ON public.reviews(cabin_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cabins_updated_at BEFORE UPDATE ON public.cabins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (auth_user_id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        'guest'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies (basic ones for now)
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = auth_user_id);
CREATE POLICY "Admins can do everything on users" ON public.users FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Anyone can view active cabins" ON public.cabins FOR SELECT USING (status = 'active');
CREATE POLICY "Hosts can manage their cabins" ON public.cabins FOR ALL USING (
    host_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid())
);
CREATE POLICY "Admins can manage all cabins" ON public.cabins FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Users can view their bookings" ON public.bookings FOR SELECT USING (
    guest_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid())
    OR EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (
    guest_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid())
);

CREATE POLICY "Admins can manage all bookings" ON public.bookings FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for their bookings" ON public.reviews FOR INSERT WITH CHECK (
    guest_id IN (SELECT id FROM public.users WHERE auth_user_id = auth.uid())
);
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

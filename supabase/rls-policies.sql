-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can view their own profile and public profiles
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view public profiles" ON public.users
    FOR SELECT USING (role IN ('host', 'admin'));

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Admins can do everything with users
CREATE POLICY "Admins can manage all users" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Cabins table policies
-- Everyone can view active cabins
CREATE POLICY "Anyone can view active cabins" ON public.cabins
    FOR SELECT USING (status = 'active');

-- Hosts can view their own cabins (any status)
CREATE POLICY "Hosts can view own cabins" ON public.cabins
    FOR SELECT USING (host_id = auth.uid());

-- Hosts can create cabins
CREATE POLICY "Hosts can create cabins" ON public.cabins
    FOR INSERT WITH CHECK (
        host_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('host', 'admin')
        )
    );

-- Hosts can update their own cabins
CREATE POLICY "Hosts can update own cabins" ON public.cabins
    FOR UPDATE USING (host_id = auth.uid());

-- Hosts can delete their own cabins
CREATE POLICY "Hosts can delete own cabins" ON public.cabins
    FOR DELETE USING (host_id = auth.uid());

-- Admins can manage all cabins
CREATE POLICY "Admins can manage all cabins" ON public.cabins
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Bookings table policies
-- Guests can view their own bookings
CREATE POLICY "Guests can view own bookings" ON public.bookings
    FOR SELECT USING (guest_id = auth.uid());

-- Hosts can view bookings for their cabins
CREATE POLICY "Hosts can view cabin bookings" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.cabins 
            WHERE id = cabin_id AND host_id = auth.uid()
        )
    );

-- Guests can create bookings
CREATE POLICY "Guests can create bookings" ON public.bookings
    FOR INSERT WITH CHECK (
        guest_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role IN ('guest', 'host', 'admin')
        )
    );

-- Guests can update their own bookings (limited)
CREATE POLICY "Guests can update own bookings" ON public.bookings
    FOR UPDATE USING (guest_id = auth.uid());

-- Hosts can update bookings for their cabins
CREATE POLICY "Hosts can update cabin bookings" ON public.bookings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.cabins 
            WHERE id = cabin_id AND host_id = auth.uid()
        )
    );

-- Admins can manage all bookings
CREATE POLICY "Admins can manage all bookings" ON public.bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Reviews table policies
-- Everyone can view reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

-- Guests can create reviews for cabins they've booked
CREATE POLICY "Guests can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (
        guest_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.bookings 
            WHERE guest_id = auth.uid() 
            AND cabin_id = reviews.cabin_id 
            AND status = 'completed'
        )
    );

-- Guests can update their own reviews
CREATE POLICY "Guests can update own reviews" ON public.reviews
    FOR UPDATE USING (guest_id = auth.uid());

-- Guests can delete their own reviews
CREATE POLICY "Guests can delete own reviews" ON public.reviews
    FOR DELETE USING (guest_id = auth.uid());

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews" ON public.reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

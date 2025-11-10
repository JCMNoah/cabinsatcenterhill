-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('cabin-images', 'cabin-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('documents', 'documents', false, 10485760, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);

-- Storage policies for cabin-images bucket
-- Allow public read access to cabin images
CREATE POLICY "Public read access for cabin images" ON storage.objects
FOR SELECT USING (bucket_id = 'cabin-images');

-- Allow authenticated users to upload cabin images
CREATE POLICY "Authenticated users can upload cabin images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'cabin-images' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to update cabin images (simplified for now)
CREATE POLICY "Authenticated users can update cabin images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'cabin-images' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to delete cabin images (simplified for now)
CREATE POLICY "Authenticated users can delete cabin images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'cabin-images' AND
  auth.role() = 'authenticated'
);

-- Storage policies for avatars bucket
-- Allow public read access to avatars
CREATE POLICY "Public read access for avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Allow users to upload their own avatar
CREATE POLICY "Users can upload own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Storage policies for documents bucket (private)
-- Allow users to read their own documents
CREATE POLICY "Users can read own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to upload their own documents
CREATE POLICY "Users can upload own documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own documents
CREATE POLICY "Users can update own documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own documents
CREATE POLICY "Users can delete own documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow admins to access all documents
CREATE POLICY "Admins can access all documents" ON storage.objects
FOR ALL USING (
  bucket_id = 'documents' AND
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

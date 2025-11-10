# Supabase Setup Guide

This guide will help you set up Supabase as the backend for the Cabins at Center Hill booking application.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)
- pnpm, npm, or yarn package manager

## 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `cabins-at-center-hill`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## 2. Get Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 4. Set Up Database Schema

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase/schema.sql`
3. Click "Run" to execute the schema
4. Copy and paste the contents of `supabase/rls-policies.sql`
5. Click "Run" to set up Row Level Security
6. Copy and paste the contents of `supabase/seed.sql`
7. Click "Run" to add sample data

### Option B: Using Supabase CLI

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref your-project-ref
```

4. Push the schema:
```bash
supabase db push
```

## 5. Configure Authentication

1. Go to **Authentication** → **Settings** in Supabase dashboard
2. Configure **Site URL**: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (for production)

### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates if needed

### Optional: Enable Social Providers

You can enable Google, GitHub, etc. for social login:
1. Go to **Authentication** → **Providers**
2. Enable desired providers
3. Configure OAuth credentials

## 6. Set Up Storage (for Cabin Images)

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `cabin-images`
3. Set bucket to **Public** (for public image access)
4. Configure policies:

```sql
-- Allow public read access to cabin images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'cabin-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'cabin-images' AND
  auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "User update own uploads" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'cabin-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## 7. Install Dependencies

Install the required packages:

```bash
pnpm install
# or
npm install
```

## 8. Test the Setup

1. Start the development server:
```bash
pnpm dev
```

2. Test API endpoints:
   - Visit `http://localhost:3000/api/cabins`
   - Visit `http://localhost:3000/api/bookings`

3. Check Supabase connection:
   - Go to **Table Editor** in Supabase dashboard
   - Verify tables are created with sample data

## 9. Admin User Setup

To access the admin dashboard, you need an admin user:

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Create a new user with email `admin@cabinsatcenterhill.com`
3. Go to **Table Editor** → **users** table
4. Find the user and change `role` to `admin`

Or use SQL:
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@cabinsatcenterhill.com';
```

## 10. Production Deployment

### Vercel Deployment

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. Update Supabase Auth settings:
   - **Site URL**: `https://your-domain.vercel.app`
   - **Redirect URLs**: `https://your-domain.vercel.app/auth/callback`

### Database Migrations

For production updates:
1. Test changes in development
2. Export SQL from development
3. Run in production via Supabase dashboard

## Available Scripts

```bash
# Development
pnpm dev                 # Start Next.js dev server
pnpm build              # Build for production

# Database (if using Supabase CLI)
supabase start          # Start local Supabase
supabase stop           # Stop local Supabase
supabase db reset       # Reset local database
supabase gen types typescript --local > types/supabase.ts  # Generate types
```

## Troubleshooting

### Common Issues

1. **Connection Error**: Verify your Supabase URL and keys
2. **RLS Policies**: Check that policies are correctly set up
3. **Auth Issues**: Verify redirect URLs and site URL
4. **CORS Issues**: Check that your domain is allowed in Supabase settings

### Reset Database

To start fresh:
1. Go to **Settings** → **General** in Supabase dashboard
2. Scroll to "Danger Zone"
3. Click "Reset database password" if needed
4. Re-run the schema and seed scripts

## Next Steps

After setting up Supabase:

1. **Admin Dashboard**: Access at `/admin` (requires admin role)
2. **File Upload**: Upload cabin images via the admin dashboard
3. **Email Notifications**: Configure email templates in Supabase
4. **Analytics**: Set up analytics and monitoring
5. **Backup**: Configure automated backups

## Support

If you encounter issues:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Verify your environment variables
3. Check the browser console for errors
4. Review Supabase logs in the dashboard

# Cabins at Center Hill - Deployment Guide

## Overview

This guide covers the complete deployment process for the Cabins at Center Hill reservation platform, including Supabase backend setup, Next.js frontend deployment, and admin dashboard configuration.

## Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- Vercel account (for frontend deployment)
- Domain name (optional)

## 1. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name and database password
3. Wait for the project to be created (2-3 minutes)

### Database Setup

1. Navigate to the SQL Editor in your Supabase dashboard
2. Run the following SQL files in order:

```bash
# 1. Create the main schema
supabase/schema.sql

# 2. Set up Row Level Security policies
supabase/rls-policies.sql

# 3. Configure storage buckets
supabase/storage-setup.sql
```

### Environment Variables

1. Go to Settings > API in your Supabase dashboard
2. Copy the following values:
   - Project URL
   - Anon public key
   - Service role key (keep this secret!)

### Authentication Setup

1. Go to Authentication > Settings
2. Configure the following:
   - Site URL: `https://your-domain.com` (or localhost for development)
   - Redirect URLs: Add your production and development URLs
   - Email templates: Customize as needed

### Storage Configuration

1. Go to Storage in your Supabase dashboard
2. Verify that the following buckets were created:
   - `cabin-images` (public)
   - `avatars` (public)
   - `documents` (private)

## 2. Frontend Deployment (Vercel)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel --prod
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add all environment variables from `.env.local`
   - Redeploy the project

### Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Configure DNS records as instructed
5. Update Supabase auth settings with new domain

## 3. Admin Dashboard Setup

### Create Admin User

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Create a new user with admin role:

```sql
-- Insert admin user (run in SQL Editor)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@yourdomain.com',
  crypt('your_admin_password', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Create admin profile
INSERT INTO public.users (
  id,
  email,
  name,
  role,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@yourdomain.com'),
  'admin@yourdomain.com',
  'Admin User',
  'admin',
  now(),
  now()
);
```

### Access Admin Dashboard

1. Navigate to `https://your-domain.com/admin`
2. Login with admin credentials
3. Verify all resources are accessible:
   - Users
   - Cabins
   - Bookings
   - Reviews
   - Analytics

## 4. Testing & Verification

### Frontend Testing

1. Test user registration and login
2. Test cabin browsing and search
3. Test booking flow
4. Test review system
5. Test file uploads

### Admin Dashboard Testing

1. Test CRUD operations for all resources
2. Test bulk actions
3. Test analytics dashboard
4. Test user role management
5. Test cabin approval workflow

### Database Testing

1. Verify RLS policies are working
2. Test data relationships
3. Verify triggers and functions
4. Test storage permissions

## 5. Monitoring & Maintenance

### Supabase Monitoring

1. Monitor database performance in Supabase dashboard
2. Set up alerts for high usage
3. Monitor storage usage
4. Review authentication logs

### Vercel Monitoring

1. Monitor function execution times
2. Review deployment logs
3. Monitor bandwidth usage
4. Set up custom analytics

### Regular Maintenance

1. **Weekly**: Review user feedback and bug reports
2. **Monthly**: Analyze booking patterns and revenue
3. **Quarterly**: Review and update security policies
4. **Annually**: Backup database and review disaster recovery

## 6. Scaling Considerations

### Database Scaling

- Monitor connection pool usage
- Consider read replicas for heavy read workloads
- Implement database connection pooling
- Archive old booking data

### Frontend Scaling

- Implement CDN for static assets
- Add image optimization
- Consider server-side rendering for SEO
- Implement caching strategies

### Storage Scaling

- Monitor storage usage
- Implement image compression
- Consider external CDN for images
- Set up automated backups

## 7. Security Checklist

- [ ] All environment variables are secure
- [ ] RLS policies are properly configured
- [ ] Admin access is restricted
- [ ] File upload validation is in place
- [ ] HTTPS is enforced
- [ ] Database backups are configured
- [ ] Error logging is set up
- [ ] Rate limiting is implemented

## 8. Troubleshooting

### Common Issues

1. **Authentication errors**: Check Supabase auth settings and redirect URLs
2. **Database connection issues**: Verify environment variables and connection limits
3. **File upload failures**: Check storage bucket permissions and file size limits
4. **Admin dashboard access**: Verify user role and RLS policies

### Support Resources

- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
- React Admin Documentation: https://marmelab.com/react-admin/
- Vercel Documentation: https://vercel.com/docs

## 9. Backup & Recovery

### Database Backup

1. Enable automatic backups in Supabase
2. Set up daily backup schedule
3. Test restore procedures
4. Document recovery steps

### File Storage Backup

1. Set up automated storage backups
2. Consider cross-region replication
3. Test file recovery procedures
4. Document storage recovery steps

---

For additional support or questions, please refer to the project documentation or contact the development team.

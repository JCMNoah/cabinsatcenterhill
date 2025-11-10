# Database Setup Guide

This guide will help you set up the PostgreSQL database and Prisma ORM for the Cabins at Center Hill booking application.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- pnpm, npm, or yarn package manager

## 1. Install Dependencies

First, install all the required dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

## 2. Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE cabinsatcenterhill;
```

### Option B: Cloud Database (Recommended)

Use a cloud provider like:
- **Supabase** (free tier available)
- **Railway** (free tier available)
- **PlanetScale** (free tier available)
- **Neon** (free tier available)

## 3. Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your database connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/cabinsatcenterhill?schema=public"
```

For cloud databases, use the connection string provided by your provider.

## 4. Run Database Migrations

Generate the Prisma client and run migrations:

```bash
# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate
```

When prompted, give your migration a name like "init" or "initial_schema".

## 5. Seed the Database

Populate the database with sample data:

```bash
pnpm db:seed
```

This will create:
- 1 admin user (admin@cabinsatcenterhill.com / admin123)
- 1 host user (john.smith@example.com / host123)
- 2 guest users (sarah.johnson@example.com / guest123, mike.davis@example.com / guest456)
- 2 cabins with different amenities
- 3 bookings with payments
- 2 reviews

## 6. Verify Setup

You can verify the setup by:

1. **Using Prisma Studio** (visual database browser):
```bash
pnpm db:studio
```pnpm dev

2. **Testing API endpoints** (after starting the dev server):
```bash
pnpm dev
```

Then visit:
- `http://localhost:3000/api/cabins` - List all cabins
- `http://localhost:3000/api/bookings` - List all bookings

## Database Schema Overview

### Models

- **User**: Guests, hosts, and admins
- **Cabin**: Property listings with amenities and pricing
- **Booking**: Reservations with dates and pricing
- **Review**: Guest reviews with ratings
- **Payment**: Payment records linked to bookings

### Key Relationships

- Users can be hosts (own cabins) or guests (make bookings)
- Cabins belong to hosts and can have multiple bookings/reviews
- Bookings connect guests to cabins for specific dates
- Payments are linked to bookings
- Reviews are written by guests for cabins they've booked

## Available Scripts

```bash
# Development
pnpm dev                 # Start Next.js dev server
pnpm build              # Build for production

# Database
pnpm db:generate        # Generate Prisma client
pnpm db:migrate         # Run database migrations
pnpm db:seed           # Seed database with sample data
pnpm db:studio         # Open Prisma Studio
pnpm db:reset          # Reset database (careful!)

# Linting
pnpm lint              # Run ESLint
```

## Troubleshooting

### Common Issues

1. **Connection Error**: Verify your DATABASE_URL is correct
2. **Migration Fails**: Ensure PostgreSQL is running and accessible
3. **Seed Fails**: Make sure migrations have been run first

### Reset Database

If you need to start fresh:

```bash
pnpm db:reset
```

This will:
1. Drop all data
2. Re-run all migrations
3. Run the seed script

## Next Steps

After setting up the database:

1. **Authentication**: Implement NextAuth.js or similar
2. **File Upload**: Add Cloudinary or AWS S3 for images
3. **Payment Processing**: Integrate Stripe or PayPal
4. **Email**: Add email notifications for bookings
5. **Search**: Implement advanced search and filtering

## Production Deployment

For production:

1. Use a production PostgreSQL database
2. Set `NODE_ENV=production`
3. Use secure environment variables
4. Run migrations in production:
```bash
npx prisma migrate deploy
```

## Support

If you encounter issues:
1. Check the Prisma documentation: https://prisma.io/docs
2. Verify your PostgreSQL connection
3. Ensure all environment variables are set correctly

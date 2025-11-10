# AdminJS Admin Panel Setup Guide

This guide will help you set up and use the AdminJS admin panel for the Cabins at Center Hill booking application.

## 🚀 Quick Start

### 1. Prerequisites

Make sure you have completed the database setup first:
- PostgreSQL database running
- Prisma migrations completed (`pnpm db:migrate`)
- Database seeded with sample data (`pnpm db:seed`)

### 2. Create Your First Admin User

```bash
pnpm admin:create
```

Follow the prompts to create an admin user:
- Enter your name
- Enter your email
- Enter a secure password (minimum 6 characters)

### 3. Start the Admin Panel

```bash
# Start AdminJS server only
pnpm admin

# Or start both Next.js and AdminJS together
pnpm dev:all
```

### 4. Access the Admin Panel

Open your browser and go to: **http://localhost:3001/admin**

Log in with the admin credentials you just created.

## 📊 Admin Panel Features

### Dashboard
- **Overview Statistics**: Total cabins, bookings, users, and revenue
- **Cabins by Status**: Active, pending, and inactive cabin counts
- **Users by Role**: Guest, host, and admin user counts
- **Recent Bookings**: Latest 10 bookings with details

### User Management
- **View All Users**: List all guests, hosts, and admins
- **Edit User Details**: Update names, emails, roles, and avatars
- **Filter Users**: By role, creation date, name, or email
- **Security**: Password hashes are hidden from view

### Property Management (Cabins)
- **View All Cabins**: List with key details and status
- **Edit Cabin Details**: Update descriptions, pricing, amenities
- **Approve Cabins**: Custom action to approve pending cabins
- **Filter Cabins**: By status, location, price, host, or featured status
- **Rich Text Editor**: For cabin descriptions

### Booking Management
- **View All Bookings**: List with guest, cabin, and payment details
- **Mark as Paid**: Custom action to confirm payment and update status
- **Filter Bookings**: By status, dates, cabin, or guest
- **Date Management**: Easy date picker for check-in/check-out

### Content Management (Reviews)
- **View All Reviews**: List with ratings and comments
- **Moderate Reviews**: Edit or remove inappropriate content
- **Filter Reviews**: By rating, cabin, guest, or date

### Financial Management (Payments)
- **View All Payments**: List with amounts, methods, and status
- **Payment Tracking**: Transaction IDs and payment methods
- **Filter Payments**: By status, method, or booking

## 🔧 Custom Actions

### Approve Cabin
**Location**: Cabin detail page
**Purpose**: Change cabin status from "pending" to "active"
**Usage**: Click "Approve Cabin" button on any pending cabin

### Mark as Paid
**Location**: Booking detail page
**Purpose**: Confirm payment and update booking status
**What it does**:
- Updates booking status to "confirmed"
- Creates/updates payment record with "paid" status
- Generates admin transaction ID

## 🛠️ Development Commands

```bash
# Database commands
pnpm db:generate        # Generate Prisma client
pnpm db:migrate         # Run database migrations
pnpm db:seed           # Seed with sample data
pnpm db:studio         # Open Prisma Studio

# AdminJS commands
pnpm admin             # Start AdminJS server (production)
pnpm admin:dev         # Start AdminJS server (development with auto-reload)
pnpm admin:create      # Create new admin user
pnpm dev:all          # Start both Next.js and AdminJS

# Next.js commands
pnpm dev              # Start Next.js development server
pnpm build            # Build for production
pnpm start            # Start production server
```

## 🔒 Security Features

### Authentication
- **Admin-only Access**: Only users with `role="admin"` can log in
- **Secure Password Hashing**: Uses bcryptjs with salt rounds
- **Session Management**: PostgreSQL-backed sessions with expiration
- **CSRF Protection**: Built-in CSRF protection for forms

### Data Protection
- **Hidden Sensitive Fields**: Password hashes never displayed
- **Role-based Permissions**: Different access levels for different user types
- **Secure Cookies**: HTTP-only cookies in production

## 📝 Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Required
DATABASE_URL="postgresql://username:password@localhost:5432/cabinsatcenterhill"
NEXTAUTH_SECRET="your-secure-secret-key-here"

# Optional
ADMIN_PORT=3001  # Port for AdminJS server (default: 3001)
```

### Customization

The AdminJS configuration is in `lib/adminjs.ts`. You can customize:

- **Branding**: Company name, logo, colors
- **Navigation**: Menu structure and icons
- **Properties**: Which fields to show/hide/edit
- **Actions**: Custom buttons and workflows
- **Validation**: Field validation rules

## 🚨 Troubleshooting

### Common Issues

1. **"Cannot connect to database"**
   - Check your `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Run `pnpm db:migrate` to create tables

2. **"No admin user found"**
   - Run `pnpm admin:create` to create an admin user
   - Check that the user has `role="admin"`

3. **"Port 3001 already in use"**
   - Change `ADMIN_PORT` in `.env`
   - Or kill the process using port 3001

4. **"Session store error"**
   - Ensure PostgreSQL connection is working
   - The `admin_sessions` table will be created automatically

### Reset Admin Access

If you're locked out of the admin panel:

```bash
# Create a new admin user
pnpm admin:create

# Or reset the database (WARNING: deletes all data)
pnpm db:reset
pnpm db:seed
```

## 🔄 Production Deployment

### Environment Setup
1. Use a production PostgreSQL database
2. Set secure environment variables
3. Use HTTPS in production
4. Set `NODE_ENV=production`

### Deployment Options

**Option 1: Separate Server**
Deploy AdminJS as a separate service on a different port/subdomain.

**Option 2: Integrated Deployment**
Use a reverse proxy to serve AdminJS under `/admin` path.

### Security Checklist
- [ ] Strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] HTTPS enabled
- [ ] Database connection secured
- [ ] Admin user passwords are strong
- [ ] Regular backups configured

## 📚 Additional Resources

- [AdminJS Documentation](https://docs.adminjs.co/)
- [Prisma Documentation](https://prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 🆘 Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your environment variables
3. Ensure database connectivity
4. Check that all dependencies are installed

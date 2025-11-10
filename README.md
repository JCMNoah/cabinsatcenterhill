# Cabins at Center Hill

A comprehensive cabin reservation platform built with Next.js 14, Supabase, and React Admin. This Airbnb-style application provides a complete booking system with user authentication, cabin management, booking workflows, and a powerful admin dashboard.

## 🚀 Features

### Frontend (Guest/Host Experience)
- **User Authentication**: Secure signup/login with email verification
- **Cabin Browsing**: Advanced search and filtering capabilities
- **Booking System**: Complete reservation workflow with availability checking
- **Review System**: Guest reviews and ratings for cabins
- **User Profiles**: Profile management with avatar uploads
- **Responsive Design**: Mobile-first responsive interface

### Admin Dashboard
- **User Management**: Complete CRUD operations for users with role management
- **Cabin Management**: Cabin approval workflows, bulk actions, and content management
- **Booking Management**: Booking status management and bulk operations
- **Analytics Dashboard**: Revenue tracking, booking analytics, and performance metrics
- **Review Moderation**: Review management and moderation tools

### Backend Features
- **Row Level Security**: Database-level security with Supabase RLS
- **File Storage**: Secure image uploads with validation and optimization
- **Real-time Updates**: Live booking status updates
- **API Routes**: RESTful API with proper error handling
- **Database Relationships**: Properly structured relational database

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **Admin Dashboard**: React Admin with Material-UI
- **Authentication**: Supabase Auth with role-based access control
- **File Storage**: Supabase Storage with bucket policies
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cabinsatcenterhill
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Supabase

1. Create a new Supabase project
2. Run the SQL files in order:
   - `supabase/schema.sql`
   - `supabase/rls-policies.sql`
   - `supabase/storage-setup.sql`

### 4. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 5. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

### 6. Access Admin Dashboard

1. Create an admin user in Supabase
2. Visit `http://localhost:3000/admin`
3. Login with admin credentials

## 📁 Project Structure

```
cabinsatcenterhill/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── (auth)/            # Authentication pages
├── components/            # React components
│   ├── admin/             # Admin dashboard components
│   ├── auth/              # Authentication components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── admin/             # Admin-specific utilities
│   ├── auth.ts            # Authentication utilities
│   ├── database.ts        # Database operations
│   ├── storage.ts         # File storage utilities
│   └── supabase.ts        # Supabase client configuration
├── supabase/              # Database schema and policies
│   ├── schema.sql         # Database schema
│   ├── rls-policies.sql   # Row Level Security policies
│   └── storage-setup.sql  # Storage bucket configuration
└── public/                # Static assets
```

## 🗄️ Database Schema

### Core Tables
- **users**: User profiles with role-based access (guest, host, admin)
- **cabins**: Cabin listings with details, pricing, and amenities
- **bookings**: Reservation records with status tracking
- **reviews**: Guest reviews and ratings for cabins

### Key Features
- **Row Level Security**: Ensures users can only access their own data
- **Triggers**: Automatic timestamp updates and data validation
- **Indexes**: Optimized queries for search and filtering
- **Relationships**: Proper foreign key constraints with cascading deletes

## 🔐 Authentication & Authorization

### User Roles
- **Guest**: Can browse cabins, make bookings, and leave reviews
- **Host**: Can manage their own cabins and view their bookings
- **Admin**: Full access to all resources and admin dashboard

### Security Features
- Email verification required for new accounts
- Password reset functionality
- Session management with automatic refresh
- Role-based access control at database level

## 📊 Admin Dashboard Features

### Analytics
- Revenue tracking and trends
- Booking analytics and patterns
- User growth metrics
- Top performing cabins

### Management Tools
- Bulk operations for cabins and bookings
- Cabin approval workflows
- User role management
- Review moderation

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- Supabase project setup
- Environment configuration
- Vercel deployment
- Domain configuration
- Security checklist

## 🧪 Testing

### Frontend Testing
```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

### API Testing
```bash
# Test API endpoints
pnpm test:api
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Cabin Endpoints
- `GET /api/cabins` - List cabins with search/filter
- `GET /api/cabins/[id]` - Get cabin details
- `POST /api/cabins` - Create cabin (hosts only)
- `PUT /api/cabins/[id]` - Update cabin (hosts/admins)
- `DELETE /api/cabins/[id]` - Delete cabin (hosts/admins)

### Booking Endpoints
- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/[id]` - Update booking status
- `DELETE /api/bookings/[id]` - Cancel booking

### File Upload Endpoints
- `POST /api/upload/cabin-images` - Upload cabin images
- `POST /api/upload/avatar` - Upload user avatar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review the [Issues](https://github.com/your-repo/issues) page
- Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend-as-a-service platform
- [React Admin](https://marmelab.com/react-admin/) for the admin dashboard framework
- [Vercel](https://vercel.com/) for seamless deployment

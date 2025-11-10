This is a [Next.js](https://nextjs.org) cabin booking application with AdminJS admin panel, built with Prisma ORM and PostgreSQL.

## Getting Started

### 1. Database Setup
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Run database migrations
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

### 2. AdminJS Setup
```bash
# Create your first admin user
pnpm admin:create

# Test the setup
pnpm admin:test
```

### 3. Start the Application
```bash
# Start both Next.js and AdminJS
pnpm dev:all

# Or start them separately:
pnpm dev        # Next.js on http://localhost:3000
pnpm admin      # AdminJS on http://localhost:3001/admin
```

## 📚 Documentation

- **[Database Setup Guide](./DATABASE_SETUP.md)** - Complete Prisma and PostgreSQL setup
- **[AdminJS Setup Guide](./ADMINJS_SETUP.md)** - Admin panel configuration and usage

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

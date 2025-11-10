import "reflect-metadata"
import { config } from "dotenv"
config() // Load environment variables

import express from "express"
import session from "express-session"
import bcrypt from "bcryptjs"
import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import { Database, Resource } from "@adminjs/typeorm"
import { AppDataSource } from "./src/data-source"
import { User, UserRole } from "./src/entities/User"
import { Cabin } from "./src/entities/Cabin"
import { Booking } from "./src/entities/Booking"
import { Review } from "./src/entities/Review"
import { Payment } from "./src/entities/Payment"

// --- Initialize TypeORM ---
console.log("🔄 Initializing TypeORM...")
await AppDataSource.initialize()
console.log("✅ TypeORM initialized")

// --- Register TypeORM adapter ---
AdminJS.registerAdapter({ Database, Resource })
console.log("✅ AdminJS TypeORM adapter registered")

// --- Authentication function ---
const authenticate = async (email: string, password: string) => {
  const userRepo = AppDataSource.getRepository(User)
  const user = await userRepo.findOne({ where: { email } })

  if (!user || user.role !== UserRole.ADMIN) return null

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

// --- AdminJS instance ---
const adminJs = new AdminJS({
  rootPath: "/admin",
  branding: {
    companyName: "Cabins at Center Hill",
    softwareBrothers: false,
    favicon: "/favicon.ico",
  },
  resources: [
    { resource: User, options: { properties: { passwordHash: { isVisible: false } } } },
    { resource: Cabin },
    { resource: Booking },
    { resource: Review },
    { resource: Payment },
  ],
})

const app = express()

// --- Session setup ---
const sessionOptions = {
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}

// --- AdminJS router with authentication ---
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: process.env.NEXTAUTH_SECRET || "super-secret-key",
  },
  undefined,
  sessionOptions
)

app.use(adminJs.options.rootPath, adminRouter)

// --- Start Express server ---
const PORT = process.env.ADMIN_PORT || 3001
app.listen(PORT, () => {
  console.log(`AdminJS is running at http://localhost:${PORT}${adminJs.options.rootPath}`)
})

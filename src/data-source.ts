import "reflect-metadata"
import { config } from "dotenv"
import { DataSource } from "typeorm"

// Load environment variables
config()
import { User } from "./entities/User"
import { Cabin } from "./entities/Cabin"
import { Booking } from "./entities/Booking"
import { Review } from "./entities/Review"
import { Payment } from "./entities/Payment"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV === "development", // Only in development
    logging: process.env.NODE_ENV === "development",
    entities: [User, Cabin, Booking, Review, Payment],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
})

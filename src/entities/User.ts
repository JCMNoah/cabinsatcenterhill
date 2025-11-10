import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Cabin } from "./Cabin"
import { Booking } from "./Booking"
import { Review } from "./Review"

export enum UserRole {
    GUEST = "guest",
    HOST = "host",
    ADMIN = "admin"
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "varchar", length: 255, unique: true })
    email: string

    @Column({ type: "varchar", length: 255, name: "password_hash" })
    passwordHash: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GUEST
    })
    role: UserRole

    @Column({ type: "varchar", length: 500, nullable: true, name: "avatar_url" })
    avatarUrl?: string

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date

    // Relationships
    @OneToMany(() => Cabin, cabin => cabin.host)
    cabins: Cabin[]

    @OneToMany(() => Booking, booking => booking.guest)
    bookings: Booking[]

    @OneToMany(() => Review, review => review.guest)
    reviews: Review[]
}

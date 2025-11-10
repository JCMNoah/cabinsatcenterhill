import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./User"
import { Booking } from "./Booking"
import { Review } from "./Review"

export enum CabinStatus {
    PENDING = "pending",
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity("cabins")
export class Cabin {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 255 })
    title: string

    @Column({ type: "text" })
    description: string

    @Column({ type: "varchar", length: 255 })
    location: string

    @Column({ type: "decimal", precision: 10, scale: 2, name: "price_per_night" })
    pricePerNight: number

    @Column({ type: "int", name: "max_guests" })
    maxGuests: number

    @Column({ type: "int" })
    bedrooms: number

    @Column({ type: "int" })
    bathrooms: number

    @Column({ type: "text", nullable: true })
    amenities?: string

    @Column({ type: "text", nullable: true })
    images?: string

    @Column({ type: "uuid", name: "host_id" })
    hostId: string

    @Column({ type: "boolean", default: false, name: "is_featured" })
    isFeatured: boolean

    @Column({
        type: "enum",
        enum: CabinStatus,
        default: CabinStatus.PENDING
    })
    status: CabinStatus

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date

    // Relationships
    @ManyToOne(() => User, user => user.cabins, { onDelete: "CASCADE" })
    @JoinColumn({ name: "host_id" })
    host: User

    @OneToMany(() => Booking, booking => booking.cabin)
    bookings: Booking[]

    @OneToMany(() => Review, review => review.cabin)
    reviews: Review[]
}

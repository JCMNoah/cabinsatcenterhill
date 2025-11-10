import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, Index } from "typeorm"
import { User } from "./User"
import { Cabin } from "./Cabin"
import { Payment } from "./Payment"

export enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}

@Entity("bookings")
@Index(["cabinId"])
@Index(["guestId"])
@Index(["status"])
@Index(["checkIn", "checkOut"])
export class Booking {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "uuid", name: "cabin_id" })
    cabinId: string

    @Column({ type: "uuid", name: "guest_id" })
    guestId: string

    @Column({ type: "timestamp", name: "check_in" })
    checkIn: Date

    @Column({ type: "timestamp", name: "check_out" })
    checkOut: Date

    @Column({ type: "decimal", precision: 10, scale: 2, name: "total_price" })
    totalPrice: number

    @Column({
        type: "enum",
        enum: BookingStatus,
        default: BookingStatus.PENDING
    })
    status: BookingStatus

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    // Relationships
    @ManyToOne(() => Cabin, cabin => cabin.bookings, { onDelete: "CASCADE" })
    @JoinColumn({ name: "cabin_id" })
    cabin: Cabin

    @ManyToOne(() => User, user => user.bookings, { onDelete: "CASCADE" })
    @JoinColumn({ name: "guest_id" })
    guest: User

    @OneToOne(() => Payment, payment => payment.booking)
    payment?: Payment
}

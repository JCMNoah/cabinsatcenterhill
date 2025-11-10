import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, Index } from "typeorm"
import { Booking } from "./Booking"

export enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    REFUNDED = "refunded"
}

@Entity("payments")
@Index(["status"])
@Index(["transactionId"])
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "uuid", unique: true, name: "booking_id" })
    bookingId: string

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number

    @Column({ type: "varchar", length: 255, name: "payment_method" })
    paymentMethod: string

    @Column({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    })
    status: PaymentStatus

    @Column({ type: "varchar", length: 255, nullable: true, name: "transaction_id" })
    transactionId?: string

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    // Relationships
    @OneToOne(() => Booking, booking => booking.payment, { onDelete: "CASCADE" })
    @JoinColumn({ name: "booking_id" })
    booking: Booking
}

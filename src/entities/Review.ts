import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index, Unique } from "typeorm"
import { User } from "./User"
import { Cabin } from "./Cabin"

@Entity("reviews")
@Unique(["cabinId", "guestId"]) // One review per guest per cabin
@Index(["cabinId"])
@Index(["guestId"])
@Index(["rating"])
export class Review {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "uuid", name: "cabin_id" })
    cabinId: string

    @Column({ type: "uuid", name: "guest_id" })
    guestId: string

    @Column({ type: "smallint" })
    rating: number

    @Column({ type: "text" })
    comment: string

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    // Relationships
    @ManyToOne(() => Cabin, cabin => cabin.reviews, { onDelete: "CASCADE" })
    @JoinColumn({ name: "cabin_id" })
    cabin: Cabin

    @ManyToOne(() => User, user => user.reviews, { onDelete: "CASCADE" })
    @JoinColumn({ name: "guest_id" })
    guest: User
}

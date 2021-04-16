import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm";
import { Borrowable } from "./Borrowable";
import { BorrowableItem } from "./BorrowableItem";
import { Member } from "./Member";

@Entity()
export class Borrow {

    @PrimaryGeneratedColumn()
    borrow_id: number;

    @ManyToOne(() => Member, (member) => member.id)
    member: Member;

    @ManyToOne(() => BorrowableItem, (borrowableItem) => borrowableItem.serial_number)
    borrowableItem: BorrowableItem;

    @Column({ nullable: false, type: "date" })
    date_of_borrow: Date;
}
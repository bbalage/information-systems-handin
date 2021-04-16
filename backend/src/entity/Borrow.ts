import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm";
import { Borrowable } from "./Borrowable";
import { BorrowableItem } from "./BorrowableItem";
import { Member } from "./Member";

@Entity()
export class Borrow {

    @PrimaryGeneratedColumn()
    borrowId: number;

    @ManyToOne(() => Member, (member) => member.id)
    member: Member;

    @ManyToOne(() => BorrowableItem, (borrowableItem) => borrowableItem.serialNumber)
    borrowableItem: BorrowableItem;

    @Column({ nullable: false, type: "date" })
    dateOfBorrow: Date;
}
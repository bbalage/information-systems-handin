import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm";
import { Borrowable } from "./Borrowable";
import { Member } from "./Member";

@Entity()
export class Borrow {

    @PrimaryGeneratedColumn()
    borrow_id: number;

    @ManyToOne(() => Member, (member) => member.id)
    member: Member;

    @ManyToOne(() => Borrowable, (borrowable) => borrowable.serial_number)
    borrowable: Borrowable;

    @Column({ nullable: false, type: "date" })
    date_of_borrow: Date;
}
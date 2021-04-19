import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm";
import { Borrowable } from "./Borrowable";
import { Member } from "./Member";

@Entity()
export class Borrow {

    @PrimaryGeneratedColumn()
    borrowId: number;

    @ManyToOne(() => Member, (member) => member.id)
    member: Member;

    @ManyToOne(() => Borrowable, (borrowable) => borrowable.serialNumber)
    borrowable: Borrowable;

    @Column({ nullable: false, type: "date" })
    dateOfBorrow: Date;

    @Column({ nullable: false, type: "boolean" })
    returned: boolean;

}
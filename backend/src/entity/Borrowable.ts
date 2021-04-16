import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Borrow } from "./Borrow";
import { BorrowableItem } from "./BorrowableItem";

@Entity()
export class Borrowable {

    @PrimaryGeneratedColumn()
    serial_number: number;

    @OneToMany(() => BorrowableItem, (borrowableItem) => borrowableItem.borrowable)
    borrowableItems: BorrowableItem[];

    @Column({ nullable: false, type: "varchar", length: 100 })
    title: string;

    @Column({ nullable: false, type: "varchar", length: 100 })
    author: string;

    @Column({ nullable: false, type: "integer" })
    max_borror_time: number;

    /**
     * Borrowed:  'b';
     * Free:      'f';
     * Discarded: 'd';
     */
    @Column({ nullable: false, type: "char", length: 1 })
    type: string;

}
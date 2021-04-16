import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Borrow } from "./Borrow";
import { BorrowableItem } from "./BorrowableItem";

@Entity()
export class Borrowable {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => BorrowableItem, (borrowableItem) => borrowableItem.borrowable)
    borrowableItems: BorrowableItem[];

    @Column({ nullable: false, type: "varchar", length: 100 })
    title: string;

    @Column({ nullable: false, type: "varchar", length: 100 })
    author: string;

    @Column({ nullable: false, type: "integer" })
    maxBorrowTime: number;

    /**
     * Borrowed:  'b';
     * Free:      'f';
     * Discarded: 'd';
     */
    @Column({ nullable: false, type: "char", length: 1 })
    type: string;

}
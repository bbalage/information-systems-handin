import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Borrow } from "./Borrow";

@Entity()
export class Borrowable {

    @PrimaryGeneratedColumn()
    serialNumber: number;

    @OneToMany(() => Borrow, (borrow) => borrow.borrowable)
    borrows: Borrow[];

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

    @Column({ nullable: false, type: "date" })
    acquirementDate: Date;

    /**
     * CD:          'c';
     * Book:        'b';
     * Music sheet: 'm';
     */
     @Column({ nullable: false, type: "char", length: 1 })
     status: string;

}
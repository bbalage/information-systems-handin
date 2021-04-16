import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrow } from "./Borrow";
import { Borrowable } from "./Borrowable";

@Entity()
export class BorrowableItem {

    @PrimaryGeneratedColumn()
    serialNumber: number;

    @ManyToOne(() => Borrowable, (borrowable) => borrowable.borrowableItems)
    borrowable: Borrowable;

    @OneToMany(() => Borrow, (borrow) => borrow.borrowableItem)
    borrows: Borrow[];

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
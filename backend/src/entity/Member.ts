import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Borrow } from "./Borrow";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Borrow, (borrow) => borrow.member)
    borrows: Borrow[];

    @Column({ nullable: false, type: "varchar", length: 100 })
    name: string;

    @Column({ nullable: false, type: "varchar", length: 20 })
    phoneNumber: string;

    @Column({ nullable: false, type: "char", length: 8, unique: true })
    idCardNumber: string;

    @Column({ nullable: false, type: "varchar", length: 100 })
    address: string;

    @Column({ nullable: false, type: "char", length: 1 })
    status: string;

}

import { Borrow } from "./borrow";
import { Borrowable } from "./borrowable";
import { Member } from "./member";

export interface MergedBorrowableBorrowAndMember {
    borrowable: Borrowable;
    borrow: Borrow;
    member: Member;
};

export interface Lateness {
    borrow: Borrow;
    borrowable: Borrowable;
    member: Member;
    lateness: number;
};
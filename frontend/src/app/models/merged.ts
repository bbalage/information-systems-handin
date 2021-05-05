import { Borrow } from "./borrow";
import { Borrowable } from "./borrowable";
import { Member } from "./member";

export interface MergedBorrowableBorrowAndMember {
    borrowable: Borrowable;
    borrow: Borrow | undefined;
    member: Member | undefined;
}
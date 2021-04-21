import { Member } from "../entity/Member";

export interface BorrowOutDto {
    borrowId?: number;
    dateOfBorrow?: Date;
    returned?: boolean;
}

export interface BorrowableOutDto {
    serialNumber?: number;
    title?: string;
    author?: string;
    maxBorrowTime?: number;
    acquirementDate?: Date;
    type?: string;
    status?: string;
}

export interface MemberOutDto {
    id?: number;
    name?: string;
    idCardNumber?: string;
    phoneNumber?: string;
    address?: string;
    status?: string;
}
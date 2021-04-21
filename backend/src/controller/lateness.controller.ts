import { getRepository } from "typeorm";
import { Borrow } from "../entity/Borrow";
import { Borrowable } from "../entity/Borrowable";
import { Member } from "../entity/Member";
import { BorrowableOutDto, BorrowOutDto, MemberOutDto } from "../util/dtoDefinitions";
import { BorrowableTypeEnum } from "../util/enums";
import { Controller } from "./controller";

interface LatenessDto {
    borrow: BorrowOutDto,
    borrowable: BorrowableOutDto,
    member: MemberOutDto;
    lateness: number;
}

export class LatenessController extends Controller {
    memberRepository = getRepository(Member);
    borrowableRepository = getRepository(Borrowable);
    borrowRepository = getRepository(Borrow);

    getLatenessOfBorrowables = async (req, res) => {
        try {
            const jointTables: Borrowable[] = await this.borrowableRepository.createQueryBuilder('borrowable')
                .innerJoinAndSelect("borrowable.borrows", "borrow")
                .innerJoinAndSelect("borrow.member", "member")
                .where(
                    "DATE_ADD(borrow.dateOfBorrow, INTERVAL borrowable.maxBorrowTime DAY) < CURDATE()"
                    )
                .andWhere("NOT borrow.returned")
                .getMany();
            
            const latenessDtos = this.convertJointTableRowsToLatenessDtos(jointTables);
            res.json({ success: true, latenessDtos: latenessDtos});
        }
        catch(err) {
            console.log(err);
            this.handleError(res, 500, "Could not get lateness data.");
        }
    }

    private convertJointTableRowsToLatenessDtos = (jointTables: Borrowable[]) => {
        const latenessDtos: LatenessDto[] = [];
        for (let jointTable of jointTables) {
            const borrowable: BorrowableOutDto = this.convertBorrowableToDto(jointTable);
            
            const borrow: BorrowOutDto = this.convertBorrowToDto(jointTable.borrows[0]);

            const member: MemberOutDto = this.convertMemberToDto(jointTable.borrows[0].member);

            let date = new Date(borrow.dateOfBorrow);
            date.setDate(date.getDate() + borrowable.maxBorrowTime);
            const diff = new Date().getTime() - date.getTime();
            const lateness = Math.ceil(diff / (1000 * 3600 * 24));

            const latenessDto: LatenessDto = {
                borrowable: borrowable,
                borrow: borrow,
                member: member,
                lateness: lateness
            }
            latenessDtos.push(latenessDto);
        }
        return latenessDtos;
    }

    private convertBorrowableToDto = (borrowable: Borrowable): BorrowableOutDto => {
        const borrowableDto: BorrowableOutDto = {};
        borrowableDto.serialNumber = borrowable.serialNumber;
        borrowableDto.title = borrowable.title;
        borrowableDto.author = borrowable.author;
        borrowableDto.maxBorrowTime = borrowable.maxBorrowTime;
        borrowableDto.type = borrowable.type;
        borrowableDto.acquirementDate = borrowable.acquirementDate;
        borrowableDto.status = borrowable.status;
        return borrowableDto;
    }

    private convertBorrowToDto = (borrow: Borrow): BorrowOutDto => {
        const borrowDto: BorrowOutDto = {};
        borrowDto.borrowId = borrow.borrowId;
        borrowDto.dateOfBorrow = borrow.dateOfBorrow;
        borrowDto.returned = borrow.returned;
        return borrowDto;
    }

    private convertMemberToDto = (member: Member): MemberOutDto => {
        const memberDto: MemberOutDto = {};
        memberDto.id = member.id;
        memberDto.name = member.name;
        memberDto.idCardNumber = member.idCardNumber;
        memberDto.phoneNumber = member.phoneNumber;
        memberDto.address = member.address;
        memberDto.status = member.status;
        return memberDto;
    }
}
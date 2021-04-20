import { getManager, getRepository } from "typeorm";
import { Borrow } from "../entity/Borrow";
import { Borrowable } from "../entity/Borrowable";
import { Member } from "../entity/Member";
import { Controller } from "./controller";

interface LatenessDto {
    member: Member;
    borrowable: Borrowable;
    borrow: Borrow;
    lateness: number;
}

export class LatenessController extends Controller {
    memberRepository = getRepository(Member);
    borrowableRepository = getRepository(Borrowable);
    borrowRepository = getRepository(Borrow);

    getLatenessOfBorrowables = async (req, res) => {
        try {
            const jointTables: Borrowable[] = await this.borrowableRepository.createQueryBuilder('borrowable')
                //.select(
                //   "CURDATE() - DATE_ADD(borrow.dateOfBorrow, INTERVAL borrowable.maxBorrowTime DAY)", "lateness"
                //)
                .innerJoinAndSelect("borrowable.borrows", "borrow")
                .innerJoinAndSelect("borrow.member", "member")
                .where(
                    "DATE_ADD(borrow.dateOfBorrow, INTERVAL borrowable.maxBorrowTime DAY) < CURDATE()"
                    )
                .andWhere("NOT borrow.returned")
                .getMany();
            console.log(`Retrieved data: ${jointTables[0].borrows[0].borrowId}`);
            
            const latenessDtos = this.convertJointTableRowsToLatenessDtos(jointTables);
            res.json({ success: true, latenessDtos: jointTables});
        }
        catch(err) {
            console.log(err);
            this.handleError(res, 500, "Could not get lateness data.");
        }
    }

    private convertJointTableRowsToLatenessDtos = (jointTables: Borrowable[]): LatenessDto[] => {
        const latenessDtos = []; 
        for (let jointTable of jointTables) {
            const borrowable: Borrowable = jointTable;
            //borrowable.borrows = [];
            
            const borrow = jointTable.borrows[0];
            //borrow.member = undefined;

            const member = jointTable.borrows[0].member;
            
            console.log(`dateOfBorrow: ${borrow.dateOfBorrow}`)
            let date = borrow.dateOfBorrow;
            console.log(`date: ${date}`)
            console.log(`date.getDate: ${date.getDate}`)
            date.setDate(date.getDate() + borrowable.maxBorrowTime);
            const diff = new Date().getTime() - date.getTime();
            const lateness = Math.ceil(diff / (1000 * 3600 * 24));
            
            const latenessDto: LatenessDto = {
                borrowable: borrowable,
                borrow: borrow,
                member: member,
                lateness: lateness
            }
            latenessDtos.push(latenessDtos);
        }
        return latenessDtos;
    }
}
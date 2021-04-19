import { getRepository } from "typeorm";
import { Borrow } from "../entity/Borrow";
import { Borrowable } from "../entity/Borrowable";
import { Member } from "../entity/Member";
import { BorrowableStatusEnum } from "../util/enums";
import { BorrowableController } from "./borrowable.controller";
import { Controller } from "./controller";

interface MemberOutDto extends Member {
    numberOfCurrentBorrows?: number;
}

export class BorrowController extends Controller {
    memberRepository = getRepository(Member);
    borrowableRepository = getRepository(Borrowable);
    borrowRepository = getRepository(Borrow);

    getMemberWithNumberOfCurrentBorrows = async (req, res) => {
        try{
            const idOfMember = req.params.id;
            const retMembers = await this.memberRepository.findByIds(idOfMember);
            if(retMembers.length != 1) {
                this.handleError(res, 404, 'No member found with given id.');
                return;
            }
            const retMember : MemberOutDto = retMembers[0];
            const joinedMember = await this.memberRepository.createQueryBuilder('member')
                .innerJoin("member.borrows", "borrow")
                .where("member.id = :id AND NOT borrow.returned", {id: idOfMember})
                .getMany();
            retMember.numberOfCurrentBorrows = joinedMember.length;
            res.json({ success: true, retMember });
        }
        catch(err) {
            console.log(err);
            this.handleError(res, 500, "Could not get member with number of borrows.");
        }
    }
}
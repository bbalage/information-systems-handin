import { getRepository } from "typeorm";
import { Borrow } from "../entity/Borrow";
import { Borrowable } from "../entity/Borrowable";
import { Member } from "../entity/Member";
import { Controller } from "./controller";
import { BorrowableStatusEnum } from "../util/enums";

interface MemberOutDtoWithBorrows extends Member {
    numberOfCurrentBorrows?: number;
    numberOfStillAllowedBorrows?: number;
}

interface MergedBorrowableBorrowAndMember {
    borrowable: Borrowable;
    borrow: Borrow | undefined;
    member: Member | undefined;
}

export class BorrowController extends Controller {
    readonly MAX_BORROWS: number = 6;
    memberRepository = getRepository(Member);
    borrowableRepository = getRepository(Borrowable);
    borrowRepository = getRepository(Borrow);

    getMemberWithNumberOfCurrentBorrowsAndReturnInResponse = async (req, res) => {
        try{
            const idOfMember = req.params.id;
            const retMember: MemberOutDtoWithBorrows = await this.getMemberWithNumberOfCurrentBorrows(idOfMember, res);
            res.json({ success: true, data: retMember });
        }
        catch(err) {
            console.log("Could not send member with number of current borrows to client.");
        }
    }

    private getMemberWithNumberOfCurrentBorrows = async (idOfMember, res) :Promise<MemberOutDtoWithBorrows> => {
        try {
            const retMember: MemberOutDtoWithBorrows = await this.memberRepository.findOne(idOfMember);
            if(!retMember) {
                this.handleError(res, 404, 'No member found with given id.');
                return;
            }
            const joinedMembers = await this.memberRepository.createQueryBuilder('member')
                .select("COUNT(member.id) count")
                .innerJoin("member.borrows", "borrow")
                .where("member.id = :id AND NOT borrow.returned", {id: idOfMember})
                .getRawOne();
            retMember.numberOfCurrentBorrows = joinedMembers.count;
            retMember.numberOfStillAllowedBorrows = 
                this.MAX_BORROWS - retMember.numberOfCurrentBorrows;
            return retMember;
        }
        catch(err) {
            console.log(err);
            this.handleError(res, 500, "Could not get member with number of borrows.");
        }
    }

    createBorrows = async (req, res) => {
        try {
            const idOfMember = req.params.memberId;
            const member = await this.getMemberWithNumberOfCurrentBorrows(idOfMember, res);
            const idsOfBorrowables = req.body;
            /*Check for borrowable ids.*/
            if (!idsOfBorrowables || idsOfBorrowables.lenght < 1) {
                this.handleError(res, 400, "No ids given for requested borrowables.");
                return;
            }
            /**
             * Check if the user can still borrow anything, 
             * or has too many unfinished borrows alread
            */
            if (member.numberOfStillAllowedBorrows < idsOfBorrowables) {
                const message = 
                    `This user cannot borrow ${idsOfBorrowables.length}. 
                    The maximum the user can borrow is: ${member.numberOfStillAllowedBorrows}`;
                this.handleError(res, 400, message);
                return;
            }
            /**
             * Check if the borrowables with the given ids really exist.
             */
            const invalidIds = [];
            for (let id of idsOfBorrowables) {
                const borrowable = await this.borrowableRepository.findByIds(id);
                if (borrowable.length != 0) {
                    invalidIds.push(id);
                }
            }
            if(invalidIds.length > 0){
                const message = `No borrowables with the ids of ${invalidIds} exist.`;
                this.handleError(res, 404, message);
                return;
            }
            /**
             * Check if the given borrowables are free to borrow.
             */
            const idsOfAlreadyBorrowedBorrowables = [];
            for (let borrowableId of idsOfBorrowables){
                const matchingNotFreeBorrowables = await this.borrowableRepository
                    .createQueryBuilder('borrowable')
                    .where(
                        "borrowable.serialNumber = :borrowableId AND borrowable.status <> 'f'",
                        {borrowableId: borrowableId}
                    )
                    .getMany();
                if (matchingNotFreeBorrowables.length > 0) {
                    idsOfAlreadyBorrowedBorrowables.push(borrowableId);
                }
            }
            if(idsOfAlreadyBorrowedBorrowables.length > 0){
                const message = `The borrowables with the ids of ${idsOfAlreadyBorrowedBorrowables} are not free to borrow.`;
                this.handleError(res, 400, message);
                return;
            }
            /**
             * Execute the actual save in a transaction.
             */
            //TODO: Put transactions, where multiple database actions are executed in a row.
           for (let borrowableId of idsOfBorrowables) {
                const borrow: Borrow = new Borrow();
                borrow.borrowId = undefined;
                borrow.borrowable = borrowableId;
                borrow.member= idOfMember;
                borrow.dateOfBorrow = new Date();
                borrow.returned= false;
                await this.borrowRepository.save(borrow);
                const borrowable = await this.borrowableRepository.findOne(borrowableId);
                borrowable.status = BorrowableStatusEnum.BORROWED;
                await this.borrowableRepository.save(borrowable);
            }
            res.json({ success: true });
        }
        catch(err) {
            this.handleError(res, 500, "Could not create borrow.");
            console.log(err);
        }
    }

    getBorrowableWithCurrentBorrowerAndReturn = async (req, res) => {
        try {
            const idOfBorrowable = req.params.idOfBorrowable;
            const borrowable = await this.borrowableRepository.findOne(idOfBorrowable);
            if (!borrowable) {
                this.handleError(res, 404, "No borrowable by given id.");
            }
            if (borrowable.status === BorrowableStatusEnum.FREE) {
                const prunedRetObj: MergedBorrowableBorrowAndMember = {
                    borrowable: borrowable,
                    borrow: undefined,
                    member: undefined
                } 
                res.json({ success: true, data: prunedRetObj});
                
                return;
            }
            if (borrowable.status === BorrowableStatusEnum.DISCARDED) {
                this.handleError(res, 403, "The required borrowable has been discarded.");
                return;
            }
            
            const latestBorrowsWithInputId = await this.borrowRepository
                .createQueryBuilder('borrow')
                .innerJoin("borrow.borrowable", "borrowable")
                .where("borrowable.serialNumber = :idOfBorrowable AND NOT borrow.returned", {idOfBorrowable: idOfBorrowable})
                .orderBy("borrow.dateOfBorrow -1")
                .getMany();
            
            const latestBorrowWithInputId = latestBorrowsWithInputId.pop();
            const member = await this.memberRepository
                .createQueryBuilder('member')
                .innerJoin("member.borrows", "borrow")
                //.innerJoinAndSelect('product.uploader', 'uploader')
                .where("borrow.borrowId = :id", { id: latestBorrowWithInputId.borrowId})
                .getOne();
            
            const retObj: MergedBorrowableBorrowAndMember = this.mergeBorrowableBorrowAndMemberObjects(
                borrowable, latestBorrowWithInputId, member
            );

            res.json({ success: true, data: retObj });
        }
        catch(err) {
            console.log(err);
            this.handleError(res, 500);
        }
    }

    private mergeBorrowableBorrowAndMemberObjects = (
            borrowable: Borrowable, borrow: Borrow, member: Member
        ) => {
        const retObj = {borrowable, borrow, member};
        return retObj;
    }

    setBorrowableFree = async (req, res) => {
        try {
            const borrowableId: number = req.params.idOfBorrowable;
            const borrowable = await this.borrowableRepository.findOne(borrowableId);
            if (!borrowable) {
                console.log(`borrowableId: ${borrowableId}`)
                this.handleError(res, 404, "No borrowable with given id.");
                return;
            }
            //console.log(`${borrowable.status} - ${BorrowableStatusEnum.BORROWED}`);
            if (borrowable.status != BorrowableStatusEnum.BORROWED) {
                this.handleError(res, 400, "Borrowable with given id is not booked.");
                return;
            }
            const borrow = await this.borrowRepository
                .createQueryBuilder('borrow')
                .innerJoinAndSelect(
                    "borrow.borrowable", "borrowable", "borrowable.serialNumber = :borrowableId",
                    {borrowableId: borrowableId}
                    )
                .where("NOT borrow.returned")
                .getOne();
            borrow.returned = true;
            await this.borrowRepository.save(borrow);
            borrowable.status = BorrowableStatusEnum.FREE;
            const freedBorrowable: Borrowable = await this.borrowableRepository
               .save(borrowable);
            res.json({ success: true, borrowable: freedBorrowable });
        }
        catch(err) {
            console.log(err);
            this.handleError(res);
        }
    }

    getBorrows = async (req, res) => {
        try {
            const serialNumber: number = req.query.serialNumber;
            if (serialNumber) {
                const borrowables = await this.borrowableRepository
                    .createQueryBuilder('borrowable')
                    .where("borrowable.serialNumber LIKE CONCAT('%', :serialNumber, '%')",
                        {serialNumber: serialNumber})
                    .andWhere("borrowable.status = 'b'")
                    .getMany();
                res.json({success: true, data: "borrowables"});
                return;
            }
            const borrowables = await this.borrowableRepository
                    .createQueryBuilder('borrowable')
                    .where("borrowable.status = 'b'")
                    .getMany();
            res.json({success: true, data: borrowables});
        }
        catch(err) {
            console.log(err);
            this.handleError(res);
        }
    }
}
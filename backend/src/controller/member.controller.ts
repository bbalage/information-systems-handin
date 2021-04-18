import { getRepository } from "typeorm";
import { Member } from "../entity/Member";
import { MemberStatusEnum } from "../util/enums";
import { Controller } from "./controller";

export class MemberController extends Controller {
    repository = getRepository(Member);

    create = async (req, res) => {
        const member = new Member();
        member.name = req.body.name;
        member.phoneNumber = req.body.phoneNumber;
        member.idCardNumber = req.body.idCardNumber;
        member.address = req.body.address;
        member.status = MemberStatusEnum.ACTIVE;
        try {
            const insertedMember = await this.repository.save(member);
            res.json({success: true, data: insertedMember});
        }
        catch (err) {
            console.error(err);
            this.handleError(res, 400, "Cannot insert member.");
        }
    }

    get = async (req, res) => {
        /*If there is an id in the query, then find by id.*/
        const id = req.query.id;
        if (id) {
            this.getById(req, res);
            return;
        }
        
        /*If there is an idCardNumber in the query, then find by idCardNumber.*/
        const idCardNumber = req.query.idCardNumber;
        if (idCardNumber) {
            this.getByIdCardNumber(req, res);
            return;
        }

        /*If there is a name in the query, then find by name.*/
        const name = req.query.name;
        if (name) {
            this.getByName(req, res);
            return;
        }

        /*If there is no parameter in the query, then find all.*/
        this.getAll(req, res);
    }

    private getAll = async (req, res) => {
        try {
            const allMembers = await this.repository.find();
            res.json({ success: true, data: allMembers });
        }
        catch (err) {
            console.log("Could retrieve members.");
            this.handleError(res);
        }
    }

    private getById = async (req, res) => {
        try {
            const id = req.query.id;
            const member = await this.repository.findByIds(id);
            console.log(member);
            if (!member || member.length == 0) {
                this.handleError(res, 404, 'No member found with given id.');
                return;
            }
            res.json({ success: true, data: member });
        }
        catch (err) {
            console.log("Could not find by id.");
            this.handleError(res);
        }
    }

    private getByIdCardNumber = async (req, res) => {
        try {
            const idCardNumber = req.query.idCardNumber;
            const members = await this.repository
                .createQueryBuilder('member')
                .where("member.idCardNumber LIKE CONCAT('%', :idCardNumber, '%')",
                    {idCardNumber: idCardNumber})
                .getMany();
            if (!members || members.length == 0) {
                this.handleError(res, 404, 'No member with that Id Card Number found.');
                return;
            }
            res.json({ success: true, data: members });
        }
        catch (err) {
            console.log("Could not find by Id Card Number.");
            this.handleError(res);
        }
    }

    private getByName = async (req, res) => {
        try{
        const name = req.query.name;
            const members = await this.repository
                .createQueryBuilder('member')
                .where("member.name LIKE CONCAT('%', :name, '%')",
                    {name: name})
                .getMany();
            if (!members || members.length == 0) {
                this.handleError(res, 404, 'No member with that kind of name found.');
                return;
            }
            res.json({ success: true, data: members });
        }
        catch (err) {
            console.log("Could not find by name.");
            this.handleError(res);
        }
    }

    delete = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented");
    }

    update = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented");
    }

    updateActivate = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented");
    }

    updateDeactivate = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented");
    }
}
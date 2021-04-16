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

    getAll = async (req, res) => {
        try {
            const allMembers = await this.repository.find();
            res.json({ success: true, data: allMembers });
        }
        catch (err) {
            console.log("Could retrieve members.");
            this.handleError(res);
        }
    }

    getById = async (req, res) => {
        const id = req.query.id;
        if (!id) {
            this.handleError(res, 400, "No id given.");
        }
        try {
            const member = await this.repository.findByIds(id);
            res.json({ success: true, data: member });
        }
        catch (err) {
            console.log("Could not find by id.");
            this.handleError(res);
        }
    }

    getByIdCardNumber = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented");
    }

    getByName = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented");
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
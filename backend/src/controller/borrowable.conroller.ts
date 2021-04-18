import { getRepository } from "typeorm";
import { Borrowable } from "../entity/Borrowable";
import { BorrowableStatusEnum } from "../util/enums";
import { Controller } from "./controller";

export class BorrowableController extends Controller {
    repository = getRepository(Borrowable);

    /*Creating new borrowable*/
    create = async (req, res) => {
        const borrowable = req.body;
        if (borrowable.id) {
            borrowable.id = undefined;
        }
        if (!borrowable.status){
            borrowable.status = BorrowableStatusEnum.FREE;
        }
        try {
            const insertedBorrowable = await this.repository.save(borrowable);
            res.json({ success: true, data: insertedBorrowable});
        }
        catch (err) {
            console.error(err);
            this.handleError(res, 400, "Cannot insert member.");
        }
    }

    /*List all borrowables*/
    /*Search borrowables by title*/
    /*Search borrowables by author*/

    
}
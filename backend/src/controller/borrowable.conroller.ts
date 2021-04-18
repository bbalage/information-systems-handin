import { getRepository } from "typeorm";
import { Borrowable } from "../entity/Borrowable";
import { Controller } from "./controller";

export class BorrowableController extends Controller {
    borrowableRepository = getRepository(Borrowable);

    /*Creating new borrowable*/
    create = async (req, res) => {
        //TODO
        this.handleError(res, 500, "Method not yet implemented.");
    }

    /*List all borrowables*/
    /*Search borrowables by title*/
    /*Search borrowables by author*/

    
}
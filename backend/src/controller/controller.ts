import { Repository } from "typeorm";

/*TODO: Recheck project needs and fix the update problem.*/
export abstract class Controller {
    repository: Repository<any>;

    handleError = (res, status = 500, message = 'Server error') => {
        res.status(status).json({message});
    }
}
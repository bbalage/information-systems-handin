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


    get = async (req, res) => {
        /*If there is an id in the query, then find by id.*/
        const id = req.query.id;
        if (id) {
            this.getById(req, res);
            return;
        }
        
        /*If there is both a title and an author in the query, then find by both.*/
        const title = req.query.title;
        const author = req.query.author;
        if (title && author) {
            this.getByTitleAndAuthor(req, res);
            return;
        }

        /*If there is only a title in the query, then find by title.*/
        if (title) {
            this.getByTitle(req, res);
            return;
        }

        /*If there is only an author in the query, then find by author.*/
        if (author) {
            this.getByAuthor(req, res);
            return;
        }

        /*If there is no parameter in the query, then find all.*/
        this.getAll(req, res);
    }

    private getById = async (req, res) => {
        try {
            const id = req.query.id;
            const borrowable = await this.repository.findByIds(id);
            if (!borrowable || borrowable.length == 0) {
                this.handleError(res, 404, 'No borrowable found with given id.');
                return;
            }
            res.json({ success: true, data: borrowable });
        }
        catch (err) {
            console.log("Could not find borrowable by id.");
            this.handleError(res);
        }
    }

    /*List all borrowables*/
    private getAll = async (req, res) => {
        try {
            const allBorrowables = await this.repository.find();
            res.json({ success: true, data: allBorrowables });
        }
        catch (err) {
            console.log("Could retrieve borrowables.");
            this.handleError(res);
        }
    }


    /*Search borrowables by title*/
    private getByTitle = async (req, res) => {
        try {
            const title = req.query.title;
            const borrowables = await this.repository
                .createQueryBuilder('borrowable')
                .where("borrowable.title LIKE CONCAT('%', :title, '%')",
                    {title: title})
                .getMany();
            if (!borrowables || borrowables.length == 0) {
                this.handleError(res, 404, 'No borrowable with that kind of title found.');
                return;
            }
            res.json({ success: true, data: borrowables });
        }
        catch (err) {
            console.log("Could not find by title.");
            this.handleError(res);
        }
    }

    /*Search borrowables by author*/
    private getByAuthor = async (req, res) => {
        try {
            const author = req.query.author;
            const borrowables = await this.repository
                .createQueryBuilder('borrowable')
                .where("borrowable.author LIKE CONCAT('%', :author, '%')",
                    {author: author})
                .getMany();
            if (!borrowables || borrowables.length == 0) {
                this.handleError(res, 404, 'No borrowable with that kind of author found.');
                return;
            }
            res.json({ success: true, data: borrowables });
        }
        catch (err) {
            console.log("Could not find by author.");
            this.handleError(res);
        }
    }

    private getByTitleAndAuthor = async (req, res) => {
        try {
            const title = req.query.title;
            const author = req.query.author;
            const borrowables = await this.repository
                .createQueryBuilder('borrowable')
                .where("borrowable.author LIKE CONCAT('%', :author, '%') AND borrowable.title LIKE CONCAT('%', :title, '%')",
                    {author: author, title: title})
                .getMany();
            if (!borrowables || borrowables.length == 0) {
                this.handleError(res, 404, 'No borrowable with that kind of author and title found.');
                return;
            }
            res.json({ success: true, data: borrowables });
        }
        catch (err) {
            console.log("Could not find by author and id.");
            this.handleError(res);
        }
    }
    
}
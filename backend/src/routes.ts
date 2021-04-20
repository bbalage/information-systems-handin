import { Router } from 'express';
import { BorrowController } from './controller/borrow.controller';
import { BorrowableController } from './controller/borrowable.controller';
import { LatenessController } from './controller/lateness.controller';
import { MemberController } from './controller/member.controller';

export function getRouter(): Router {
    const router = Router();

    const memberController = new MemberController();
    const borrowableController = new BorrowableController();
    const borrowController = new BorrowController();
    const latenessController = new LatenessController();

    /*Endpoints linked to MemberController*/
    router.get('/members', memberController.get);
    router.post('/members/create', memberController.create);
    router.delete('/members/delete/:id', memberController.delete);
    router.put('/members/update/:id', memberController.update);
    router.put('/members/update/activate/:id', memberController.updateActivate);

    router.post('/borrowables/create', borrowableController.create);
    router.get('/borrowables', borrowableController.get);

    router.get('/borrow/member-data/:id', borrowController.getMemberWithNumberOfCurrentBorrowsAndReturnInResponse);
    router.post('/borrow/create/:memberId', borrowController.createBorrows);
    router.get('/borrow/borrowable-data/:idOfBorrowable', borrowController.getBorrowableWithCurrentBorrowerAndReturn);
    router.post('/borrow/free-borrowable/:idOfBorrowable', borrowController.setBorrowableFree);

    router.get('/lateness', latenessController.getLatenessOfBorrowables);

    return router;
}
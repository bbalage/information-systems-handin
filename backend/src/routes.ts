import { Router } from 'express';
import { MemberController } from './controller/member.controller';

export function getRouter(): Router {
    const router = Router();

    const memberController = new MemberController();

    router.get('/members', memberController.get);
    //router.get('/members/id', memberController.getById);
    //router.get('/members/id-card-number', memberController.getByIdCardNumber);
    //router.get('/members/name', memberController.getByName);
    router.post('/members/create', memberController.create);


    return router;
}
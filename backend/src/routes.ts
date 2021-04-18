import { Router } from 'express';
import { MemberController } from './controller/member.controller';

export function getRouter(): Router {
    const router = Router();

    const memberController = new MemberController();

    /*Endpoints linked to MemberController*/
    router.get('/members', memberController.get);
    router.post('/members/create', memberController.create);
    router.delete('/members/delete/:id', memberController.delete);
    router.put('/members/update/:id', memberController.update);
    router.put('/members/update/activate/:id', memberController.updateActivate);

    return router;
}
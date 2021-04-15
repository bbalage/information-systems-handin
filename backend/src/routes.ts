import { Router } from 'express';
import { UserController } from './controller/user.controller';

export function getRouter(): Router {
    const router = Router();

    const userController = new UserController();

    router.get('/users/:id', userController.getOne);
    
    return router;
}
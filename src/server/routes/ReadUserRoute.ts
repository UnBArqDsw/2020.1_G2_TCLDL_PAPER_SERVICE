import { ReadUserControllerFactory }
  from '@server/factories/controllers/user/ReadUserControllerFactory';
import { AuthMiddlewareFactory } from '@server/factories/middlewares/AuthMiddlewareFactory';
import { Router } from 'express';

const authMiddleware = new AuthMiddlewareFactory().create();
const readUserController = new ReadUserControllerFactory().create();

export default (router: Router) => {
  router.get('/users', authMiddleware, readUserController);
};

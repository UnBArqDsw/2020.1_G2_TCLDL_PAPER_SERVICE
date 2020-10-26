import { Router } from 'express';
import { FindUserMiddlewareFactory } from '@server/factories/middlewares/FindUserMiddlewareFactory';
import { RemoveUserControllerFactory } from '@server/factories/controllers/user/RemoveUserControllerFactory';
import { AuthMiddlewareFactory } from '@server/factories/middlewares/AuthMiddlewareFactory';

const authMiddleware = new AuthMiddlewareFactory().create();
const findUserMiddleware = new FindUserMiddlewareFactory().create();
const removeUserController = new RemoveUserControllerFactory().create();
export default (router: Router) => {
  router.delete('/users/:userId', authMiddleware, findUserMiddleware, removeUserController);
};

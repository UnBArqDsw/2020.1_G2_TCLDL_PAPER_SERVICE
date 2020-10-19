import { Router } from 'express';
import { FindUserMiddlewareFactory } from '@server/factories/middlewares/FindUserMiddlewareFactory';
import { RemoveUserControllerFactory } from '@server/factories/controllers/RemoveUserControllerFactory';

const findUserMiddleware = new FindUserMiddlewareFactory().create();
const removeUserController = new RemoveUserControllerFactory().create();

export default (router: Router) => {
  router.delete('/users/:userId', findUserMiddleware, removeUserController);
};

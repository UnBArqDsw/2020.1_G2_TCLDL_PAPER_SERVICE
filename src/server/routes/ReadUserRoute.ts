import { ReadUserControllerFactory } from '@server/factories/controllers/ReadUserControllerFactory';
import { ReadUserValidatorMiddlewareFactory }
  from '@server/factories/middlewares/ReadUserValidatorMiddlewareFactory';
import { Router } from 'express';

const readUserController = new ReadUserControllerFactory().create();
const readUserValidatorMiddleware = new ReadUserValidatorMiddlewareFactory().create();

export default (router: Router) => {
  router.get('/user/:id', readUserValidatorMiddleware, readUserController);
};

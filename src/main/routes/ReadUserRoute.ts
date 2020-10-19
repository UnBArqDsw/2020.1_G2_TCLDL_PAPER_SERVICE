import { adaptController } from '@main/adapters/expressControllerAdapter';
import { adaptMiddleware } from '@main/adapters/expressMiddlewareAdapter';
import { ReadUserControllerFactory } from '@main/factories/controllers/ReadUserControllerFactory';
import { ReadUserValidatorMiddlewareFactory }
  from '@main/factories/middlewares/ReadUserValidatorMiddlewareFactory';
import { Router } from 'express';

const readUserController = new ReadUserControllerFactory().create();
const readUserValidatorMiddleware = new ReadUserValidatorMiddlewareFactory().create();

export default (router: Router) => {
  router.post('/user/:id',
    adaptMiddleware(readUserValidatorMiddleware), adaptController(readUserController));
};

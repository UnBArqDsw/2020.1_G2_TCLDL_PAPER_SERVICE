import { ReadUserControllerFactory } from '@server/factories/controllers/ReadUserControllerFactory';
import { ReadUserValidatorMiddlewareFactory }
  from '@server/factories/middlewares/ReadUserValidatorMiddlewareFactory';
import { VerifyIfUserAlreadyExistsMiddlewareFactory }
  from '@server/factories/middlewares/VerifyIfUserAlreadyExistsMiddlewareFactory';
import { Router } from 'express';

const readUserController = new ReadUserControllerFactory().create();
const readUserValidatorMiddleware = new ReadUserValidatorMiddlewareFactory().create();
const verifyIfUserAlreadyExistsMiddleware = new VerifyIfUserAlreadyExistsMiddlewareFactory()
  .create();

export default (router: Router) => {
  router.post('/user/:id',
    readUserValidatorMiddleware,
    verifyIfUserAlreadyExistsMiddleware,
    readUserController);
};

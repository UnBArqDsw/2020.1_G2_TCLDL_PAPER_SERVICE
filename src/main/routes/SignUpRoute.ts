import { adaptController } from '@main/adapters/expressControllerAdapter';
import { adaptMiddleware } from '@main/adapters/expressMiddlewareAdapter';
import { SignUpControllerFactory } from '@main/factories/controllers/SignUpControllerFactory';
import { SignUpValidatorMiddlewareFactory }
  from '@main/factories/middlewares/SignUpValidatorMiddlewareFactory';
import { VerifyIfUserAlreadyExistsMiddlewareFactory }
  from '@main/factories/middlewares/VerifyIfUserAlreadyExistsMiddlewareFactory';
import { Router } from 'express';

const signupController = new SignUpControllerFactory().create();
const signupValidatorMiddleware = new SignUpValidatorMiddlewareFactory().create();
const verifyIfUserAlreadyExistsMiddleware = new VerifyIfUserAlreadyExistsMiddlewareFactory()
  .create();

export default (router: Router) => {
  router.post('/signup',
    adaptMiddleware(signupValidatorMiddleware),
    adaptMiddleware(verifyIfUserAlreadyExistsMiddleware),
    adaptController(signupController));
};

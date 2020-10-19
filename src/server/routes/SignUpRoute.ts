import { SignUpControllerFactory } from '@server/factories/controllers/SignUpControllerFactory';
import { SignUpValidatorMiddlewareFactory }
  from '@server/factories/middlewares/SignUpValidatorMiddlewareFactory';
import { VerifyIfUserAlreadyExistsMiddlewareFactory }
  from '@server/factories/middlewares/VerifyIfUserAlreadyExistsMiddlewareFactory';
import { Router } from 'express';

const signupController = new SignUpControllerFactory().create();
const signupValidatorMiddleware = new SignUpValidatorMiddlewareFactory().create();
const verifyIfUserAlreadyExistsMiddleware = new VerifyIfUserAlreadyExistsMiddlewareFactory()
  .create();

export default (router: Router) => {
  router.post('/signup',
    signupValidatorMiddleware,
    verifyIfUserAlreadyExistsMiddleware,
    signupController);
};

import {
  SignUpControllerFactory,
} from '@server/factories/controllers/user/SignUpControllerFactory';
import { SignUpValidatorRequestMiddlewareFactory }
  from '@server/factories/middlewares/SignUpValidatorRequestMiddlewareFactory';
import { VerifyIfUserAlreadyExistsMiddlewareFactory }
  from '@server/factories/middlewares/VerifyIfUserAlreadyExistsMiddlewareFactory';
import { Router } from 'express';

const signupController = new SignUpControllerFactory().create();
const signupValidatorMiddleware = new SignUpValidatorRequestMiddlewareFactory().create();
const verifyIfUserAlreadyExistsMiddleware = new VerifyIfUserAlreadyExistsMiddlewareFactory()
  .create();

export default (router: Router) => {
  router.post('/signup',
    signupValidatorMiddleware,
    verifyIfUserAlreadyExistsMiddleware,
    signupController);
};

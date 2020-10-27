import { LoginControllerFactory } from '@server/factories/controllers/user/LoginControllerFactory';
import { LoginValidatorRequestMiddlewareFactory } from '@server/factories/middlewares/LoginValidatorRequestMiddlewareFactory';
import { Router } from 'express';

const loginController = new LoginControllerFactory().create();
const loginValidatorRequest = new LoginValidatorRequestMiddlewareFactory().create();

export default (router: Router) => {
  router.post('/login', loginValidatorRequest, loginController);
};

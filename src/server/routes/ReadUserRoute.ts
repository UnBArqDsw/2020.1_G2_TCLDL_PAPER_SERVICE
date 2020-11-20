import { ReadUserControllerFactory }
  from '@server/factories/controllers/user/ReadUserControllerFactory';
import { AuthMiddlewareFactory } from '@server/factories/middlewares/AuthMiddlewareFactory';
import { VerifyIfUserIsSameOfDecodedTokenFactory } from '@server/factories/middlewares/VerifyIfUserIsSameOfDecodedTokenFactory';
import { Router } from 'express';

const authMiddleware = new AuthMiddlewareFactory().create();
const verifyIfUserIsSameOfDecodedToken = new VerifyIfUserIsSameOfDecodedTokenFactory().create();
const readUserController = new ReadUserControllerFactory().create();

export default (router: Router) => {
  router.get('/user/:userId', authMiddleware, verifyIfUserIsSameOfDecodedToken, readUserController);
};

import { Router } from 'express';
import {
  UpdateUserControllerFactory,
} from '@server/factories/controllers/user/UpdateUserControllerFactory';
import {
  UpdateUserValidatorMiddlewareFactory,
} from '@server/factories/middlewares/UpdateUserValidatorMiddlewareFactory';
import { AuthMiddlewareFactory } from '@server/factories/middlewares/AuthMiddlewareFactory';
import {
  VerifyIfUserIsSameOfDecodedTokenFactory,
} from '@server/factories/middlewares/VerifyIfUserIsSameOfDecodedTokenFactory';
import {
  FindUserMiddlewareFactory,
} from '@server/factories/middlewares/FindUserMiddlewareFactory';

const authMiddleware = new AuthMiddlewareFactory().create();
const verifyIfUserIsSameOfDecodedToken = new VerifyIfUserIsSameOfDecodedTokenFactory().create();
const findUserMiddleware = new FindUserMiddlewareFactory().create();
const updateUserValidatorMiddleware = new UpdateUserValidatorMiddlewareFactory().create();
const updateUserController = new UpdateUserControllerFactory().create();

export default (router: Router) => {
  router.put('/users/:userId', authMiddleware, verifyIfUserIsSameOfDecodedToken, findUserMiddleware,
    updateUserValidatorMiddleware, updateUserController);

  router.patch('/users/:userId', authMiddleware, verifyIfUserIsSameOfDecodedToken, findUserMiddleware,
    updateUserValidatorMiddleware, updateUserController);
};

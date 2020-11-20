import {
  CreatePaperControllerFactory,
} from '@server/factories/controllers/paper/CreatePaperControllerFactory';
import { AuthMiddlewareFactory } from '@server/factories/middlewares/AuthMiddlewareFactory';
import { CreatePaperValidatorRequestMiddlewareFactory } from '@server/factories/middlewares/CreatePaperValidatorRequestMiddlewareFactory';
import { FindUserMiddlewareFactory } from '@server/factories/middlewares/FindUserMiddlewareFactory';
import { VerifyIfUserIsSameOfDecodedTokenFactory } from '@server/factories/middlewares/VerifyIfUserIsSameOfDecodedTokenFactory';
import { Router } from 'express';

const authMiddleware = new AuthMiddlewareFactory().create();
const verifyIfUserIsSameOfDecodedToken = new VerifyIfUserIsSameOfDecodedTokenFactory().create();
const findUserMiddleware = new FindUserMiddlewareFactory().create();
const validatorRequest = new CreatePaperValidatorRequestMiddlewareFactory().create();
const createPaperController = new CreatePaperControllerFactory().create();

export default (router: Router) => {
  router.post('/users/:userId/papers',
    authMiddleware,
    verifyIfUserIsSameOfDecodedToken,
    findUserMiddleware,
    validatorRequest,
    createPaperController);
};

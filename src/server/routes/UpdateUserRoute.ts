import { UpdateUserControllerFactory } from '@server/factories/controllers/UpdateUserControllerFactory';
import { UpdateUserValidatorMiddlewareFactory }
  from '@server/factories/middlewares/UpdateUserValidatorMiddlewareFactory';

import { Router } from 'express';

const updateUserController = new UpdateUserControllerFactory().create();
const updateUserValidatorMiddleware = new UpdateUserValidatorMiddlewareFactory().create();

export default (router: Router) => {
  router.put('/updateUser',
    updateUserValidatorMiddleware,
    updateUserController);
};

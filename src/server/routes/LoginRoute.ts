import { LoginControllerFactory } from '@server/factories/controllers/LoginControllerFactory';
import { Router } from 'express';

const loginController = new LoginControllerFactory().create();

export default (router: Router) => {
  router.post('/login', loginController);
};

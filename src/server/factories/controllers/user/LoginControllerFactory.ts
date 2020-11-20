import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { LoginController } from '@presentation/controllers/authenticate/LoginController';
import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { LoginFactory } from '../../interactors/Authenticate/LoginFactory';

export class LoginControllerFactory implements ControllerFactory {
  create() {
    const login = new LoginFactory().create();
    const loginController = new LoginController(login);
    return ExpressControllerAdapter.adapt(loginController);
  }
}

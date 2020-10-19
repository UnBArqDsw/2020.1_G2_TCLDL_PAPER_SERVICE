import { ExpressControllerAdapter } from '@main/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@main/protocols/ControllerFactory';
import { SignUpController } from '@presentation/controllers/SignUpController';
import { CreateUserDbFactory } from '../interactors/CreteUserDbFactory';

export class SignUpControllerFactory implements ControllerFactory {
  create() {
    const createUserDb = new CreateUserDbFactory().create();
    const signUpController = new SignUpController(createUserDb);
    return ExpressControllerAdapter.adapt(signUpController);
  }
}

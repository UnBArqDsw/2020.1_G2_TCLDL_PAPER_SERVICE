import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { SignUpController } from '@presentation/controllers/user/SignUpController';
import { CreateUserDbFactory } from '@server/factories/interactors/user/CreteUserDbFactory';

export class SignUpControllerFactory implements ControllerFactory {
  create() {
    const createUserDb = new CreateUserDbFactory().create();
    const signUpController = new SignUpController(createUserDb);
    return ExpressControllerAdapter.adapt(signUpController);
  }
}

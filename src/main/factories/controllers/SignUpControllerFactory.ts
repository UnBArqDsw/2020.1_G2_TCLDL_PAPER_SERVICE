import { ControllerFactory } from '@main/protocols/ControllerFactory';
import { SignUpController } from '@presentation/controllers/SignUpController';
import { CreateUserDbFactory } from '../interactors/CreteUserDbFactory';

export class SignUpControllerFactory implements ControllerFactory {
  create(): SignUpController {
    const createUserDb = new CreateUserDbFactory().create();
    return new SignUpController(createUserDb);
  }
}

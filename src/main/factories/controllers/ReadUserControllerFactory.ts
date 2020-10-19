import { ControllerFactory } from '@main/protocols/ControllerFactory';
import { ReadUserController } from '@presentation/controllers/ReadUserController';
import { ReadUserDbFactory } from '../interactors/ReadUserDbFactory';

export class ReadUserControllerFactory implements ControllerFactory {
  create(): ReadUserController {
    const createUserDb = new ReadUserDbFactory().create();
    return new ReadUserController(createUserDb);
  }
}

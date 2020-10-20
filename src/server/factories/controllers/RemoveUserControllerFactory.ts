import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { RemoveUserController } from '@presentation/controllers/RemoveUserController';
import { RemoveUserDbFactory } from '../interactors/RemoveUserDbFactory';

export class RemoveUserControllerFactory implements ControllerFactory {
  create() {
    const removeUserDb = new RemoveUserDbFactory().create();
    const removeUserController = new RemoveUserController(removeUserDb);
    return ExpressControllerAdapter.adapt(removeUserController);
  }
}

import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { RemoveUserController } from '@presentation/controllers/user/RemoveUserController';
import { RemoveUserDbFactory } from '@server/factories/interactors/user/RemoveUserDbFactory';

export class RemoveUserControllerFactory implements ControllerFactory {
  create() {
    const removeUserDb = new RemoveUserDbFactory().create();
    const removeUserController = new RemoveUserController(removeUserDb);
    return ExpressControllerAdapter.adapt(removeUserController);
  }
}

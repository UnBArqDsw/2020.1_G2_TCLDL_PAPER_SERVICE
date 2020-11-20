import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { UpdateUserController } from '@presentation/controllers/user/UpdateUserController';
import { UpdateUserDbFactory } from '../../interactors/user/UpdateUserDbFactory';

export class UpdateUserControllerFactory implements ControllerFactory {
  create() {
    const updateUserDb = new UpdateUserDbFactory().create();
    const updateUserController = new UpdateUserController(updateUserDb);
    return ExpressControllerAdapter.adapt(updateUserController);
  }
}

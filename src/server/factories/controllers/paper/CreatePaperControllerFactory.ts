import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { CreatePaperController } from '@presentation/controllers/paper/CreatePaperController';
import { CreatePaperDbFactory } from '@server/factories/interactors/paper/CreatePaperDbFactory';

export class CreatePaperControllerFactory implements ControllerFactory {
  create() {
    const createPaperDb = new CreatePaperDbFactory().create();
    const signUpController = new CreatePaperController(createPaperDb);
    return ExpressControllerAdapter.adapt(signUpController);
  }
}

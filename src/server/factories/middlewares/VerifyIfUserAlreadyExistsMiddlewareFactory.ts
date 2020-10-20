import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { VerifyIfUserAlreadyExistsMiddleware } from '@presentation/middlewares/VerifyIfUserAlreadyExistsMiddleware';
import { FindUserDbFactory } from '../interactors/FindUserDbFactory';

export class VerifyIfUserAlreadyExistsMiddlewareFactory {
  create() {
    const findUserDb = new FindUserDbFactory().create();
    const verifyIfUserAlreadyExistsMiddleware = new VerifyIfUserAlreadyExistsMiddleware(
      findUserDb,
    );
    return ExpressMiddlewareAdapter.adapt(verifyIfUserAlreadyExistsMiddleware);
  }
}

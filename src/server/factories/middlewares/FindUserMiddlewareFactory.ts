import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { FindUserMiddleware } from '@presentation/middlewares/FindUserMiddleware';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { FindUserDbFactory } from '../interactors/FindUserDbFactory';

export class FindUserMiddlewareFactory implements MiddlewareFactory {
  create() {
    const findUserDb = new FindUserDbFactory().create();
    const findUserMiddleware = new FindUserMiddleware(
      findUserDb,
    );
    return ExpressMiddlewareAdapter.adapt(findUserMiddleware);
  }
}

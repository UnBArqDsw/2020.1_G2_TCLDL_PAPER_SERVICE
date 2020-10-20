import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { FindUserMiddleware } from '@presentation/middlewares/FindUserMiddleware';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { ReadUserDbFactory } from '../interactors/ReadUserDbFactory';

export class ReadUserMiddlewareFactory implements MiddlewareFactory {
  create() {
    const readUserDb = new ReadUserDbFactory().create();
    const readUserMiddleware = new FindUserMiddleware(
      readUserDb,
    );
    return ExpressMiddlewareAdapter.adapt(readUserMiddleware);
  }
}

import { VerifyIfUserAlreadyExistsMiddleware } from '@presentation/middlewares/VerifyIfUserAlreadyExistsMiddleware';
import { FindUserDbFactory } from '../interactors/FindUserDbFactory';

export class VerifyIfUserAlreadyExistsMiddlewareFactory {
  create(): VerifyIfUserAlreadyExistsMiddleware {
    const findUserDb = new FindUserDbFactory().create();
    return new VerifyIfUserAlreadyExistsMiddleware(findUserDb);
  }
}

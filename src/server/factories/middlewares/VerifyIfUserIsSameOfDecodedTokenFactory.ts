import {
  VerifyIfUserIsSameOfDecodedToken,
} from '@presentation/middlewares/VerifyIfUserIsSameOfDecodedToken';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';

export class VerifyIfUserIsSameOfDecodedTokenFactory implements MiddlewareFactory {
  create() {
    const verifyIfUserIsSameOfDecodedToken = new VerifyIfUserIsSameOfDecodedToken();

    return ExpressMiddlewareAdapter.adapt(verifyIfUserIsSameOfDecodedToken);
  }
}

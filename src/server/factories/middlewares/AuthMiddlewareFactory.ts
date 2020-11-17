import { JwtAdapter } from '@infra/jwt/JwtAdapter';
import { AuthMiddleware } from '@presentation/middlewares/AuthMiddleware';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';

export class AuthMiddlewareFactory implements MiddlewareFactory {
  create() {
    const jwt = new JwtAdapter();
    const authMiddleware = new AuthMiddleware(jwt);

    return ExpressMiddlewareAdapter.adapt(authMiddleware);
  }
}

import { LoginRequestValidator } from '@infra/request_validators/LoginRequestValidator';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { RequestValidatorMiddleware } from '@presentation/middlewares/RequestValidatorMiddleware';

export class LoginValidatorRequestMiddlewareFactory implements MiddlewareFactory {
  create() {
    const createRequestValidator = new LoginRequestValidator();
    const signUpValidatorMiddleware = new RequestValidatorMiddleware(createRequestValidator);
    return ExpressMiddlewareAdapter.adapt(signUpValidatorMiddleware);
  }
}

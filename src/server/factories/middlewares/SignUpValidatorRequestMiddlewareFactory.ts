import { CreateUserRequestValidator } from '@infra/request_validators/CreateUserRequestValidator';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { RequestValidatorMiddleware } from '@presentation/middlewares/RequestValidatorMiddleware';

export class SignUpValidatorRequestMiddlewareFactory implements MiddlewareFactory {
  create() {
    const createRequestValidator = new CreateUserRequestValidator();
    const signUpValidatorMiddleware = new RequestValidatorMiddleware(createRequestValidator);
    return ExpressMiddlewareAdapter.adapt(signUpValidatorMiddleware);
  }
}

import { CreateUserRequestValidator } from '@infra/request_validators/CreateUserRequestValidator';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { SignUpValidatorMiddleware } from '@presentation/middlewares/SignUpValidatorMiddleware';

export class SignUpValidatorMiddlewareFactory implements MiddlewareFactory {
  create() {
    const createRequestValidator = new CreateUserRequestValidator();
    const signUpValidatorMiddleware = new SignUpValidatorMiddleware(createRequestValidator);
    return ExpressMiddlewareAdapter.adapt(signUpValidatorMiddleware);
  }
}

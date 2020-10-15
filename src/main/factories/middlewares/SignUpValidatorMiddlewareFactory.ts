import { CreateUserRequestValidator } from '@infra/request_validators/CreateUserRequestValidator';
import { MiddlewareFactory } from '@main/protocols/MiddlewareFactory';
import { SignUpValidatorMiddleware } from '@presentation/middlewares/SignUpValidatorMiddleware';

export class SignUpValidatorMiddlewareFactory implements MiddlewareFactory {
  create(): SignUpValidatorMiddleware {
    const createRequestValidator = new CreateUserRequestValidator();
    return new SignUpValidatorMiddleware(createRequestValidator);
  }
}

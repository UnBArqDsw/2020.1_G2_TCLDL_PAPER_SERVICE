import { UpdateUserRequestValidator } from '@infra/request_validators/UpdateUserRequestValidator';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { UpdateUserValidatorMiddleware } from '@presentation/middlewares/UpdateUserValidatorMiddleware';

export class UpdateUserValidatorMiddlewareFactory implements MiddlewareFactory {
  create() {
    const createRequestValidator = new UpdateUserRequestValidator();
    const signUpValidatorMiddleware = new UpdateUserValidatorMiddleware(createRequestValidator);
    return ExpressMiddlewareAdapter.adapt(signUpValidatorMiddleware);
  }
}

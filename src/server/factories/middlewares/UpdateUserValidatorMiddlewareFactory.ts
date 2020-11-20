import { UpdateUserRequestValidator }
  from '@infra/request_validators/UpdateUserRequestValidator';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { RequestValidatorMiddleware } from '@presentation/middlewares/RequestValidatorMiddleware';

export class UpdateUserValidatorMiddlewareFactory implements MiddlewareFactory {
  create() {
    const updateRequestValidator = new UpdateUserRequestValidator();
    const updateValidatorMiddleware = new RequestValidatorMiddleware(updateRequestValidator);
    return ExpressMiddlewareAdapter.adapt(updateValidatorMiddleware);
  }
}

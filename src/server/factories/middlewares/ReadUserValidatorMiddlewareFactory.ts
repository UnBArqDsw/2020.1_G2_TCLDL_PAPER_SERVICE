import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';

import { ReadUserRequestValidator } from '@infra/request_validators/ReadUserRequestValidator';
import { ReadUserValidatorMiddleware } from '@presentation/middlewares/ReadUserValidatorMiddleware';

export class ReadUserValidatorMiddlewareFactory implements MiddlewareFactory {
  create() {
    const createRequestValidator = new ReadUserRequestValidator();
    const signUpValidatorMiddleware = new ReadUserValidatorMiddleware(createRequestValidator);
    return ExpressMiddlewareAdapter.adapt(signUpValidatorMiddleware);
  }
}

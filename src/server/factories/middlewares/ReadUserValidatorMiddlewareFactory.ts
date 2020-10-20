import { ReadUserRequestValidator } from '@infra/request_validators/ReadUserRequestValidator';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';
import { ReadUserValidatorMiddleware } from '@presentation/middlewares/ReadUserValidatorMiddleware';

export class ReadUserValidatorMiddlewareFactory implements MiddlewareFactory {
  create(): ReadUserValidatorMiddleware {
    const readUserRequestValidator = new ReadUserRequestValidator();
    return new ReadUserValidatorMiddleware(readUserRequestValidator);
  }
}

import { CreatePaperRequestValidator } from '@infra/request_validators/CreatePaperRequestValidator';
import { RequestValidatorMiddleware } from '@presentation/middlewares/RequestValidatorMiddleware';
import { ExpressMiddlewareAdapter } from '@server/adapters/ExpressMiddlewareAdapter';
import { MiddlewareFactory } from '@server/protocols/MiddlewareFactory';

export class CreatePaperValidatorRequestMiddlewareFactory implements MiddlewareFactory {
  create() {
    const createPaperValidator = new CreatePaperRequestValidator();
    const createPaperValidatorRequestMiddleware = new RequestValidatorMiddleware(
      createPaperValidator,
    );

    return ExpressMiddlewareAdapter.adapt(createPaperValidatorRequestMiddleware);
  }
}

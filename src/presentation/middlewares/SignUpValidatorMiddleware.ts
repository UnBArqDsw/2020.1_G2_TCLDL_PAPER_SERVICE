import { IHttpRequest } from '../protocols/IHttp';
import { IMiddleware } from '../protocols/IMiddleware';
import { IRequestValidator } from '../validators/IRequestValidator';

export class SignUpValidatorMiddleware implements IMiddleware {
  private readonly requestValidator: IRequestValidator

  constructor(requestValidator: IRequestValidator) {
    this.requestValidator = requestValidator;
  }

  async handle(request: IHttpRequest): Promise<void> {
    await this.requestValidator.isValid(request);
  }
}

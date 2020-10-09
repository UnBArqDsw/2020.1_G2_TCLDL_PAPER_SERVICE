import { BadRequestError } from '../errors/BadRequestError';
import { HttpRequest } from '../protocols/Http';
import { Middleware } from '../protocols/Middleware';
import { RequestValidator } from '../validators/RequestValidator';

export class SignUpValidatorMiddleware implements Middleware {
  private readonly requestValidator: RequestValidator

  constructor(requestValidator: RequestValidator) {
    this.requestValidator = requestValidator;
  }

  async handle(request: HttpRequest): Promise<void> {
    const { isValid, fields } = await this.requestValidator.validate(request.body);
    if (!isValid) {
      throw new BadRequestError(fields);
    }
  }
}

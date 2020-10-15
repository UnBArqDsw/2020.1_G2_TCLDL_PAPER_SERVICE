import { badRequest, successRequest } from '@presentation/helpers/HttpHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';
import { RequestValidator } from '@presentation/validators/RequestValidator';

export class SignUpValidatorMiddleware implements Middleware {
  private readonly requestValidator: RequestValidator

  constructor(requestValidator: RequestValidator) {
    this.requestValidator = requestValidator;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { isValid, fields } = await this.requestValidator.validate(request.body);
    if (!isValid) {
      return badRequest(fields);
    }

    return successRequest('ok');
  }
}

import { Controller } from '@presentation/protocols/Controller';
import { HttpResponse, HttpRequest } from '@presentation/protocols/Http';

export class LoginController implements Controller {
  async handle(_request: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200 };
  }
}

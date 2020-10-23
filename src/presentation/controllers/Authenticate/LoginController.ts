import { Controller } from '@presentation/protocols/Controller';
import { HttpResponse, HttpRequest } from '@presentation/protocols/Http';
import { Login } from '@domain/interactors/Authentication/Login';
import { successRequest } from '@presentation/helpers/HttpHelper';

export class LoginController implements Controller {
  private readonly login: Login

  constructor(login: Login) {
    this.login = login;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const token = await this.login.execute(request.body);
    return successRequest({ token });
  }
}

import { ReadUser } from '@domain/interactors/ReadUser';
import { Controller } from '@presentation/protocols/Controller';
import { serverError, successCreate } from '@presentation/helpers/HttpHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class SignUpController implements Controller {
  private readonly readUser: ReadUser

  constructor(readUser: ReadUser) {
    this.readUser = readUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.readUser.execute(request.body);
      return successCreate(user);
    } catch (error) {
      return serverError();
    }
  }
}
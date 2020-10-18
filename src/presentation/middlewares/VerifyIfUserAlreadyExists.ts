import { FindUser } from '@domain/interactors/FindUser';
import {
  badRequest, successRequest, validationError,
} from '@presentation/helpers/HttpHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class VerifyIfUserAlreadyExists implements Middleware {
  private readonly findUser: FindUser

  constructor(findUser: FindUser) {
    this.findUser = findUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userEmail = request.body?.email || request.params?.identifier;

    if (!userEmail) {
      return badRequest('user email');
    }

    const user = await this.findUser.execute(userEmail);

    if (user) {
      return validationError('user already exists.');
    }

    return successRequest('ok');
  }
}

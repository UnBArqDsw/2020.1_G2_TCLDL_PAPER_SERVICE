import { FindUser } from '@domain/interactors/user/FindUser';
import { Controller } from '@presentation/protocols/Controller';
import {
  notFound, successRequest, serverError,
} from '@presentation/helpers/HttpHelper';

import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class ReadUserController implements Controller {
  private readonly findUser: FindUser

  constructor(findUser: FindUser) {
    this.findUser = findUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const user = await this.findUser.execute(id, 'id');
      if (!user) {
        return notFound('user');
      }
      return successRequest(user);
    } catch (error) {
      return serverError();
    }
  }
}

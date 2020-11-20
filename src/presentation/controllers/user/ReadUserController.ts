import { FindUser } from '@domain/interactors/user/FindUser';
import { Controller } from '@presentation/protocols/Controller';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';

import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class ReadUserController implements Controller {
  private readonly findUser: FindUser

  constructor(findUser: FindUser) {
    this.findUser = findUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = request.headers.decodedToken.id;
      const user = await this.findUser.execute({ id: userId });

      if (!user) {
        return ResponseHelper.notFound('user');
      }

      return ResponseHelper.successRequest(user);
    } catch (error) {
      return ResponseHelper.serverError();
    }
  }
}

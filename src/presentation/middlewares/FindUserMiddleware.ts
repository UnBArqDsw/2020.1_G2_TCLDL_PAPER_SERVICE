import { FindUser } from '@domain/interactors/FindUser';
import { notFound, successRequest } from '@presentation/helpers/HttpHelper';
import { HttpRequest } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class FindUserMiddleware implements Middleware {
  private readonly findUser: FindUser

  constructor(findUser: FindUser) {
    this.findUser = findUser;
  }

  async handle(request: HttpRequest) {
    const userId = request.params;

    const user = await this.findUser.execute(userId, 'id');

    if (!user) {
      return notFound('user');
    }

    return successRequest('ok');
  }
}

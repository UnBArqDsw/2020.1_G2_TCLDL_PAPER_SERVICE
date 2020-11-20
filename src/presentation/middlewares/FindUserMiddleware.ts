import { FindUser } from '@domain/interactors/user/FindUser';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class FindUserMiddleware implements Middleware {
  private readonly findUser: FindUser

  constructor(findUser: FindUser) {
    this.findUser = findUser;
  }

  async handle(request: HttpRequest) {
    try {
      const { userId } = request.params;

      const user = await this.findUser.execute({ id: userId });

      if (!user) {
        return ResponseHelper.notFound('user');
      }

      return ResponseHelper.successRequest('ok');
    } catch (error) {
      return ResponseHelper.serverError();
    }
  }
}

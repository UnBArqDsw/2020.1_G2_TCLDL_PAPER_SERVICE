import { FindUser } from '@domain/interactors/user/FindUser';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class VerifyIfUserAlreadyExistsMiddleware implements Middleware {
  private readonly findUser: FindUser

  constructor(findUser: FindUser) {
    this.findUser = findUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const userEmail = request.body?.email;

    if (!userEmail) {
      return ResponseHelper.badRequest('user email');
    }

    const user = await this.findUser.execute({ email: userEmail });

    if (user) {
      return ResponseHelper.validationError('user already exists.');
    }

    return ResponseHelper.successRequest('ok');
  }
}

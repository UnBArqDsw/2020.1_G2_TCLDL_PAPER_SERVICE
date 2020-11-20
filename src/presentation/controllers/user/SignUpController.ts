import { CreateUser } from '@domain/interactors/user/CreateUser';
import { Controller } from '@presentation/protocols/Controller';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class SignUpController implements Controller {
  private readonly createUser: CreateUser

  constructor(createUser: CreateUser) {
    this.createUser = createUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.createUser.execute(request.body);
      return ResponseHelper.successCreate(user);
    } catch (error) {
      return ResponseHelper.serverError();
    }
  }
}

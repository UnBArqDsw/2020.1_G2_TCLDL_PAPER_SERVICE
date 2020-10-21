import { UpdateUser } from '@domain/interactors/UpdateUser';
import { Controller } from '@presentation/protocols/Controller';
import { serverError, successCreate } from '@presentation/helpers/HttpHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class UpdateUserController implements Controller {
  private readonly createUser: UpdateUser

  constructor(createUser: UpdateUser) {
    this.createUser = createUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.createUser.execute(request.body);
      return successCreate(user);
    } catch (error) {
      return serverError();
    }
  }
}

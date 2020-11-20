import { UpdateUser } from '@domain/interactors/user/UpdateUser';
import { Controller } from '@presentation/protocols/Controller';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class UpdateUserController implements Controller {
  private readonly updateUser: UpdateUser

  constructor(createUser: UpdateUser) {
    this.updateUser = createUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.updateUser.execute({ ...request.body, id: request.params.userId });
      return ResponseHelper.successRequest(user);
    } catch (error) {
      return ResponseHelper.serverError();
    }
  }
}

import { CreateUser } from '../../domain/interactors/CreateUser';
import { serverError, successRequest } from '../helpers/HttpHelper';
import { Controller } from '../protocols/Controller';
import { HttpRequest, HttpResponse } from '../protocols/Http';

export class SignUpController implements Controller {
  private readonly createUser: CreateUser

  constructor(createUser: CreateUser) {
    this.createUser = createUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.createUser.execute(request.body);
      return successRequest(user);
    } catch (error) {
      return serverError();
    }
  }
}

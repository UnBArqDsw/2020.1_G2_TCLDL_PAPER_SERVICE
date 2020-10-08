import { ICreateUser } from '../../domain/iteractor/ICreateUser';
import { serverError, successRequest } from '../helpers/HttpHelper';
import { IController } from '../protocols/IController';
import { IHttpRequest, IHttpResponse } from '../protocols/IHttp';

export class SignUpController implements IController {
  private readonly createUser: ICreateUser

  constructor(createUser: ICreateUser) {
    this.createUser = createUser;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const user = await this.createUser.execute(request.body);
      return successRequest(user);
    } catch (error) {
      return serverError();
    }
  }
}

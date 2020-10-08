import { successRequest } from '../helpers/HttpHelper';
import { IController } from '../protocols/IController';
import { IHttpRequest, IHttpResponse } from '../protocols/IHttp';

export class SignUpController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    return successRequest({ id: 'valid_id', ...request.body });
  }
}

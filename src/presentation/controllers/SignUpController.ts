import { IController } from '../protocols/IController';
import { IHttpRequest, IHttpResponse } from '../protocols/IHttp';

export class SignUpController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    return { statusCode: 200, body: { id: 'valid_id', ...request.body } };
  }
}

import { IController } from '../protocols/IController';
import { IHttpRequest, IHttpResponse } from '../protocols/IHttp';

export class SignUpController implements IController {
  async handle(_request: IHttpRequest): Promise<IHttpResponse> {
    return { statusCode: 200 };
  }
}

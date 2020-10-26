import { successRequest, unhatourizedRequest } from '@presentation/helpers/HttpHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class VerifyIfUserIsSameOfDecodedToken implements Middleware {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const decodedToken = request.headers?.decodedToken;

    if (request.params.id !== decodedToken?.id) {
      return unhatourizedRequest('Unauthorized.');
    }

    return successRequest('ok');
  }
}

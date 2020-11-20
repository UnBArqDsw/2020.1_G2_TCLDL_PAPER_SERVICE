import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class VerifyIfUserIsSameOfDecodedToken implements Middleware {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const decodedToken = request.headers?.decodedToken;

    if (request.params.userId !== decodedToken?.id) {
      return ResponseHelper.unhatourizedRequest('Unauthorized.');
    }

    return ResponseHelper.successRequest('ok');
  }
}

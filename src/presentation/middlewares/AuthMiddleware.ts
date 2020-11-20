import { Jwt } from '@data/protocols/Jwt';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class AuthMiddleware implements Middleware {
  private readonly jwtGenerator: Jwt

  constructor(jwtGenerator: Jwt) {
    this.jwtGenerator = jwtGenerator;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const authorization = request.headers?.authorization || request.headers?.Authorization;

    if (!authorization) {
      return ResponseHelper.unhatourizedRequest('Token was not provided.');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return ResponseHelper.unhatourizedRequest('Token was not provided.');
    }

    try {
      const isValidToken = this.jwtGenerator.verify(token);
      request.headers.decodedToken = isValidToken;
      return ResponseHelper.successRequest('ok');
    } catch (error) {
      if (error.message.toLowerCase() === 'invalid token.') {
        return ResponseHelper.unhatourizedRequest('Invalid token.');
      }

      return ResponseHelper.serverError();
    }
  }
}

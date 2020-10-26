import { Jwt } from '@data/protocols/Jwt';
import { serverError, successRequest, unhatourizedRequest } from '@presentation/helpers/HttpHelper';
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
      return unhatourizedRequest('Token was not provided.');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return unhatourizedRequest('Token was not provided.');
    }

    try {
      const isValidToken = this.jwtGenerator.verify(token);
      request.headers.decodedToken = isValidToken;
      return successRequest('ok');
    } catch (error) {
      if (error.message.toLowerCase() === 'invalid token.') {
        return unhatourizedRequest('Invalid token.');
      }

      return serverError();
    }
  }
}

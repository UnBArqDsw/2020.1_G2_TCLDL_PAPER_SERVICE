import { HttpRequest } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';
import { Request, Response, NextFunction } from 'express';

export class ExpressMiddlewareAdapter {
  static adapt(middleware: Middleware) {
    return async (request: Request, response: Response, next: NextFunction) => {
      const httpRequest: HttpRequest = {
        body: request.body,
        params: request.params,
        headers: request.headers,
      };

      const httpResponse = await middleware.handle(httpRequest);

      if (httpResponse.statusCode !== 200) {
        return response.status(httpResponse.statusCode).json({ error: httpResponse.body });
      }

      return next();
    };
  }
}

import { HttpRequest } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';
import { Request, Response, NextFunction } from 'express';

export const adaptMiddleware = (middleware: Middleware) => async (
  request: Request, response: Response, next: NextFunction,
) => {
  const httpRequest: HttpRequest = {
    body: request.body,
  };

  const httpResponse = await middleware.handle(httpRequest);

  if (httpResponse.statusCode !== 200) {
    return response.status(httpResponse.statusCode).json({ error: httpResponse.body });
  }

  return next();
};

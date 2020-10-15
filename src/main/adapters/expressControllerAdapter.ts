import { Controller } from '@presentation/protocols/Controller';
import { HttpRequest } from '@presentation/protocols/Http';
import { Request, Response } from 'express';

export const adaptController = (controller: Controller) => async (
  request: Request, response: Response,
) => {
  const httpRequest: HttpRequest = {
    body: request.body,
    params: request.params,
  };

  const httpResponse = await controller.handle(httpRequest);

  if (httpResponse.statusCode <= 200 || httpResponse.statusCode >= 299) {
    return response.status(httpResponse.statusCode)
      .json({ error: httpResponse.body.message });
  }

  return response.status(httpResponse.statusCode).json(httpResponse.body);
};

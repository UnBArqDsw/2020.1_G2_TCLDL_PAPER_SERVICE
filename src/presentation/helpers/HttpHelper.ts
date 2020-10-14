import { BadRequestError } from '@presentation/errors/BadRequestError';
import { ServerError } from '@presentation/errors/ServerError';
import { HttpResponse } from '@presentation/protocols/Http';

export const successRequest = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const badRequest = (message: string): HttpResponse => {
  const badRequestError = new BadRequestError(message);

  return {
    statusCode: badRequestError.statusCode,
    body: badRequestError.message,
  };
};

export const serverError = (): HttpResponse => {
  const httpServerError = new ServerError();

  return {
    statusCode: httpServerError.statusCode,
    body: httpServerError,
  };
};

import { BadRequestError } from '@presentation/errors/BadRequestError';
import { NotFoundRequestError } from '@presentation/errors/NotFoundRequestError';
import { ServerError } from '@presentation/errors/ServerError';
import { HttpResponse } from '@presentation/protocols/Http';

export const successRequest = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const successCreate = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const badRequest = (message: string): HttpResponse => {
  const badRequestError = new BadRequestError(message);

  return {
    statusCode: badRequestError.statusCode,
    body: badRequestError.message,
  };
};

export const notFoundRequest = (message: string): HttpResponse => {
  const notFoundRequestError = new NotFoundRequestError(message);

  return {
    statusCode: notFoundRequestError.statusCode,
    body: notFoundRequestError.message,
  };
};

export const serverError = (): HttpResponse => {
  const httpServerError = new ServerError();

  return {
    statusCode: httpServerError.statusCode,
    body: httpServerError,
  };
};

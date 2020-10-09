import { ServerError } from '../errors/ServerError';
import { HttpResponse } from '../protocols/Http';

export const successRequest = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (): HttpResponse => {
  const httpServerError = new ServerError();

  return {
    statusCode: httpServerError.statusCode,
    body: httpServerError,
  };
};

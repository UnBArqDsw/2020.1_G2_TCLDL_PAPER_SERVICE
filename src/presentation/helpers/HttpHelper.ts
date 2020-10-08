import { ServerError } from '../errors/ServerError';
import { IHttpResponse } from '../protocols/IHttp';

export const successRequest = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

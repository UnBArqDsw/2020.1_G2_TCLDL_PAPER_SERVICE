import { IHttpResponse } from '../protocols/IHttp';

export const successRequest = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

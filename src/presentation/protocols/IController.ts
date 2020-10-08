import { IHttpRequest, IHttpResponse } from './IHttp';

export interface IController {
  handle: (request: IHttpRequest) => Promise<IHttpResponse>
}

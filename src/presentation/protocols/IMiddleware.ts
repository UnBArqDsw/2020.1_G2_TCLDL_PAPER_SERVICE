import { IHttpRequest } from './IHttp';

export interface IMiddleware {
  handle: (request: IHttpRequest) => Promise<void>
}

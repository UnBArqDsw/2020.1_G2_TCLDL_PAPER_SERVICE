import { HttpRequest, HttpResponse } from './Http';

export interface Middleware {
  handle: (request: HttpRequest) => Promise<HttpResponse | undefined>
}

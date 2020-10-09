import { HttpRequest } from './Http';

export interface Middleware {
  handle: (request: HttpRequest) => Promise<void>
}

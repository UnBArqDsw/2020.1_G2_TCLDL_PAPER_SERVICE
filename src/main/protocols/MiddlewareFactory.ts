import { Middleware } from '@presentation/protocols/Middleware';

export interface MiddlewareFactory {
  create: () => Middleware
}

import { ExpressMiddlewareAdapter } from 'server/adapters/ExpressMiddlewareAdapter';

export interface MiddlewareFactory {
  create: () => ExpressMiddlewareAdapter
}

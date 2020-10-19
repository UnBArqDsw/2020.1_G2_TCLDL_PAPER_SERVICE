import { ExpressMiddlewareAdapter } from '@main/adapters/ExpressMiddlewareAdapter';

export interface MiddlewareFactory {
  create: () => ExpressMiddlewareAdapter
}

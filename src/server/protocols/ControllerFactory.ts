import { ExpressControllerAdapter } from 'server/adapters/ExpressControllerAdapter';

export interface ControllerFactory {
  create: () => ExpressControllerAdapter
}

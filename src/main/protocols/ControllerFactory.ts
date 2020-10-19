import { ExpressControllerAdapter } from '@main/adapters/ExpressControllerAdapter';

export interface ControllerFactory {
  create: () => ExpressControllerAdapter
}

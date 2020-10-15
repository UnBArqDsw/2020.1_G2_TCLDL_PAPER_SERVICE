import { Controller } from '@presentation/protocols/Controller';

export interface ControllerFactory {
  create: () => Controller
}

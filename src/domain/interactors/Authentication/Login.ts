import { Authenticate } from '@domain/entities/Authenticate';
import { Interactor } from '../../protocols/Interactor';

export interface Login extends Interactor<Authenticate, string> {}

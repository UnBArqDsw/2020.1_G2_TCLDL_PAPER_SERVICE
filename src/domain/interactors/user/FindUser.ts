import { User } from '@domain/entities/User';
import { Interactor } from '../../protocols/Interactor';

export interface FindUser extends Interactor<Partial<User>, User | undefined> {}

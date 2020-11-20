import { User } from '@domain/entities/User';
import { Interactor } from '../../protocols/Interactor';

export interface CreateUser extends
  Interactor<Omit<User, 'id' | 'createdAt' | 'updatedAt'>, User> {}

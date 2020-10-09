import { User } from '../entities/User';

export interface CreateUser {
  execute: (data: Omit<User, 'id'>) => Promise<User>
}

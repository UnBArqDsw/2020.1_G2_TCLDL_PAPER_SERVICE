import { User } from '@domain/entities/User';

export interface CreateUserRepository {
  execute: (data: Omit<User, 'role'>) => Promise<User>
}

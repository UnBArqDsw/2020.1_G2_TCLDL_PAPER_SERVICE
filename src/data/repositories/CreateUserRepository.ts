import { User } from '@domain/entities/User';

export interface CreateUserRepository {
  execute: (data: Omit<User, 'createdAt'| 'updatedAt'>) => Promise<User>
}

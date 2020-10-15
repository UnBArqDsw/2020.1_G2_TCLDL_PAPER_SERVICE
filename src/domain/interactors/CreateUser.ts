import { User } from '@domain/entities/User';

export interface CreateUser {
  execute: (data: Omit<User, 'id' | 'createdAt'| 'updatedAt'>) => Promise<User>
}
